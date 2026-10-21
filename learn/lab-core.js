(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.RAGLab=factory();})(typeof globalThis!=='undefined'?globalThis:this,function(){
  const documents=[
    {id:'D1',text:'The data owner approves dataset access after a business justification is recorded.',vector:[1,.05,.02]},
    {id:'D2',text:'Requests for permission must include justification and be authorized by the information owner.',vector:[.95,.01,.08]},
    {id:'D3',text:'Access logs must be retained for seven years.',vector:[.02,1,.03]},
    {id:'D4',text:'The data steward fixes invalid records and documents the resolution.',vector:[.02,.05,1]},
    {id:'D5',text:'The dataset access dashboard displays totals. It does not describe approval policy.',vector:[.45,.7,.1]}
  ];
  const queries={approval:{text:'Who approves dataset access?',vector:[1,.08,.02],relevant:['D1','D2']},retention:{text:'How long do we retain access logs?',vector:[.05,1,.03],relevant:['D3']},quality:{text:'Who fixes invalid records?',vector:[.01,.06,1],relevant:['D4']}};
  const stop=new Set(['who','how','do','we','the','a','an','is','are','for','to','of','in','and','it']);
  function tokens(text){return [...new Set((text.toLowerCase().match(/[a-z0-9]+/g)||[]).filter(t=>!stop.has(t)))];}
  function cosine(a,b){if(a.length!==b.length||!a.length)throw new Error('Compatible nonempty vectors required');let dot=0,aa=0,bb=0;for(let i=0;i<a.length;i++){dot+=a[i]*b[i];aa+=a[i]*a[i];bb+=b[i]*b[i];}return aa&&bb?dot/Math.sqrt(aa*bb):0;}
  function chunks(text,method,size=20,overlap=5){
    if(!['words','sentences','paragraphs'].includes(method))throw new Error('Unknown chunking method');
    if(method==='sentences')return (text.match(/[^.!?]+(?:[.!?]+|$)/g)||[]).map(s=>({text:s.trim(),overlap:0})).filter(c=>c.text);
    if(method==='paragraphs')return text.split(/\n\s*\n/).map(s=>({text:s.trim(),overlap:0})).filter(c=>c.text);
    if(!Number.isInteger(size)||!Number.isInteger(overlap)||size<1||overlap<0||overlap>=size)throw new Error('Window must be positive and overlap must be smaller');
    const words=text.trim().split(/\s+/).filter(Boolean),out=[];
    for(let start=0;start<words.length;start+=size-overlap){
      const end=Math.min(start+size,words.length);out.push({text:words.slice(start,end).join(' '),overlap:start?Math.min(overlap,end-start):0,start,end});
      if(end===words.length)break;
    }
    return out;
  }
  function ranking(queryId,method,k){
    const q=queries[queryId];if(!q||!['keyword','vector','hybrid'].includes(method))throw new Error('Unknown retrieval configuration');
    if(!Number.isInteger(k)||k<1||k>documents.length)throw new Error('k must be 1–5');
    const qt=tokens(q.text);
    const rows=documents.map(d=>({...d,keyword:qt.filter(t=>tokens(d.text).includes(t)).length,cosine:cosine(q.vector,d.vector),relevant:q.relevant.includes(d.id)}));
    const order=field=>(a,b)=>b[field]-a[field]||a.id.localeCompare(b.id);
    const lexical=[...rows].filter(d=>d.keyword>0).sort(order('keyword')),semantic=[...rows].sort(order('cosine'));
    rows.forEach(r=>{const li=lexical.findIndex(d=>d.id===r.id),vi=semantic.findIndex(d=>d.id===r.id);r.lexicalRank=li<0?null:li+1;r.vectorRank=vi+1;r.rrf=(li<0?0:1/(60+li+1))+1/(60+vi+1);});
    let results=method==='keyword'?lexical:method==='vector'?semantic:[...rows].sort(order('rrf'));
    results=results.slice(0,k);
    const hits=results.filter(d=>d.relevant).length;
    return {results,hits,totalRelevant:q.relevant.length,precision:results.length?hits/results.length:0,recall:hits/q.relevant.length};
  }
  return {documents,queries,tokens,cosine,chunks,ranking};
});
