"""Maintain metadata for public portfolio pages; no external dependencies."""
from pathlib import Path
import html
import json
import re
import xml.etree.ElementTree as ET

BASE = Path(__file__).resolve().parents[1]
ROOT = BASE / 'dist' if (BASE / 'dist').is_dir() else BASE
ORIGIN = 'https://pratikkumar-data-ai-portfolio.woollydog11.chatgpt.site'
NAME = 'Pratikkumar Chaudhari'
PAGES = {
    'learn/index.html': ('AI Learning Hub | Pratikkumar Chaudhari',
        'Explore visual AI learning guides on RAG, MCP and emerging concepts. Filter published articles by topic and follow a growing beginner-friendly study roadmap.'),
    'index.html': ('Pratikkumar Chaudhari | Data Governance & Analytics Portfolio',
        'Explore Pratikkumar Chaudhari’s data governance, Snowflake, Tableau and Python experience, research publications, and hands-on analytics and AI projects.'),
    'dictionary.html': ('Data & AI Project Dictionary | Pratikkumar Chaudhari',
        'Learn precision, recall, cohort analysis, RAG, chunking and data quality through 82 definitions, formulas and examples from four portfolio projects.'),
    'demos/local-governance-rag.html': ('Data Governance RAG Assistant | Pratikkumar Chaudhari',
        'Try source-grounded governance Q&A with citations and compare browser retrieval with a local Python RAG project using Chroma, embeddings and Ollama.'),
    'demos/banking-data-quality-command-center.html': ('Banking Data Quality Dashboard | Pratikkumar Chaudhari',
        'Inspect seven quality rules across 250 synthetic banking records. Explore failed checks, affected columns, exceptions, metrics and reproducible Python code.'),
    'demos/public-bank-branch-analytics.html': ('Bank Branch & Deposit Analysis | Pratikkumar Chaudhari',
        'Explore synthetic branch deposits, state concentration and matched-branch growth. Inspect the 6.56% calculation, static datasets and Python methodology.'),
    'demos/explainable-anomaly-monitor.html': ('Explainable Anomaly Detection | Pratikkumar Chaudhari',
        'Compare Isolation Forest and monitoring rules on synthetic data. Inspect 600 test records, false alarms, missed anomalies, explanations and evaluation metrics.'),
}
POSTS=json.loads((BASE/'learning/posts.json').read_text())
ARTICLE_PAGES={'learn/'+post['slug']+'.html':post for post in POSTS}
for path,post in ARTICLE_PAGES.items():
    PAGES[path]=(post.get('seo_title',post['title']+' | Pratikkumar Chaudhari'),post['summary'])

def url(path):
    return ORIGIN + ('/' if path == 'index.html' else '/' + path[:-10] if path.endswith('/index.html') else '/' + path)

def schema(path, title, description):
    person = {'@type':'Person', '@id':ORIGIN+'/#person', 'name':NAME,
              'alternateName':'Pratik Kumar Chaudhari', 'url':ORIGIN+'/',
              'jobTitle':'Data Steward and Analyst',
              'sameAs':['https://www.linkedin.com/in/pratikkumarchaudhari/',
                        'https://github.com/Pratikkumarchaudhari'],
              'knowsAbout':['Data governance','Data quality','Snowflake','SQL','Tableau','Python','Retrieval-augmented generation']}
    website = {'@type':'WebSite','@id':ORIGIN+'/#website','url':ORIGIN+'/',
               'name':NAME+' | Data Governance & Analytics Portfolio','inLanguage':'en',
               'publisher':{'@id':ORIGIN+'/#person'}}
    page = {'@type':'ProfilePage' if path=='index.html' else 'WebPage',
            '@id':url(path)+'#webpage','url':url(path),'name':title,'description':description,
            'inLanguage':'en','isPartOf':{'@id':ORIGIN+'/#website'},
            'author':{'@id':ORIGIN+'/#person'}}
    graph = [person, website, page]
    if path == 'learn/index.html':
        page['@type']='CollectionPage'
        page['hasPart']=[{'@type':'WebPage','url':url(p),'name':post['title']} for p,post in ARTICLE_PAGES.items()]
    if path in ARTICLE_PAGES:
        post=ARTICLE_PAGES[path]
        article={'@type':'Article','@id':url(path)+'#article','headline':post['title'],
                 'description':description,'author':{'@id':ORIGIN+'/#person'},
                 'datePublished':post['date'],'inLanguage':'en',
                 'mainEntityOfPage':{'@id':url(path)+'#webpage'},
                 'image':ORIGIN+'/assets/social-card.png'}
        page['mainEntity']={'@id':article['@id']}
        graph.append(article)
    if path == 'index.html':
        page['mainEntity']={'@id':ORIGIN+'/#person'}
        page['hasPart']=[{'@type':'WebPage','url':url(p),'name':v[0]} for p,v in PAGES.items() if p!='index.html']
    else:
        graph.append({'@type':'BreadcrumbList','itemListElement':[
            {'@type':'ListItem','position':1,'name':'Portfolio','item':ORIGIN+'/'},
            {'@type':'ListItem','position':2,'name':title.split(' | ')[0],'item':url(path)}]})
    return {'@context':'https://schema.org','@graph':graph}

def update():
    # Keep definitions readable and crawlable without requiring the interactive UI.
    dictionary=ROOT/'dictionary.html'
    content=dictionary.read_text()
    content=re.sub(r'<!-- STATIC TERMS BEGIN -->.*?<!-- STATIC TERMS END -->', '', content, flags=re.S)
    terms=json.loads((ROOT/'dictionary/terms.js').read_text().split('=',1)[1].strip().rstrip(';'))
    definitions=''.join('<dt>'+html.escape(t['term'])+' <small>('+html.escape(t['category'])+')</small></dt><dd>'+html.escape(t['definition'])+'</dd>' for t in terms)
    reference='<!-- STATIC TERMS BEGIN --><section class="closing static-reference"><details><summary>Browse all 82 plain-language definitions</summary><p>A text reference for reading without the interactive filters. Use the search above for formulas, project examples and interpretation notes.</p><dl>'+definitions+'</dl></details></section><!-- STATIC TERMS END -->'
    content=content.replace('</main>',reference+'</main>',1)
    dictionary.write_text(content)
    for path,(title,description) in PAGES.items():
        file=ROOT/path
        content=file.read_text()
        content=re.sub(r'\s*<!-- SEO BEGIN -->.*?<!-- SEO END -->', '', content, flags=re.S)
        content=re.sub(r'<title>.*?</title>', '', content, flags=re.S)
        content=re.sub(r'<meta\s+name=["\']description["\'][^>]*>', '', content, flags=re.I)
        e=lambda s: html.escape(s,quote=True)
        tags=[f'<title>{e(title)}</title>', f'<meta name="description" content="{e(description)}">',
              '<meta name="author" content="Pratikkumar Chaudhari">',
              '<meta name="robots" content="index, follow, max-image-preview:large">',
              '<meta name="theme-color" content="#3155f5">',
              f'<link rel="canonical" href="{url(path)}">',
              f'<link rel="icon" href="{ORIGIN}/assets/favicon.svg" type="image/svg+xml">',
              '<meta property="og:type" content="website">',
              '<meta property="og:locale" content="en_US">',
              '<meta property="og:site_name" content="Pratikkumar Chaudhari — Portfolio">',
              f'<meta property="og:title" content="{e(title)}">',
              f'<meta property="og:description" content="{e(description)}">',
              f'<meta property="og:url" content="{url(path)}">',
              f'<meta property="og:image" content="{ORIGIN}/assets/social-card.png">',
              '<meta property="og:image:width" content="1200">',
              '<meta property="og:image:height" content="630">',
              '<meta property="og:image:alt" content="Pratikkumar Chaudhari — Data governance, analytics and applied AI portfolio">',
              '<meta name="twitter:card" content="summary_large_image">',
              f'<meta name="twitter:title" content="{e(title)}">',
              f'<meta name="twitter:description" content="{e(description)}">',
              f'<meta name="twitter:image" content="{ORIGIN}/assets/social-card.png">',
              '<script type="application/ld+json">'+json.dumps(schema(path,title,description),ensure_ascii=False).replace('<','\\u003c')+'</script>']
        block='\n<!-- SEO BEGIN -->\n'+'\n'.join(tags)+'\n<!-- SEO END -->\n'
        content=content.replace('</head>',block+'</head>',1)
        file.write_text('\n'.join(line.rstrip() for line in content.splitlines())+'\n')
    ns='http://www.sitemaps.org/schemas/sitemap/0.9'
    ET.register_namespace('',ns)
    root=ET.Element('{'+ns+'}urlset')
    for path in PAGES:
        item=ET.SubElement(root,'{'+ns+'}url')
        ET.SubElement(item,'{'+ns+'}loc').text=url(path)
    ET.indent(root)
    ET.ElementTree(root).write(ROOT/'sitemap.xml',encoding='utf-8',xml_declaration=True)
    (ROOT/'robots.txt').write_text('User-agent: *\nAllow: /\n\nSitemap: '+ORIGIN+'/sitemap.xml\n')

if __name__=='__main__':
    update()
    print('Updated metadata, JSON-LD, robots.txt and sitemap.xml for '+str(len(PAGES))+' pages.')
