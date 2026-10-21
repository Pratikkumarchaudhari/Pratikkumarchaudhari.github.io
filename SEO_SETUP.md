# Portfolio search visibility

The primary public URL is https://pratikkumar-data-ai-portfolio.woollydog11.chatgpt.site/ . All published pages use that origin for canonical URLs. The GitHub repository is a source mirror; do not change canonicals to a different host unless deliberately migrating the primary site.

Implemented: individual titles and descriptions, Person/WebSite/ProfilePage and breadcrumb JSON-LD, canonical links, index/follow directives, social sharing previews, a favicon, robots.txt, an automatically generated XML sitemap, static dictionary definitions, and lightweight progressive animations that respect reduced motion. No paid service or tracking script was added. There are no fabricated reviews or ratings.

## Optional owner setup in Google Search Console

1. Sign in at https://search.google.com/search-console/ with your Google account.
2. Add a **URL-prefix property** for the primary public URL above (including https and the trailing slash). This hosted subdomain does not require you to own its parent domain.
3. Choose HTML tag verification. Add Google's exact verification tag to the home page head, republish, then verify. Alternatively, use HTML-file verification and publish the exact file supplied by Google.
4. Submit `sitemap.xml` in the Sitemaps section.
5. Inspect the home page URL and request indexing. Use Search Console to review indexing errors, queries, impressions, and clicks over time.

This setup has not been completed on the owner's behalf: no signed-in Search Console session or verification token was supplied. robots.txt advertises the sitemap for crawler discovery without account setup. Publishing a sitemap does not guarantee crawling or indexing. SEO does not guarantee a particular position or a rating, and this work does not establish a Lighthouse or PageSpeed score.

Add the primary portfolio link to your LinkedIn Featured section, resume, and GitHub profile to help people discover it. Keep project explanations accurate and publish meaningful updates. Search results may take time to reflect changes.

## Maintaining metadata

Run `python scripts/update-seo.py` after changing page titles, descriptions, or dictionary data. It works with the Site's dist directory and with the flat GitHub source mirror. It preserves other page content and regenerates the sitemap. Review generated changes and publish through the Site workflow.

The social card is a 1200 × 630 PNG at `assets/social-card.png`; favicon is `assets/favicon.svg`. The canonical home URL is `/`, not `/index.html`. No `lastmod` timestamps are manufactured. Static content is available without animation support or JavaScript; the dictionary additionally has a complete static definition reference.

Validation includes parsing page metadata and structured data, reconciling sitemap URLs and canonical URLs, checking local assets and navigation, and JavaScript syntax checks. Browser visual QA and Google's Rich Results/PageSpeed/Search Console checks require their respective supported tools and have not been claimed as passed.

References:
- https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- https://developers.google.com/search/docs/appearance/structured-data/profile-page


The learning hub is at `/learn/` and the first RAG guide at `/learn/rag.html`. To regenerate learning pages, run `python scripts/build-learning.py` before updating SEO metadata. See `learning/README.md` for future posting steps.


Published learning articles and their Article metadata are now discovered from `learning/posts.json`. New guides enter the sitemap automatically after `build-learning.py` and `update-seo.py` run. Topic tracks and planned study themes live separately in `learning/topics.json`. Local browser checks covered the learning catalog and MCP simulator; external Search Console and PageSpeed checks have not been performed.
