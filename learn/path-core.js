(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.LearningPaths=factory();})(typeof globalThis!=='undefined'?globalThis:this,function(){
  const order=['beginner','intermediate','advanced'];
  function resolve(paths,requested,anchor=''){
    let selected=[...order,'all'].includes(requested)?requested:'beginner';
    if(selected==='all')return selected;
    const id=anchor.replace(/^#/,'');
    const owner=order.find(level=>paths[level].sections.includes(id));
    if(owner&&owner!==selected)selected=owner;
    return selected;
  }
  function visible(sectionLevel,selected){return !sectionLevel||selected==='all'||sectionLevel===selected;}
  return {order,resolve,visible};
});
