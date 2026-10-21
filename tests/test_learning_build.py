"""Check future-article and catalog behavior, independent of published article count."""
import importlib.util
import json
from pathlib import Path
import tempfile
import unittest

BASE=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('learning_build',BASE/'scripts/build-learning.py')
builder=importlib.util.module_from_spec(spec);spec.loader.exec_module(builder)

class LearningBuildTests(unittest.TestCase):
    def test_another_article_is_listed_without_a_new_hub_template(self):
        with tempfile.TemporaryDirectory() as folder:
            base=Path(folder);source=base/'learning';(source/'posts').mkdir(parents=True)
            (base/'dist').mkdir()
            tracks=[{'id':'future','title':'Future topic','description':'Study path','planned':['An unpublished idea']}]
            posts=[{'slug':'new-concept','file':'new-concept.md','title':'A new concept','summary':'Example guide','date':'2026-10-21','level':'Foundations','track':'future','topics':['Example'],'prerequisites':[],'related':[]}]
            (source/'topics.json').write_text(json.dumps(tracks));(source/'posts.json').write_text(json.dumps(posts))
            (source/'posts/new-concept.md').write_text('# A new concept\n\n## Learn it {#learn-it}\n\nA useful explanation.\n\n## Compare it {#compare-it}\n\nTradeoffs.\n\n## Design it {#design-it}\n\nA deeper exercise.\n\n## Sources {#sources}\n\nPrimary references.')
            paths={level:{'title':level,'description':'A focused level','prerequisite':'Earlier level as needed','sections':[section],'outcomes':['Explain it'],'practice':['Try it'],'readiness':['I can explain it']} for level,section in zip(builder.LEVELS,['learn-it','compare-it','design-it'])}
            (source/'paths.json').write_text(json.dumps({'new-concept':paths}))
            prior=(builder.SOURCE,builder.DIST)
            try:
                builder.SOURCE=source;builder.DIST=base/'dist';builder.build()
                hub=(base/'dist/learn/index.html').read_text()
                self.assertIn('href="new-concept.html"',hub);self.assertIn('data-track="future"',hub)
                self.assertIn('An unpublished idea',hub)
                self.assertFalse((base/'dist/learn/an-unpublished-idea.html').exists())
                article=(base/'dist/learn/new-concept.html').read_text()
                self.assertIn('data-lesson-level="advanced"',article)
                self.assertIn('Continue to Intermediate',article)
                self.assertIn('data-guide-entry="new-concept.html"',hub)
                paths['advanced']['sections']=['learn-it']
                (source/'paths.json').write_text(json.dumps({'new-concept':paths}))
                with self.assertRaises(ValueError):builder.build()
                posts[0]['related']=['missing'];(source/'posts.json').write_text(json.dumps(posts))
                with self.assertRaises(ValueError):builder.catalog()
            finally:builder.SOURCE,builder.DIST=prior

if __name__=='__main__':unittest.main()
