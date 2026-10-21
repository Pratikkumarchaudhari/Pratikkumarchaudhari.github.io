(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.MCPLesson=factory();})(typeof globalThis!=='undefined'?globalThis:this,function(){
  const datasets={'demo-branches':{records:250,failed:18},'demo-loans':{records:120,failed:12}};
  function simulate({operation='tool',dataset='demo-branches',allowed=true,fail=false}={}){
    if(!['tool','resource','prompt'].includes(operation))throw new Error('Unknown demo capability');
    const trace=['Host identifies the fictional capability.','Host checks its simulated permission gate.'];
    if(!allowed)return {status:'blocked',sent:false,request:null,result:{stage:'host-policy',requestSent:false,message:'The host stopped this simulated capability.'},trace:[...trace,'Stopped before a client request was sent.']};
    const request=operation==='tool'?{method:'tools/call',params:{name:'get_quality_summary',arguments:{dataset_id:dataset}}}:operation==='resource'?{method:'resources/read',params:{uri:'policy://demo/access'}}:{method:'prompts/get',params:{name:'explain_quality_report',arguments:{audience:'beginner'}}};
    trace.push('Client forms a conceptual request fragment.');
    if(fail)return {status:'unavailable',sent:true,request,result:{stage:'transport',message:'Simulated unavailable server; no MCP result received.'},trace:[...trace,'The simulated transport fails; the operation does not run.']};
    trace.push('Server receives the request and checks its arguments.');
    if(operation==='tool'&&!datasets[dataset])return {status:'invalid',sent:true,request,result:{isError:true,content:[{type:'text',text:'Unknown fictional dataset ID.'}]},trace:[...trace,'Server rejects the unknown dataset; no data-source operation runs.']};
    let result;
    if(operation==='tool'){const d=datasets[dataset],passed=d.records-d.failed;result={content:[{type:'text',text:JSON.stringify({dataset_id:dataset,records:d.records,failed_records:d.failed,passed_records:passed,record_pass_rate:Math.round(passed/d.records*1000)/10})}]};}
    if(operation==='resource')result={contents:[{uri:'policy://demo/access',mimeType:'text/plain',text:'Fictional policy: the data owner approves access after a business justification is recorded.'}]};
    if(operation==='prompt')result={description:'Fictional quality-report explanation template',messages:[{role:'user',content:{type:'text',text:'Explain the supplied quality counts to a beginner. State the denominator, distinguish failed records from failed checks, and do not invent a cause.'}}]};
    trace.push('Server executes the fictional operation and returns its result.','Host receives the result; a real application could now explain it.');
    return {status:'success',sent:true,request,result,trace};
  }
  return {simulate};
});
