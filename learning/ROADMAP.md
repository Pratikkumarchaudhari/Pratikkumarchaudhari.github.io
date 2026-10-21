# Learning notebook roadmap

## Purpose

Build a growing, beginner-friendly learning library around Pratikkumar's AI studies. Published guides are complete educational articles; planned topics are an editorial backlog, not scheduled releases or implemented projects. No automatic recurring publication is configured.

## Structure

`learning/topics.json` defines broad tracks. `learning/posts.json` registers published articles with a stable slug, track, level, tags, publication date, prerequisites and related reading. The hub derives its published counts, catalog and roadmap from these files. Search and filters work locally in the browser. Each article has its own URL and each lesson a stable anchor.

The initial tracks are AI foundations, Retrieval & knowledge, Protocols & connections, Agents & workflows, Evaluation & governance, and Emerging AI concepts. Add a track only when existing tracks no longer describe the subject clearly. Do not create a new top-level navigation tab for every technology.

## Current publishing order

| State | Article or theme | Reason |
|---|---|---|
| Published | RAG foundations | Evidence, retrieval and generation basics |
| Published | MCP foundations | External tools, resources and integration boundaries |
| Planned | Tokens, context windows and structured outputs | Vocabulary needed for later system design |
| Planned | Local read-only MCP server | Turn the connection concepts into a controlled implementation |
| Planned | Hybrid retrieval and reranking experiment | Extend RAG with measured comparisons |
| Planned | Tool calling, agents and bounded workflows | Distinguish orchestration from protocols |
| Planned | Evaluation, observability and governance | Check outcomes and operating behavior |
| Planned | Multimodal and emerging technologies | Add after study and primary-source review |

This order can change with study priorities. It is not a commitment to dates. Store publication dates only when an article is actually published.

## Article standard

Every guide must contain three substantive paths: **Beginner** (plain-language intuition and worked examples), **Intermediate** (mechanics, configuration choices and experiments), and **Advanced** (system design, evaluation, operational boundaries and tradeoffs). Each path declares prerequisites, outcomes, practice and readiness self-checks in `learning/paths.json`. A title-only difficulty label is insufficient. New readers start at Beginner, but no level is locked behind an account or a test.

- Begin with a plain-language definition and one fictional example.
- Add an accurate visual when relationships are easier to see than describe.
- Define prerequisites and link related articles without implying they are mandatory when they are not.
- Explain the important choices and limitations before adding product lists.
- Label simulations and conceptual diagrams. Never imply that a browser teaching experiment runs a real model or MCP server.
- Reference original papers and official documentation. For fast-changing protocols, state the revision and date checked; distinguish older tutorials.
- Include a small practice task, source links and a concise explanation the learner can say aloud.
- Verify interactions, internal links, accessibility, mobile layout and metadata before publishing.

## Extending the site

The builder and SEO script read the article manifest rather than a fixed list of article pages. Add a Markdown source and manifest entry, rebuild, review, then publish through the existing Sites workflow. Topic cards show a published count and separately labeled planned themes. Do not publish empty article pages for planned ideas.

Future improvements should follow observed needs: topic landing pages once a track has enough articles, a glossary spanning new terms, and deeper practice projects. Accounts, a CMS or paid infrastructure are not required for the current scope.
