(function(root){
  'use strict';
  function normalize(value){return String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();}
  function related(term){return term.scope.startsWith('Related');}
  function filterTerms(terms,filters={}){
    const words=normalize(filters.query).split(/\s+/).filter(Boolean);
    return terms.filter(t=>{
      const haystack=normalize([t.term,t.definition,t.formula,t.example,t.note,t.category].join(' '));
      return (!filters.category||t.category===filters.category)
        &&(!filters.scope||(filters.scope==='related'?related(t):!related(t)))
        &&(!filters.letter||normalize(t.term).startsWith(filters.letter.toLowerCase()))
        &&words.every(w=>haystack.includes(w));
    }).sort((a,b)=>{
      const q=normalize(filters.query),aName=normalize(a.term),bName=normalize(b.term);
      const score=name=>!q?0:name===q?2:name.startsWith(q)?1:0;
      return score(bName)-score(aName)||a.term.localeCompare(b.term)||a.category.localeCompare(b.category);
    });
  }
  const api={normalize,filterTerms};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.ProjectDictionary=api;
})(typeof globalThis!=='undefined'?globalThis:this);
