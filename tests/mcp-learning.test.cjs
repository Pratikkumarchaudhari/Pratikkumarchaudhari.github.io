const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=fs.existsSync(path.join(__dirname,'../dist/learn'))?path.join(__dirname,'../dist/learn'):path.join(__dirname,'../learn');
const mcp=require(path.join(root,'mcp-core.js')),catalog=require(path.join(root,'catalog-core.js'));
test('host denial prevents a simulated request even if a failure was selected',()=>{
  for(const operation of ['tool','resource','prompt']){const r=mcp.simulate({operation,allowed:false,fail:true});assert.equal(r.status,'blocked');assert.equal(r.sent,false);assert.equal(r.request,null);assert.equal(r.result.requestSent,false);}
});
test('tool simulation reconciles fictional counts and distinguishes failure modes',()=>{
  const r=mcp.simulate(),data=JSON.parse(r.result.content[0].text);
  assert.equal(data.passed_records+data.failed_records,data.records);assert.equal(data.record_pass_rate,92.8);
  assert.equal(r.request.method,'tools/call');assert.equal(r.sent,true);
  const invalid=mcp.simulate({dataset:'unknown'});assert.equal(invalid.status,'invalid');assert.equal(invalid.result.isError,true);
  const unavailable=mcp.simulate({fail:true});assert.equal(unavailable.status,'unavailable');assert.equal(unavailable.result.stage,'transport');assert.equal(unavailable.result.content,undefined);
});
test('resources and prompts use separate methods and data shapes',()=>{
  const resource=mcp.simulate({operation:'resource'}),prompt=mcp.simulate({operation:'prompt'});
  assert.equal(resource.request.method,'resources/read');assert.equal(resource.result.contents[0].uri,'policy://demo/access');
  assert.equal(prompt.request.method,'prompts/get');assert.equal(prompt.result.messages[0].role,'user');
  assert.throws(()=>mcp.simulate({operation:'invented'}));
});
test('catalog combines query, topic and level without turning planned themes into articles',()=>{
  const article={search:'MCP: tools, resources and AI connections',track:'connections',level:'Foundations'};
  assert.equal(catalog.matches(article,{query:'MCP resources',track:'connections',level:'Foundations'}),true);
  assert.equal(catalog.matches(article,{query:'RAG'}),false);assert.equal(catalog.matches(article,{track:'emerging'}),false);
  assert.equal(catalog.matches(article,{level:'Start here'}),false);assert.equal(catalog.matches(article,{query:'   '}),true);
});
