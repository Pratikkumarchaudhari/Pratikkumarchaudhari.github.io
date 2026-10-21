'use strict';
const terms=PROJECT_TERMS;
const $=id=>document.getElementById(id);
const projectLinks={
  'Anomaly detection':{demo:'demos/explainable-anomaly-monitor.html',repo:'explainable-anomaly-monitor',source:'monitor.py'},
  'Branch analytics':{demo:'demos/public-bank-branch-analytics.html',repo:'public-bank-branch-analytics',source:'analysis.py'},
  'Data quality':{demo:'demos/banking-data-quality-command-center.html',repo:'banking-data-quality-command-center',source:'pipeline.py'},
  'RAG and Q&A':{demo:'demos/local-governance-rag.html',repo:'RAG-for-Beginners',source:'RAG_INTERVIEW_GUIDE.md'},
  'Shared foundations':{demo:'index.html#projects',repo:'Pratikkumarchaudhari.github.io',source:'PROJECT_DICTIONARY.md'}
};
let activeLetter='',expanded=false;
function el(tag,cls,text){const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;}
function filters(){return {query:$('search').value,category:$('category').value,scope:$('scope').value,letter:activeLetter};}
function clearHash(){if(location.hash)history.replaceState(null,'',location.pathname+location.search);}
function render(){
  const results=ProjectDictionary.filterTerms(terms,filters());const root=$('entries');root.replaceChildren();
  $('result-count').textContent=results.length+' of '+terms.length+' terms';
  $('empty').hidden=results.length>0;
  const available=ProjectDictionary.filterTerms(terms,{...filters(),letter:''});
  document.querySelectorAll('[data-letter]').forEach(button=>{const letter=button.dataset.letter;button.setAttribute('aria-pressed',String(activeLetter===letter));button.disabled=!!letter&&!available.some(t=>ProjectDictionary.normalize(t.term).startsWith(letter.toLowerCase()));});
  results.forEach(term=>{
    const card=el('article','entry');card.id='term-'+term.id;
    const row=el('div','entry-meta');row.append(el('span','category-tag',term.category));
    if(term.scope==='Related learning concept')row.append(el('span','scope-tag','Learning concept'));
    else if(term.scope.startsWith('Related'))row.append(el('span','scope-tag','Related · not measured here'));
    else if(term.scope==='Local version'||term.scope==='Browser version')row.append(el('span','scope-tag',term.scope));
    card.append(row);
    const heading=el('div','term-heading');heading.append(el('h2','',term.term));const permalink=el('a','permalink','#');permalink.href='#'+card.id;permalink.setAttribute('aria-label','Direct link to '+term.term);heading.append(permalink);card.append(heading);
    card.append(el('p','definition',term.definition));
    const detail=el('details','term-detail');detail.open=expanded;detail.append(el('summary','','Formula, example & interview note'));
    const content=el('div','detail-body');
    if(term.formula){content.append(el('p','detail-label','Formula / settings'),el('code','formula',term.formula));}
    content.append(el('p','detail-label','In this portfolio'),el('p','example',term.example));
    if(term.note)content.append(el('p','detail-label','Remember'),el('p','note',term.note));
    const links=el('div','entry-links');
    if(term.guide){const lesson=el('a','','Read the learning guide ↗');lesson.href=term.guide;links.append(lesson);}
    else{const project=projectLinks[term.category];const demo=el('a','','Open project ↗');demo.href=project.demo;const source=el('a','','Read code / guide ↗');source.href='https://github.com/Pratikkumarchaudhari/'+project.repo+'/blob/main/'+(term.scope==='Browser version'?'web-demo/governance/qa-engine.js':project.source);source.target='_blank';source.rel='noopener noreferrer';links.append(demo,source);}
    content.append(links);detail.append(content);card.append(detail);root.append(card);
  });
}
const categories=[...new Set(terms.map(t=>t.category))].sort();categories.forEach(category=>{const o=el('option','',category);o.value=category;$('category').append(o);});
['',...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'].forEach(letter=>{const button=el('button','letter',letter||'All');button.type='button';button.dataset.letter=letter;button.addEventListener('click',()=>{activeLetter=letter;clearHash();render();});$('alphabet').append(button);});
['Precision','Recall','Cohort analysis','Chunking','Check pass rate','Herfindahl–Hirschman Index (HHI)'].forEach(term=>{const b=el('button','quick-term',term);b.type='button';b.addEventListener('click',()=>{$('search').value=term;$('category').value='';$('scope').value='';activeLetter='';expanded=true;clearHash();updateExpandButton();render();});$('quick-terms').append(b);});
function updateExpandButton(){$('expand').textContent=expanded?'Collapse examples':'Expand examples';$('expand').setAttribute('aria-pressed',String(expanded));}
$('search').addEventListener('input',()=>{clearHash();render();});['category','scope'].forEach(id=>$(id).addEventListener('change',()=>{activeLetter='';clearHash();render();}));
$('reset').addEventListener('click',()=>{$('search').value='';$('category').value='';$('scope').value='';activeLetter='';clearHash();render();$('search').focus();});
$('expand').addEventListener('click',()=>{expanded=!expanded;updateExpandButton();document.querySelectorAll('.term-detail').forEach(d=>d.open=expanded);});
$('print').addEventListener('click',()=>{document.querySelectorAll('.term-detail').forEach(d=>d.open=true);window.print();document.querySelectorAll('.term-detail').forEach(d=>d.open=expanded);});
function revealHash(){const id=location.hash.replace(/^#term-/,'');const term=terms.find(t=>t.id===id);if(!term)return;$('search').value='';$('category').value='';$('scope').value='';activeLetter='';render();const card=$('term-'+id);card.querySelector('details').open=true;card.scrollIntoView({block:'start'});}
window.addEventListener('hashchange',revealHash);$('total-terms').textContent=terms.length;render();revealHash();
