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
    return '<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+html.escape(title)+'</title><link rel="stylesheet" href="learning.css"></head><body>'+header()+body+'<footer><p>Pratikkumar Chaudhari · Learning in public</p><p>Independent educational work · Developed with AI assistance</p><a href="'+REPO+'/tree/main/learning">Article source & posting guide ↗</a></footer><p class="toast" id="share-status" role="status"></p><script src="lab-core.js" defer></script><script src="catalog-core.js" defer></script><script src="mcp-core.js" defer></script><script src="learning.js" defer></script></body></html>\n'

def catalog():
    posts=json.loads((SOURCE/'posts.json').read_text())
    tracks=json.loads((SOURCE/'topics.json').read_text())
    ids=[t['id'] for t in tracks];slugs=[p['slug'] for p in posts]
    if len(ids)!=len(set(ids)) or len(slugs)!=len(set(slugs)):raise ValueError('Duplicate track or article slug')
    for post in posts:
        if not re.fullmatch('[a-z0-9-]+',post['slug']):raise ValueError('Invalid article slug')
        if post['track'] not in ids:raise ValueError('Unknown article track')
        if not re.fullmatch('[a-z0-9-]+[.]md',post['file']):raise ValueError('Invalid source filename')
        date.fromisoformat(post['date'])
        for field in ['prerequisites','related']:
            for slug in post.get(field,[]):
                if slug not in slugs or slug==post['slug']:raise ValueError('Invalid related article or prerequisite')
    return posts,tracks

def build():
    target=DIST/'learn';target.mkdir(exist_ok=True)
    posts,tracks=catalog();by_slug={p['slug']:p for p in posts};by_track={t['id']:t for t in tracks}
    cards=[];total_lessons=0
    for post in posts:
        slug=post['slug'];markdown=(SOURCE/'posts'/post['file']).read_text()
        body,toc=render(markdown)
        lessons=sum(a!='sources' for a,_ in toc);total_lessons+=lessons
        minutes=math.ceil(len(markdown.split())/180)
        display_date=date.fromisoformat(post['date']).strftime('%B %d, %Y').replace(' 0',' ')
        experiment_count=body.count('data-lab=')
        nav=''.join('<a href="#'+a+'"><span>'+str(n).zfill(2)+'</span>'+html.escape(t)+'</a>' for n,(a,t) in enumerate(toc,1))
        source=REPO+'/blob/main/learning/posts/'+post['file']
        prereqs=post.get('prerequisites',[])
        preparation=('<strong>Before you begin:</strong> '+', '.join('<a href="'+s+'.html">'+html.escape(by_slug[s]['title'])+'</a>' for s in prereqs)) if prereqs else '<strong>Before you begin:</strong> no earlier article is required.'
        intro='<main id="main"><div class="article-intro"><a class="back" href="index.html">← All learning articles</a><p class="eyebrow">'+html.escape(by_track[post['track']]['title'])+' / '+html.escape(post['level'])+'</p><h1>'+html.escape(post['title'])+'</h1><p class="lede">'+html.escape(post['summary'])+'</p><div class="article-meta"><span>By Pratikkumar Chaudhari</span><time datetime="'+post['date']+'">'+display_date+'</time><span>About '+str(minutes)+' min · '+str(lessons)+' lessons + sources</span></div><p class="preparation">'+preparation+'</p><div class="actions"><button type="button" class="button primary" data-copy-page hidden>Copy guide link ↗</button><button type="button" class="button" data-print hidden>Print / save PDF</button><a class="text-link" href="'+source+'">Read the Markdown ↗</a></div><p class="small">Share this guide directly. No login, subscription or API key is needed.</p></div>'
        related=post.get('related',[])
        related_html=('<section class="related-reading"><p class="eyebrow">Keep learning</p><h2>Connect the ideas.</h2>'+''.join('<a href="'+s+'.html">'+html.escape(by_slug[s]['title'])+' ↗</a>' for s in related)+'</section>') if related else ''
        contents='<div class="reading-layout"><aside class="toc"><details open><summary>In this guide</summary><nav aria-label="Lesson contents">'+nav+'</nav></details></aside><article class="article-body">'+body+related_html+'</article></div></main>'
        (target/(slug+'.html')).write_text(shell(post['title']+' | AI Learning',intro+contents))
        search=' '.join([post['title'],post['summary'],by_track[post['track']]['title']]+post['topics'])
        cards.append('<article class="article-card" data-article data-track="'+post['track']+'" data-level="'+html.escape(post['level'],quote=True)+'" data-search="'+html.escape(search,quote=True)+'"><div class="card-number">'+str(len(cards)+1).zfill(2)+'</div><div><p class="eyebrow">'+html.escape(by_track[post['track']]['title'])+' / '+html.escape(post['level'])+'</p><h2><a href="'+slug+'.html">'+html.escape(post['title'])+'</a></h2><p>'+html.escape(post['summary'])+'</p><div class="tags">'+''.join('<span>'+html.escape(t)+'</span>' for t in post['topics'])+'</div><p class="small">'+str(lessons)+' lessons · '+str(experiment_count)+' interactive experiment'+('' if experiment_count==1 else 's')+' · About '+str(minutes)+' min</p><a class="read-link" href="'+slug+'.html">Start learning <span aria-hidden="true">↗</span></a></div></article>')
    counts={t['id']:sum(p['track']==t['id'] for p in posts) for t in tracks}
    roadmap=''.join('<article class="track-card"><p class="eyebrow">'+str(counts[t['id']])+' published · '+str(len(t['planned']))+' planned themes</p><h3>'+html.escape(t['title'])+'</h3><p>'+html.escape(t['description'])+'</p><p class="planned-label">Planned study · not published yet</p><ul>'+''.join('<li>'+html.escape(x)+'</li>' for x in t['planned'])+'</ul></article>' for t in tracks)
    filters='<div class="catalog-controls" hidden><label for="article-search">Search published guides<input id="article-search" type="search" maxlength="200" placeholder="Try MCP, retrieval, tools…"></label><label for="article-track">Topic<select id="article-track"><option value="">All topics</option>'+''.join('<option value="'+t['id']+'">'+html.escape(t['title'])+'</option>' for t in tracks)+'</select></label><label for="article-level">Level<select id="article-level"><option value="">All levels</option>'+''.join('<option>'+html.escape(x)+'</option>' for x in dict.fromkeys(p['level'] for p in posts))+'</select></label><button type="button" class="button" id="catalog-reset">Reset</button></div>'
    hub='<main id="main" class="hub"><section class="hub-hero"><div><p class="eyebrow">A growing learning library</p><h1>Learning AI.<br><em>One clear idea at a time.</em></h1><p class="lede">Visual guides, practical experiments and honest explanations. Explore a topic today, then connect it to the concepts you learn next.</p><div class="actions"><a class="button primary" href="#articles">Explore published guides ↓</a><button class="button" type="button" data-copy-page hidden>Copy learning link</button></div><p class="small">'+str(len(posts))+' published guides · '+str(total_lessons)+' lessons · '+str(len(tracks))+' topic tracks</p></div><aside class="learning-note"><span class="note-symbol" aria-hidden="true">Read → Try → Connect</span><h2>A library that grows<br>with the learning.</h2><p>Start with the idea.<br>See how it works.<br>Test the tradeoff.<br>Follow the next question.</p><span class="small">By Pratikkumar Chaudhari</span></aside></section><section id="articles" aria-labelledby="articles-title"><div class="hub-section-head"><h2 id="articles-title">Published learning guides</h2><p>Free to read · No login · Share each guide directly</p></div>'+filters+'<p id="catalog-count" class="small" role="status">'+str(len(posts))+' published guides</p><div id="article-catalog">'+''.join(cards)+'</div><div id="catalog-empty" class="catalog-empty" hidden><h3>No published guide matches yet.</h3><p>Try another filter, or explore the planned topics below.</p></div></section><section class="roadmap-section" id="roadmap"><p class="eyebrow">The learning roadmap</p><h2>Different topics. One connected path.</h2><p>Published guides are above. The themes below are a flexible study backlog, not release dates or completed articles.</p><div class="track-grid">'+roadmap+'</div></section><section class="about-learning"><p class="eyebrow">Learning in public</p><h2>Understand it, explain it, then build on it.</h2><p>I’m developing my AI skills alongside my work in data governance and analytics. Each guide uses plain language, useful visuals, primary references and clear boundaries between a concept, a simulation and an implemented project.</p><p>Articles are added through an <a href="'+REPO+'/tree/main/learning">editable GitHub workflow</a>. The <a href="'+REPO+'/blob/main/learning/ROADMAP.md">editorial roadmap</a> records future study priorities. Planned topics become shareable articles only when their content is ready.</p></section></main>'
    (target/'index.html').write_text(shell('AI Learning | Pratikkumar Chaudhari',hub))
    print('Built learning hub and '+str(len(posts))+' article(s).')

if __name__=='__main__':build()
