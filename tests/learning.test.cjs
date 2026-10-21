const test=require('node:test'),assert=require('node:assert/strict'),path=require('node:path'),fs=require('node:fs');
const assetRoot=fs.existsSync(path.join(__dirname,'../dist/learn'))?path.join(__dirname,'../dist/learn'):path.join(__dirname,'../learn');
const core=require(path.join(assetRoot,'lab-core.js'));
test('word windows retain every word and repeat only the configured boundary',()=>{
  const text=Array.from({length:35},(_,i)=>'w'+i).join(' '),chunks=core.chunks(text,'words',10,3);
  assert.deepEqual(chunks.map(c=>[c.start,c.end]),[[0,10],[7,17],[14,24],[21,31],[28,35]]);
  const covered=new Set(chunks.flatMap(c=>c.text.split(' ')));assert.equal(covered.size,35);
  assert.equal(chunks[0].overlap,0);assert.ok(chunks.slice(1).every(c=>c.overlap===3));
  assert.deepEqual(core.chunks('','words',10,3),[]);
  assert.throws(()=>core.chunks('a b','words',3,3));
});
test('sentence and paragraph modes preserve complete units without overlap',()=>{
  assert.deepEqual(core.chunks('One idea. Another idea! Last idea?','sentences').map(c=>c.text),['One idea.','Another idea!','Last idea?']);
  assert.deepEqual(core.chunks('First paragraph.\n\nSecond paragraph.','paragraphs').map(c=>c.text),['First paragraph.','Second paragraph.']);
});
test('cosine is normalized, supports orthogonal inputs and guards empty lengths',()=>{
  assert.equal(core.cosine([1,0],[5,0]),1);assert.equal(core.cosine([1,0],[0,1]),0);
  assert.equal(core.cosine([1,0],[-1,0]),-1);assert.equal(core.cosine([0,0],[1,0]),0);
  assert.throws(()=>core.cosine([1],[1,2]));
});
test('retrieval comparison exposes the intentional exact-word versus paraphrase case',()=>{
  const keyword=core.ranking('approval','keyword',2),vector=core.ranking('approval','vector',2);
  assert.deepEqual(keyword.results.map(d=>d.id),['D1','D5']);
  assert.deepEqual(vector.results.map(d=>d.id),['D1','D2']);
  assert.equal(keyword.precision,.5);assert.equal(keyword.recall,.5);
  assert.equal(vector.precision,1);assert.equal(vector.recall,1);
});
test('hybrid uses rank fusion and all metric denominators reconcile',()=>{
  for(const query of Object.keys(core.queries))for(const method of ['keyword','vector','hybrid'])for(const k of [1,2,3,5]){
    const r=core.ranking(query,method,k);assert.ok(r.results.length<=k);
    assert.equal(new Set(r.results.map(d=>d.id)).size,r.results.length);
    assert.equal(r.hits,r.results.filter(d=>d.relevant).length);
    assert.equal(r.precision,r.hits/r.results.length);assert.equal(r.recall,r.hits/r.totalRelevant);
    for(const d of r.results)assert.ok(Math.abs(d.rrf-((d.lexicalRank?1/(60+d.lexicalRank):0)+1/(60+d.vectorRank)))<1e-12);
  }
});
