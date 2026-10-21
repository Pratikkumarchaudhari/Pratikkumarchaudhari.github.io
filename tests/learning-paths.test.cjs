const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=fs.existsSync(path.join(__dirname,'../dist/learn'))?path.join(__dirname,'../dist/learn'):path.join(__dirname,'../learn');
const core=require(path.join(root,'path-core.js')),catalog=require(path.join(root,'catalog-core.js'));
const paths=JSON.parse(fs.readFileSync(path.join(__dirname,'../learning/paths.json'),'utf8'));
test('each current guide has three substantive levels and no repeated lessons',()=>{
 for(const guide of Object.values(paths)){
  assert.deepEqual(Object.keys(guide),core.order);
  const sections=[];
  for(const p of Object.values(guide)){assert.ok(p.sections.length>=3);assert.ok(p.outcomes.length>=2);assert.ok(p.practice.length>=2);assert.ok(p.readiness.length>=2);sections.push(...p.sections);}
  assert.equal(sections.length,new Set(sections).size);
 }
});
test('novices default to beginner while existing deep links reveal their owning level',()=>{
 for(const guide of Object.values(paths)){
  assert.equal(core.resolve(guide,null),'beginner');assert.equal(core.resolve(guide,'invented'),'beginner');
  const anchor=guide.advanced.sections[0];assert.equal(core.resolve(guide,null,'#'+anchor),'advanced');
  assert.equal(core.resolve(guide,'beginner','#'+anchor),'advanced');assert.equal(core.resolve(guide,'all','#'+anchor),'all');
  assert.equal(core.resolve(guide,'intermediate','#sources'),'intermediate');
 }
});
test('focused views hide unrelated lessons but retain references and all-level access',()=>{
 assert.equal(core.visible('advanced','beginner'),false);assert.equal(core.visible('intermediate','intermediate'),true);
 assert.equal(core.visible('','beginner'),true);assert.equal(core.visible('advanced','all'),true);
 const article={search:'RAG',track:'retrieval',levels:core.order};
 for(const level of core.order)assert.equal(catalog.matches(article,{level}),true);
 assert.equal(catalog.matches(article,{level:'missing'}),false);
});
