# Learning notebook — posting and maintenance

Public hub: https://pratikkumar-data-ai-portfolio.woollydog11.chatgpt.site/learn/

RAG: https://pratikkumar-data-ai-portfolio.woollydog11.chatgpt.site/learn/rag.html

MCP: https://pratikkumar-data-ai-portfolio.woollydog11.chatgpt.site/learn/mcp.html

The hub groups published guides by topic, with text search and level filters. A separately labeled study roadmap is driven by `topics.json`. See [ROADMAP.md](ROADMAP.md) for the editorial plan. Planned themes do not generate empty article pages.

Every published guide now has Beginner, Intermediate and Advanced paths. Readers start at Beginner, can continue after a self-check, or choose another level directly. `?level=intermediate` and `?level=advanced` are shareable views; old section anchors still reveal the level containing that lesson. `?level=all` shows the complete guide. Without JavaScript, all content remains readable in learning order. There is no grading or completion certificate.

Share either link directly. Each section also has a stable #anchor and a copy-link button. No account or API key is required to read the guide or use its browser-only teaching experiments. There is no paid AI call, login, live vector database, or hosted Ollama dependency in this section.

## Edit the current article

Open [posts/rag.md](posts/rag.md) on GitHub and use Edit to update the source. The published HTML is built from this Markdown rather than being the primary editing surface. Changes on GitHub do not automatically redeploy Sites; after editing, ask Codex to rebuild and publish the learning section, or follow the configured Sites source/publishing workflow.

## Add an article

1. Create a new file in `learning/posts/`, using [POST_TEMPLATE.md](POST_TEMPLATE.md) as a starting point. Do not add the template itself to the manifest.
2. Add its slug, filename, title, summary, ISO publication date, level, track ID and topic tags to `learning/posts.json`. Use a stable lowercase hyphenated slug, for example `embeddings-in-plain-english`. Optional `prerequisites` and `related` contain other published article slugs; `seo_title` sets a search title. Track IDs must exist in `learning/topics.json`.
3. Add the article's three level profiles to `learning/paths.json`. Each needs a title, description, prerequisite, section-anchor list, outcomes, practice and readiness statements. Assign every lesson to exactly one level; shared sources remain outside the levels. Use the current RAG/MCP entries as examples. The builder rejects missing levels, repeated assignments and unassigned lessons. Then build with `python scripts/build-learning.py` from the repository root. The script works with the Site's dist directory and the flat GitHub source mirror.
4. Run `python scripts/update-seo.py`. It now discovers published learning articles from the same manifest, generates their Article metadata and includes them in the sitemap automatically. Supply an accurate publication date and headline for each article.
5. Run `node --test tests/learning.test.cjs tests/mcp-learning.test.cjs tests/learning-paths.test.cjs` and `python -m unittest discover -s tests -p test_learning_build.py`, check links and review the content. Test Beginner defaults, level transitions, direct links into advanced sections and copying a selected level. Tests detect the Site or flat GitHub layout automatically. Publish the pushed source through the Sites workflow. Existing article URLs should stay stable.

The hub automatically lists manifest entries. Article publication requires a source edit, rebuild and deployment; this is not an authenticated browser CMS. For a nontechnical update, supply your draft to Codex and ask it to add and publish a learning post.

## Supported Markdown subset

The dependency-free renderer supports paragraphs, `#` article titles (the manifest supplies the rendered H1), `## Heading {#stable-anchor}` sections, `###` subheadings, `**bold**`, inline backticks, HTTPS and relative `../` links, `-` bullet lists, pipe tables, and triple-backtick code blocks. It does not support arbitrary raw HTML, nested lists or full CommonMark syntax. The final section should be `## Read the primary sources {#sources}`; lesson counts exclude that reference section.

Registered comments such as `<!-- lab:architecture -->` embed reviewed widget templates from `learning/templates/`. They are optional and should only be used with relevant content. Add new widget behavior and tests deliberately; never imply a teaching simulation uses a real model when it does not.

## Source layout

| Path | Purpose |
|---|---|
| `learning/posts.json` | Article catalog |
| `learning/topics.json` | Topic tracks and separately labeled planned themes |
| `learning/paths.json` | Required three-level lesson assignments, outcomes and readiness checks |
| `learning/ROADMAP.md` | Editorial sequence and content standards |
| `learning/posts/*.md` | Editable article content |
| `learning/templates/*.html` | Accessible diagrams and widget markup |
| `scripts/build-learning.py` | Dependency-free Markdown-subset renderer and hub builder |
| `learn/` (or Site `dist/learn/`) | Published pages, CSS and browser JavaScript |
| `tests/learning.test.cjs` | Chunking, ranking and metric behavior tests |

Content standards: plain-language definitions before jargon, a practical example, at least one useful visual when it clarifies the idea, tradeoffs, primary references, and a clear distinction between an implemented project and an illustrative concept. Product examples are not recommendations or pricing promises. Original educational text is developed with AI assistance; do not attribute employer records or outcomes to these examples.
