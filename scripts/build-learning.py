"""Build the learning hub and articles from a documented Markdown subset (stdlib only)."""
from pathlib import Path
import html
import json
import math
import re
from datetime import date

BASE=Path(__file__).resolve().parents[1]
DIST=BASE/'dist' if (BASE/'dist').is_dir() else BASE
SOURCE=BASE/'learning'
ORIGIN='https://pratikkumar-data-ai-portfolio.woollydog11.chatgpt.site'
REPO='https://github.com/Pratikkumarchaudhari/Pratikkumarchaudhari.github.io'

def inline(text):
    s=html.escape(text)
    s=re.sub(r'`([^`]+)`',r'<code>\1</code>',s)
    s=re.sub(r'\*\*(.+?)\*\*',r'<strong>\1</strong>',s)
    def link(m):
        target=html.unescape(m[2])
        if not (target.startswith(('https://','../','#'))):
            raise ValueError('Unsupported link scheme: '+target)
        return '<a href="'+html.escape(target,quote=True)+'">'+m[1]+'</a>'
    return re.sub(r'\[([^\]]+)\]\(([^)]+)\)',link,s)

def render(markdown):
    lines=markdown.splitlines();out=[];toc=[];i=0;section=False
    while i<len(lines):
        line=lines[i].strip()
        if not line or line.startswith('# '):i+=1;continue
        if line.startswith('```'):
            code=[];i+=1
            while i<len(lines) and not lines[i].strip().startswith('```'):
                code.append(lines[i]);i+=1
            out.append('<pre><code>'+html.escape('\n'.join(code))+'</code></pre>');i+=1;continue
        widget=re.fullmatch(r'<!-- lab:([a-z-]+) -->',line)
        if widget:
            path=SOURCE/'templates'/(widget[1]+'.html')
            if not path.exists():raise ValueError('Unknown widget '+widget[1])
            out.append(path.read_text());i+=1;continue
        heading=re.fullmatch(r'## (.+?) \{#([a-z0-9-]+)\}',line)
        if heading:
            if section:out.append('</section>')
            label,anchor=heading.groups()
            if any(t[0]==anchor for t in toc):raise ValueError('Duplicate lesson ID '+anchor)
            toc.append((anchor,label));section=True
            out.append('<section class="lesson" id="'+anchor+'"><div class="lesson-heading"><div><p class="eyebrow">'+('Reference' if anchor=='sources' else 'Lesson '+str(len(toc)).zfill(2))+'</p><h2>'+inline(label)+'</h2></div><button class="copy-section" type="button" data-copy-lesson="'+anchor+'" hidden>Copy section link</button></div>');i+=1;continue
        if line.startswith('### '):out.append('<h3>'+inline(line[4:])+'</h3>');i+=1;continue
        if line.startswith('|'):
            rows=[]
            while i<len(lines) and lines[i].strip().startswith('|'):
                parts=[x.strip() for x in lines[i].strip().strip('|').split('|')]
                if not all(re.fullmatch(r':?-+:?',x) for x in parts):rows.append(parts)
                i+=1
            if len(rows)<2:raise ValueError('Table needs a header and a body')
            out.append('<div class="table-scroll" tabindex="0" role="region" aria-label="Scrollable comparison table"><table><thead><tr>'+''.join('<th scope="col">'+inline(x)+'</th>' for x in rows[0])+'</tr></thead><tbody>'+''.join('<tr>'+''.join('<td>'+inline(x)+'</td>' for x in row)+'</tr>' for row in rows[1:])+'</tbody></table></div>');continue
        if line.startswith('- '):
            items=[]
            while i<len(lines) and lines[i].strip().startswith('- '):
                items.append('<li>'+inline(lines[i].strip()[2:])+'</li>');i+=1
            out.append('<ul>'+''.join(items)+'</ul>');continue
        paragraph=[line];i+=1
        while i<len(lines) and lines[i].strip() and not lines[i].strip().startswith(('#','|','- ','```','<!-- lab:')):
            paragraph.append(lines[i].strip());i+=1
        out.append('<p>'+inline(' '.join(paragraph))+'</p>')
    if section:out.append('</section>')
    return '\n'.join(out),toc

def header():
    return '<a class="skip" href="#main">Skip to content</a><header class="learn-header"><a class="brand" href="index.html">PC<span>.</span> <small>/ Learning</small></a><nav aria-label="Primary navigation"><a href="../index.html">Portfolio</a><a href="index.html" aria-current="true">Learning</a><a href="../dictionary.html">Dictionary</a></nav></header>'

def shell(title,body):
    return '<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+html.escape(title)+'</title><link rel="stylesheet" href="learning.css"></head><body>'+header()+body+'<footer><p>Pratikkumar Chaudhari · Learning in public</p><p>Independent educational work · Developed with AI assistance</p><a href="'+REPO+'/tree/main/learning">Article source & posting guide ↗</a></footer><p class="toast" id="share-status" role="status"></p><script src="lab-core.js" defer></script><script src="learning.js" defer></script></body></html>\n'

def build():
    target=DIST/'learn';target.mkdir(exist_ok=True)
    posts=json.loads((SOURCE/'posts.json').read_text());cards=[];slugs=set()
    for post in posts:
        slug=post['slug']
        if not re.fullmatch('[a-z0-9-]+',slug) or slug in slugs:raise ValueError('Invalid or duplicate slug')
        slugs.add(slug)
        markdown=(SOURCE/'posts'/post['file']).read_text()
        body,toc=render(markdown)
        minutes=math.ceil(len(markdown.split())/180)
        display_date=date.fromisoformat(post['date']).strftime('%B %d, %Y').replace(' 0',' ')
        experiment_count=sum(markdown.count('<!-- lab:'+name+' -->') for name in ['architecture','chunking','retrieval'])
        nav=''.join('<a href="#'+a+'"><span>'+str(n).zfill(2)+'</span>'+html.escape(t)+'</a>' for n,(a,t) in enumerate(toc,1))
        source=REPO+'/blob/main/learning/posts/'+post['file']
        intro='<main id="main"><div class="article-intro"><a class="back" href="index.html">← All learning articles</a><p class="eyebrow">'+html.escape(post['level'])+' · Learning field guide</p><h1>'+html.escape(post['title'])+'</h1><p class="lede">'+html.escape(post['summary'])+'</p><div class="article-meta"><span>By Pratikkumar Chaudhari</span><time datetime="'+post['date']+'">'+display_date+'</time><span>About '+str(minutes)+' min · '+str(len(toc)-1)+' lessons + sources</span></div><div class="actions"><button type="button" class="button primary" data-copy-page hidden>Copy guide link ↗</button><button type="button" class="button" data-print hidden>Print / save PDF</button><a class="text-link" href="'+source+'">Read the Markdown ↗</a></div><p class="small">Share this guide directly. No login, subscription or API key is needed.</p></div>'
        contents='<div class="reading-layout"><aside class="toc"><details open><summary>In this guide</summary><nav aria-label="Lesson contents">'+nav+'</nav></details></aside><article class="article-body">'+body+'</article></div></main>'
        (target/(slug+'.html')).write_text(shell(post['title']+' | AI Learning',intro+contents))
        cards.append('<article class="article-card"><div class="card-number">'+str(len(cards)+1).zfill(2)+'</div><div><p class="eyebrow">'+html.escape(post['level'])+' · Published '+post['date']+'</p><h2><a href="'+slug+'.html">'+html.escape(post['title'])+'</a></h2><p>'+html.escape(post['summary'])+'</p><div class="tags">'+''.join('<span>'+html.escape(t)+'</span>' for t in post['topics'])+'</div><p class="small">'+str(len(toc)-1)+' lessons · '+str(experiment_count)+' interactive experiments · About '+str(minutes)+' min</p><a class="read-link" href="'+slug+'.html">Start learning <span aria-hidden="true">↗</span></a></div></article>')
    hub='<main id="main" class="hub"><section class="hub-hero"><div><p class="eyebrow">A notebook, shared openly</p><h1>Learn AI.<br><em>Understand the pieces.</em></h1><p class="lede">Simple explanations, visual architectures and small experiments. Start with RAG, then follow the questions behind each design choice.</p><div class="actions"><a class="button primary" href="rag.html">Start with RAG ↗</a><button class="button" type="button" data-copy-page hidden>Copy learning link</button></div></div><aside class="learning-note"><span class="note-symbol" aria-hidden="true">Aa → 01 → ?</span><h2>From “what is it?”<br>to “why use it?”</h2><p>Read the idea.<br>See the flow.<br>Change one thing.<br>Explain the tradeoff.</p><span class="small">By Pratikkumar Chaudhari</span></aside></section><section aria-labelledby="articles-title"><div class="hub-section-head"><h2 id="articles-title">The learning notebook</h2><p>Beginner-friendly · Free to read · Shareable</p></div>'+''.join(cards)+'</section><section class="about-learning"><p class="eyebrow">About this space</p><h2>Learning in public, one useful explanation at a time.</h2><p>I’m building my AI understanding alongside my work in data governance and analytics. This notebook shares what I learn in plain language, with references and honest boundaries between a concept, a teaching experiment and an implemented project.</p><p>New articles can be added as Markdown posts through the <a href="'+REPO+'/tree/main/learning">GitHub posting workflow</a>. This first article covers RAG foundations and common design choices; it is not an exhaustive catalog of AI.</p></section></main>'
    (target/'index.html').write_text(shell('AI Learning | Pratikkumar Chaudhari',hub))
    print('Built learning hub and '+str(len(posts))+' article(s).')

if __name__=='__main__':build()
