# Learning notebook — posting and maintenance

Public hub: https://pratikkumar-data-ai-portfolio.woollydog11.chatgpt.site/learn/

First article: https://pratikkumar-data-ai-portfolio.woollydog11.chatgpt.site/learn/rag.html

Share either link directly. Each section also has a stable #anchor and a copy-link button. No account or API key is required to read the guide or use its browser-only teaching experiments. There is no paid AI call, login, live vector database, or hosted Ollama dependency in this section.

## Edit the current article

Open [posts/rag.md](posts/rag.md) on GitHub and use Edit to update the source. The published HTML is built from this Markdown rather than being the primary editing surface. Changes on GitHub do not automatically redeploy Sites; after editing, ask Codex to rebuild and publish the learning section, or follow the configured Sites source/publishing workflow.

## Add an article

1. Create a new file in `learning/posts/`, using [POST_TEMPLATE.md](POST_TEMPLATE.md) as a starting point. Do not add the template itself to the manifest.
2. Add its slug, filename, title, summary, ISO publication date, level and topics to `learning/posts.json`. Use a stable lowercase hyphenated slug, for example `embeddings-in-plain-english`.
3. Build with `python scripts/build-learning.py` from the repository root. The script works with the Site's dist directory and the flat GitHub source mirror.
4. Register the new `learn/<slug>.html` title and description in `PAGES` in `scripts/update-seo.py`, then run `python scripts/update-seo.py`. New articles need appropriate schema metadata; do not reuse the first article's publication date or headline.
5. Run `node --test tests/learning.test.cjs`, check links and review the content. The test detects the Site or flat GitHub layout automatically. Publish the pushed source through the Sites workflow. Existing article URLs should stay stable.

The hub automatically lists manifest entries. Article publication requires a source edit, rebuild and deployment; this is not an authenticated browser CMS. For a nontechnical update, supply your draft to Codex and ask it to add and publish a learning post.

## Supported Markdown subset

The dependency-free renderer supports paragraphs, `#` article titles (the manifest supplies the rendered H1), `## Heading {#stable-anchor}` sections, `###` subheadings, `**bold**`, inline backticks, HTTPS and relative `../` links, `-` bullet lists, pipe tables, and triple-backtick code blocks. It does not support arbitrary raw HTML, nested lists or full CommonMark syntax. The final section should be `## Read the primary sources {#sources}`; lesson counts exclude that reference section.

Registered comments such as `<!-- lab:architecture -->` embed reviewed widget templates from `learning/templates/`. They are optional and should only be used with relevant content. Add new widget behavior and tests deliberately; never imply a teaching simulation uses a real model when it does not.

## Source layout

| Path | Purpose |
|---|---|
| `learning/posts.json` | Article catalog |
| `learning/posts/*.md` | Editable article content |
| `learning/templates/*.html` | Accessible diagrams and widget markup |
| `scripts/build-learning.py` | Dependency-free Markdown-subset renderer and hub builder |
| `learn/` (or Site `dist/learn/`) | Published pages, CSS and browser JavaScript |
| `tests/learning.test.cjs` | Chunking, ranking and metric behavior tests |

Content standards: plain-language definitions before jargon, a practical example, at least one useful visual when it clarifies the idea, tradeoffs, primary references, and a clear distinction between an implemented project and an illustrative concept. Product examples are not recommendations or pricing promises. Original educational text is developed with AI assistance; do not attribute employer records or outcomes to these examples.
