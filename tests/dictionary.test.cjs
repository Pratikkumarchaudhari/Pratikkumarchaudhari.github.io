const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const base=path.resolve(__dirname,'../dictionary');
const api=require(path.join(base,'core.js'));
const terms=vm.runInNewContext(fs.readFileSync(path.join(base,'terms.js'),'utf8')+';PROJECT_TERMS');
test('Every term has a unique link ID and a complete project explanation',()=>{
 assert.equal(new Set(terms.map(t=>t.id)).size,terms.length);
 assert.equal(new Set(terms.map(t=>t.category)).size,5);
 assert.ok(terms.length>=80);
 terms.forEach(t=>{assert.ok(t.term&&t.definition&&t.example&&t.scope);assert.match(t.id,/^[a-z0-9-]+$/);});
});
test('Exact term matches lead before mentions in other definitions',()=>{
 assert.equal(api.filterTerms(terms,{query:'Recall'})[0].term,'Recall');
 assert.equal(api.filterTerms(terms,{query:'Precision'})[0].term,'Precision');
});
test('Search and project scope combine without conflating two meanings of accuracy',()=>{
 const dq=api.filterTerms(terms,{query:'accuracy',category:'Data quality',scope:'related'});
 assert.ok(dq.some(t=>t.term==='Accuracy'));
 assert.ok(dq.every(t=>t.category==='Data quality'&&t.scope.startsWith('Related')));
 const applied=api.filterTerms(terms,{query:'Accuracy',category:'Anomaly detection',scope:'applied'});
 assert.ok(applied.every(t=>!t.scope.startsWith('Related')));
 assert.ok(!applied.some(t=>t.term==='Accuracy'));
});
test('Unicode, formulas, and first-letter browsing remain searchable',()=>{
 assert.ok(api.filterTerms(terms,{query:'Herfindahl Hirschman'}).some(t=>t.term.includes('Herfindahl')));
 assert.ok(api.filterTerms(terms,{query:'6.56'}).some(t=>t.term==='Matched-branch growth'));
 assert.ok(api.filterTerms(terms,{letter:'C'}).every(t=>api.normalize(t.term).startsWith('c')));
});
test('No-result searches and related retrieval metrics are represented honestly',()=>{
 assert.equal(api.filterTerms(terms,{query:'not-a-real-term-xyz'}).length,0);
 const retrieval=api.filterTerms(terms,{category:'RAG and Q&A',scope:'related'});
 assert.ok(retrieval.some(t=>t.term==='Recall at k'));
 assert.ok(retrieval.some(t=>t.term==='Precision at k'));
});
