(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.LearningCatalog=factory();})(typeof globalThis!=='undefined'?globalThis:this,function(){
  const normalize=s=>String(s||'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  function matches(article,{query='',track='',level=''}={}){const words=normalize(query).split(' ').filter(Boolean),text=normalize(article.search);return (!track||article.track===track)&&(!level||article.level===level)&&words.every(w=>text.includes(w));}
  return {matches,normalize};
});
