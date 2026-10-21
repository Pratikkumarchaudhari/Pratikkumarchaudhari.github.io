# Project Dictionary
Plain-language definitions, formulas and examples from portfolio projects and AI learning guides. Project examples use synthetic or fictional data; learning options are distinguished from implemented features.
[Open the searchable dictionary](https://pratikkumar-data-ai-portfolio.woollydog11.chatgpt.site/dictionary.html)

## Abstention
**Category:** RAG and Q&A · **Scope:** Implemented concept

Declining to answer when the system lacks sufficient supporting evidence.

**Example:** No retained passages means the local app returns an insufficient-evidence message without calling Ollama.

**Remember:** Weak but nonempty evidence can still produce an unsupported answer. The browser uses different lexical gates.

## Accuracy
**Category:** Anomaly detection · **Scope:** Related concept

The proportion of all labeled records classified correctly.

**Formula / settings:** (TP + TN) / total records

**Example:** (32 + 534) / 600 is approximately 94.33%, despite recall of only 66.67%.

**Remember:** This derived illustration is not a headline metric currently saved by monitor.py. Accuracy can hide minority-class misses.

## Accuracy
**Category:** Data quality · **Scope:** Related concept; not measured

Whether a value reflects the correct real-world fact.

**Example:** Confirming an address exists would require additional authoritative evidence.

**Remember:** The current dashboard does not measure real-world accuracy. Format and allowed-value checks are not a substitute.

## Affected record
**Category:** Data quality · **Scope:** Implemented concept

A distinct source row that fails at least one quality rule.

**Example:** The sample has 67 failed checks affecting 62 source rows.

**Remember:** Count distinct source row numbers, because institution IDs may be duplicated.

## Anomaly
**Category:** Anomaly detection · **Scope:** Implemented concept

A record whose measured behavior differs from the reference pattern enough to warrant attention.

**Example:** The synthetic generator injects unusually large volume, latency, error-rate, or missing-rate values.

**Remember:** An unusual record is not automatically wrong, fraudulent, or harmful.

## Anomaly score
**Category:** Anomaly detection · **Scope:** Implemented concept

A numeric ranking of how unusual a record appears under the detector.

**Formula / settings:** Project score = −IsolationForest.score_samples(features)

**Example:** The project uses the negative score so larger values are more unusual.

**Remember:** Score direction depends on the API. This score is not a probability of fraud or error.

## Approximate nearest-neighbor search (ANN)
**Category:** RAG and Q&A · **Scope:** Related learning concept

Find likely nearby vectors using an index that trades some search recall for speed.

**Example:** HNSW is one ANN approach shown in the store/index layer.

**Remember:** ANN search recall is distinct from relevance recall in a labeled question evaluation.

[Read the learning guide](https://pratikkumar-data-ai-portfolio.woollydog11.chatgpt.site/learn/rag.html?level=intermediate#vector-databases)

## As-of date
**Category:** Data quality · **Scope:** Implemented concept

The reference date against which a time-sensitive rule is evaluated.

**Example:** The sample’s recency check uses 2026-09-30.

**Remember:** A batch’s evaluation date is different from today’s date or the time a visitor opens the report.

## Average precision
**Category:** Anomaly detection · **Scope:** Implemented concept

A ranking metric that averages precision values, weighted by increases in recall as the score threshold changes.

**Formula / settings:** Sum of (recall increase × precision at that step)

**Example:** monitor.py calculates average_precision_score using the injected labels and continuous anomaly scores.

**Remember:** It is not simply precision at one threshold, and it is not identical to trapezoidal PR-curve area.

## Baseline
**Category:** Shared foundations · **Scope:** Implemented concept

A simple reference approach used to judge whether a more complex method adds value.

**Example:** The anomaly model is compared with rules; semantic RAG retrieval is accompanied by a BM25 keyword baseline.

**Remember:** Different methods must be compared on consistent labels, inputs, and evaluation scope.

## BM25
**Category:** RAG and Q&A · **Scope:** Implemented concept

A lexical relevance score based on term frequency, term rarity, and text length.

**Formula / settings:** Project parameters: k1 = 1.5; b = 0.75

**Example:** The Python baseline scores character chunks. The browser scores documents and sentences.

**Remember:** BM25 scores are not probabilities or cosine similarities. The browser also adds explicit aliases and role-question heuristics.

## Calibration set
**Category:** Anomaly detection · **Scope:** Implemented concept

A separate dataset used here to choose an operational score cutoff after fitting the model.

**Example:** 400 normal records, generated with seed 22, set the 98th-percentile review cutoff.

**Remember:** Here calibration refers to threshold selection, not converting model scores into calibrated probabilities.

## Check pass rate
**Category:** Data quality · **Scope:** Implemented concept

The fraction of evaluated rule checks that pass.

**Formula / settings:** 100 × passed checks / evaluated checks

**Example:** 1,683 / 1,750 × 100 = 96.17%.

**Remember:** This is not the percentage of entirely clean records; 188 of 250 rows pass every rule.

## Chroma
**Category:** RAG and Q&A · **Scope:** Related learning concept

A vector data system with local and server deployment options.

**Example:** The local RAG project stores searchable vectors and source metadata in persistent Chroma.

**Remember:** A deployment option is separate from a distance metric or index algorithm.

[Read the learning guide](https://pratikkumar-data-ai-portfolio.woollydog11.chatgpt.site/learn/rag.html?level=intermediate#vector-databases)

## Chunk overlap
**Category:** RAG and Q&A · **Scope:** Local version

Text intentionally repeated between adjacent chunks to preserve some boundary context.

**Formula / settings:** Step = chunk size − overlap = 600 − 100 = 500 characters

**Example:** The next window starts 500 characters after the prior start.

**Remember:** Overlap costs extra storage and can put repeated evidence in the retrieved results.

## Chunking
**Category:** RAG and Q&A · **Scope:** Local version

Splitting documents into smaller retrieval units.

**Formula / settings:** Project defaults: 600 characters per window; 100-character overlap

**Example:** The local app uses fixed-size character windows. It is not recursive, semantic, or token-based chunking.

**Remember:** A window can cut across sentences; the chosen size is a baseline, not a proven optimum.

## Cohort analysis
**Category:** Branch analytics · **Scope:** Implemented concept

Comparing a group with a shared characteristic across time so changes within that group can be examined.

**Example:** The matched cohort consists of the 162 branch IDs present in both 2024 and 2025.

**Remember:** A fixed cohort helps separate comparable deposit growth from changes in which branches are included.

## Column coverage
**Category:** Data quality · **Scope:** Implemented concept

Which source columns have explicit rules and how many checks apply to each.

**Example:** There are 7 input columns, but only 6 have rules. institution_id has two rules; bureau has none.

**Remember:** “Not assessed” is different from a 100% pass rate.

## Column profiling
**Category:** Data quality · **Scope:** Implemented concept

Summarizing properties of a column to understand its contents and potential issues.

**Example:** The dashboard shows missing values, distinct values, assigned rules, failed checks, and affected rows.

**Remember:** These profiles use normalized strings; the distinct count includes a blank when one exists.

## Completeness
**Category:** Data quality · **Scope:** Implemented concept

Whether required values are present.

**Example:** DQ001 flags 15 blank institution names.

**Remember:** A nonblank name may still be incorrect or outdated.

## Composite key
**Category:** Branch analytics · **Scope:** Implemented concept

A record identifier made from more than one field.

**Formula / settings:** Project key = (year, branch_id)

**Example:** SYN0001 can appear in both years; it cannot appear twice in the same year after validation.

**Remember:** Joining on a nonunique key can multiply rows and inflate deposit totals.

## Confusion matrix
**Category:** Anomaly detection · **Scope:** Implemented concept

A table comparing actual labels with predicted labels.

**Formula / settings:** Rows = actual; columns = predicted; labels = [normal, anomaly]

**Example:** The model matrix is [[534, 18], [16, 32]]: TN, FP in the first row and FN, TP in the second.

**Remember:** Check axis and label order before interpreting a matrix.

## Consistency
**Category:** Data quality · **Scope:** Related concept; not measured

Whether related values agree across fields, records, or sources according to defined relationships.

**Example:** Comparing an institution’s state across two authoritative systems could be a consistency check.

**Remember:** Cross-source consistency is not implemented in the current seven-rule dashboard.

## Context window
**Category:** RAG and Q&A · **Scope:** Local version

The token capacity available for a model’s working input/output context.

**Example:** The local Ollama request sets num_ctx to 4096 and num_predict to 400.

**Remember:** The code does not budget exact tokenizer counts before sending the prompt.

## Cosine similarity
**Category:** RAG and Q&A · **Scope:** Local version

A comparison of vector direction, commonly used with text embeddings.

**Formula / settings:** dot(a,b) / (norm(a) × norm(b))

**Example:** Chroma is configured for cosine distance; the app converts it with similarity = 1 − distance.

**Remember:** A similarity of 0.70 is not 70% answer confidence.

## Cross-encoder
**Category:** RAG and Q&A · **Scope:** Related learning concept

A model that jointly processes a pair of inputs to score their relationship.

**Example:** A reranker can read a question and passage together to estimate relevance.

**Remember:** Joint scoring is often more costly than initial vector retrieval.

[Read the learning guide](https://pratikkumar-data-ai-portfolio.woollydog11.chatgpt.site/learn/rag.html?level=intermediate#ranking)

## Data grain
**Category:** Branch analytics · **Scope:** Implemented concept

The real-world unit represented by one row.

**Example:** In branches.csv, one row is one branch ID in one observation year. There are 341 branch-year rows and 179 distinct branch IDs.

**Remember:** A count of rows is not automatically a count of distinct branches.

## Data leakage
**Category:** Anomaly detection · **Scope:** Related concept

Using information during training or selection that would not be available when making a new prediction.

**Example:** The project excludes injected_anomaly from features and selects the cutoff without test labels.

**Remember:** Separate seeds do not by themselves prove every aspect of an evaluation is leakage-free.

## Data lineage
**Category:** Shared foundations · **Scope:** Implemented concept

The traceable path from a data source through transformations to an output.

**Example:** A branch row leads to cohort totals and a growth metric; a RAG passage retains source/page metadata.

**Remember:** These are traceability mechanisms, not a deployed enterprise lineage catalog.

## Data validation
**Category:** Shared foundations · **Scope:** Implemented concept

Checking that an input satisfies specified requirements before or during analysis.

**Example:** The branch pipeline rejects duplicate branch-year keys and negative deposits; the quality pipeline records rule exceptions.

**Remember:** The two projects handle failures differently: rejecting an input is not the same as reporting an exception.

## Data-quality rule
**Category:** Data quality · **Scope:** Implemented concept

An explicit condition used to evaluate whether a data value or record satisfies a stated policy.

**Example:** DQ002 checks email syntax in Python/Pandas. Seven rules run on each of 250 sample rows.

**Remember:** A rule passing proves only its stated condition, not every aspect of business correctness.

## Decision threshold
**Category:** Anomaly detection · **Scope:** Implemented concept

A cutoff that converts a continuous score into a flag.

**Formula / settings:** Flag when anomaly_score ≥ threshold

**Example:** The cutoff is the 98th percentile of scores from 400 normal calibration records.

**Remember:** The benchmark applies its own cutoff; it does not use the model’s default predict() classification.

## Dense embedding
**Category:** RAG and Q&A · **Scope:** Related learning concept

A learned numerical representation with a fixed number of values, many of which carry information.

**Example:** The local MiniLM encoder produces 384-dimensional dense vectors.

**Remember:** Vector length alone does not make two encoders compatible.

[Read the learning guide](https://pratikkumar-data-ai-portfolio.woollydog11.chatgpt.site/learn/rag.html?level=intermediate#embeddings)

## Dense retrieval
**Category:** RAG and Q&A · **Scope:** Related learning concept

Retrieve candidates by comparing compatible dense query and document representations.

**Example:** A query about authorization may match a passage using the word approval.

**Remember:** Semantic similarity does not prove that a passage answers the question.

[Read the learning guide](https://pratikkumar-data-ai-portfolio.woollydog11.chatgpt.site/learn/rag.html?level=intermediate#retrieval)

## Deposit reconciliation bridge
**Category:** Branch analytics · **Scope:** Implemented concept

A breakdown that connects prior total deposits to latest total deposits through matched growth and footprint effects.

**Formula / settings:** Latest total = prior total + matched change + entering deposits − exiting deposits

**Example:** 22,652,665.00 + 1,426,144.20 + 1,332,411.78 − 896,596.00 = 24,514,624.98 ($000).

**Remember:** The sample bridge residual is zero; each amount must use consistent units and period definitions.

## Deposit share
**Category:** Branch analytics · **Scope:** Implemented concept

A group’s deposits as a percentage of a clearly specified total.

**Formula / settings:** 100 × group deposits / included total deposits

**Example:** NY holds 21.93% of the included latest-year synthetic deposits.

**Remember:** This is a share of the sample, not of the entire US banking market. State-ledger filters do not change its denominator.

## Deposit units ($000)
**Category:** Branch analytics · **Scope:** Implemented concept

A convention in which each numeric unit represents one thousand dollars.

**Formula / settings:** Dollars = reported value × 1,000

**Example:** 42,919.00 in the CSV means an illustrative $42,919,000.

**Remember:** Ratios are unchanged when numerator and denominator use the same units; totals must be labeled correctly.

## Document corpus
**Category:** RAG and Q&A · **Scope:** Implemented concept

The collection of source documents available to a retrieval system.

**Example:** The default corpus contains three fictional procedures in sample_documents/.

**Remember:** The project does not automatically scan the laptop, and project documentation is not indexed by default.

## Dot product
**Category:** RAG and Q&A · **Scope:** Related learning concept

Sum the pairwise products of corresponding vector coordinates.

**Example:** For unit-normalized vectors, dot product equals cosine similarity.

**Remember:** Without normalization, vector magnitudes affect the score.

[Read the learning guide](https://pratikkumar-data-ai-portfolio.woollydog11.chatgpt.site/learn/rag.html?level=intermediate#vector-databases)

## Drift diagnostic
**Category:** Anomaly detection · **Scope:** Implemented concept

A comparison of new feature distributions with the training reference.

**Formula / settings:** Project diagnostic = |test mean − training mean| / training standard deviation

**Example:** monitor.py reports standardized mean shifts for each feature.

**Remember:** This implementation checks mean shifts only; it is not a statistical significance test or a complete drift monitor.

## Elasticsearch
**Category:** RAG and Q&A · **Scope:** Related learning concept

A search engine that supports full-text and vector-search capabilities.

**Example:** The architecture map places it in the search-engine-with-vectors category.

**Remember:** A category can overlap with other deployment or storage classifications.

[Read the learning guide](https://pratikkumar-data-ai-portfolio.woollydog11.chatgpt.site/learn/rag.html?level=intermediate#vector-databases)

## Embedding
**Category:** RAG and Q&A · **Scope:** Local version

A numeric representation of text used to compare semantic relationships.

**Example:** MiniLM produces normalized dense 384-dimensional vectors for chunks and questions.

**Remember:** The embedding model retrieves evidence; Qwen performs answer generation in the local app.

## Entering and exiting IDs
**Category:** Branch analytics · **Scope:** Implemented concept

Entering IDs appear only in the latest period; exiting IDs appear only in the prior period.

**Example:** The sample has 9 entering and 8 exiting IDs. Together with 162 matched IDs, they explain the two annual counts.

**Remember:** Presence changes in an export are not automatically proven real branch openings or closures.

## Euclidean distance
**Category:** RAG and Q&A · **Scope:** Related learning concept

The straight-line distance between points in a vector space.

**Example:** A vector-search configuration can rank smaller distances as closer matches.

**Remember:** Distance values are not answer-confidence probabilities.

[Read the learning guide](https://pratikkumar-data-ai-portfolio.woollydog11.chatgpt.site/learn/rag.html?level=intermediate#vector-databases)

## Exception queue
**Category:** Data quality · **Scope:** Implemented concept

A list of failed checks with enough evidence to support investigation.

**Example:** Filter by bureau, column, rule, dimension, weight, or observed value; inspect the full source row.

**Remember:** The queue is a review report, not an implemented ticketing or remediation workflow.

## Extractive answer
**Category:** RAG and Q&A · **Scope:** Browser version

An answer selected directly from existing source text rather than newly written by a language model.

**Example:** The live browser demo returns “The Data Owner approves or rejects the request.” with its source.

**Remember:** It can select an incomplete or irrelevant sentence; exact source presence alone is not full answer correctness.

## F1 score
**Category:** Anomaly detection · **Scope:** Implemented concept

The harmonic mean of precision and recall, giving one summary of their balance.

**Formula / settings:** 2 × precision × recall / (precision + recall)

**Example:** With precision 0.64 and recall 0.6667, model F1 is approximately 0.6531.

**Remember:** F1 does not account for true negatives or unequal business costs. The code returns 0 for undefined precision/recall through zero_division=0.

## FAISS
**Category:** RAG and Q&A · **Scope:** Related learning concept

A library for efficient similarity search and clustering of dense vectors.

**Example:** FAISS can supply indexing and search building blocks in an application.

**Remember:** A search library alone is not a complete database service with all operational controls.

[Read the learning guide](https://pratikkumar-data-ai-portfolio.woollydog11.chatgpt.site/learn/rag.html?level=intermediate#vector-databases)

## False negative (FN)
**Category:** Anomaly detection · **Scope:** Implemented concept

An anomaly that the detector incorrectly leaves unflagged.

**Example:** 16 injected test anomalies are missed by the model.

**Remember:** A high precision value alone does not rule out many false negatives.

## False positive (FP)
**Category:** Anomaly detection · **Scope:** Implemented concept

A normal record incorrectly flagged as an anomaly.

**Example:** 18 normal test records are flagged by the model.

**Remember:** False positives create review work, but their business cost depends on the application.

## False positive rate
**Category:** Anomaly detection · **Scope:** Implemented concept

The proportion of actual normal records incorrectly flagged.

**Formula / settings:** FP / (FP + TN)

**Example:** For the test model, 18 / (18 + 534) is about 3.26%.

**Remember:** This denominator differs from 1 − precision. A 2% calibration target does not guarantee a 2% rate on new data.

## Feature
**Category:** Anomaly detection · **Scope:** Implemented concept

An input variable used by a model to describe each observation.

**Example:** The model uses daily_volume, error_rate, latency_ms, and missing_rate.

**Remember:** The injected_anomaly label is excluded from the feature matrix.

## Fixed-character chunking
**Category:** RAG and Q&A · **Scope:** Related learning concept

Split text into windows measured in characters.

**Example:** The local project uses 600-character windows and 100-character overlap.

**Remember:** Character windows can cut across words or sentences.

[Read the learning guide](https://pratikkumar-data-ai-portfolio.woollydog11.chatgpt.site/learn/rag.html?level=intermediate#chunking)

## Fixed-token chunking
**Category:** RAG and Q&A · **Scope:** Related learning concept

Split text using a selected tokenizer and a token budget.

**Example:** An application might cap each source passage at a chosen number of model tokens.

**Remember:** Tokens are not words; use the tokenizer appropriate to the model.

[Read the learning guide](https://pratikkumar-data-ai-portfolio.woollydog11.chatgpt.site/learn/rag.html?level=intermediate#chunking)

## Heading-aware chunking
**Category:** RAG and Q&A · **Scope:** Related learning concept

Use headings or section boundaries to organize chunks.

**Example:** Keep an access-policy heading with its relevant section.

**Remember:** Very long sections may need additional splitting.

[Read the learning guide](https://pratikkumar-data-ai-portfolio.woollydog11.chatgpt.site/learn/rag.html?level=intermediate#chunking)

## Held-out test set
**Category:** Anomaly detection · **Scope:** Implemented concept

Data reserved to evaluate behavior after the model and cutoff have been selected.

**Example:** 600 records generated with seed 33 include 48 injected anomalies, or 8%.

**Remember:** The test labels are used to calculate metrics, not to fit the model or choose its cutoff.

## Herfindahl–Hirschman Index (HHI)
**Category:** Branch analytics · **Scope:** Implemented concept

A concentration measure computed by summing squared percentage shares.

**Formula / settings:** HHI = sum of squared bank deposit shares within a state

**Example:** A state with one included bank holding all deposits has HHI 10,000.

**Remember:** The project describes its included sample; HHI alone does not establish market definition or a regulatory conclusion.

## HNSW
**Category:** RAG and Q&A · **Scope:** Local version

A graph-based index approach used for approximate nearest-neighbor search.

**Example:** Chroma’s single-node vector search uses HNSW; the application specifies cosine as its metric.

**Remember:** HNSW is the indexing/search approach; cosine is the metric. The project does not tune HNSW or prove exact-neighbor recall.

## Hybrid retrieval
**Category:** RAG and Q&A · **Scope:** Related learning concept

Combine candidate evidence from different retrieval methods, commonly lexical and semantic.

**Example:** The teaching workbench combines two rankings with reciprocal rank fusion.

**Remember:** Hybrid retrieval is a search strategy, not necessarily an agentic architecture.

[Read the learning guide](https://pratikkumar-data-ai-portfolio.woollydog11.chatgpt.site/learn/rag.html?level=intermediate#retrieval)

## Hybrid review flag
**Category:** Anomaly detection · **Scope:** Implemented concept

A combined flag that requests review if either the model or an explicit rule flags the record.

**Formula / settings:** review_flag = model_flag OR rule_flag

**Example:** Hybrid recall is 100% on this synthetic test, but precision is about 72.73%.

**Remember:** The simple rules outperform the model on deliberately obvious injected cases; do not generalize that result to real data.

## Hypothetical document embeddings (HyDE)
**Category:** RAG and Q&A · **Scope:** Related learning concept

Use a generated hypothetical answer or document as a representation for retrieval.

**Example:** A model drafts a search aid, then the retriever looks for actual supporting sources.

**Remember:** The hypothetical text is not factual evidence and must not be treated as a source.

[Read the learning guide](https://pratikkumar-data-ai-portfolio.woollydog11.chatgpt.site/learn/rag.html?level=intermediate#retrieval)

## Indexing
**Category:** RAG and Q&A · **Scope:** Local version

Preparing data structures that make later retrieval possible or efficient.

**Example:** The local pipeline chunks and embeds documents, then stores them in a Chroma collection.

**Remember:** Indexing does not fine-tune Qwen. Rebuilding this index replaces the collection.

## Inverted file index (IVF)
**Category:** RAG and Q&A · **Scope:** Related learning concept

Organize vectors into partitions so a search can inspect a subset of the collection.

**Example:** The map shows IVF as an indexing approach rather than a database product.

**Remember:** Partition and search settings affect speed and approximate-search recall.

[Read the learning guide](https://pratikkumar-data-ai-portfolio.woollydog11.chatgpt.site/learn/rag.html?level=intermediate#vector-databases)

## Isolation Forest
**Category:** Anomaly detection · **Scope:** Implemented concept

An unsupervised method that uses random partitioning to isolate unusual observations.

**Example:** The project fits 200 trees on 1,200 synthetic normal training rows.

**Remember:** The model is compared with explicit rules; model complexity is not assumed to improve results.

## Lexical retrieval
**Category:** RAG and Q&A · **Scope:** Related learning concept

Find and rank material using terms and their statistical relationships.

**Example:** BM25 can help find a specific policy identifier that must match exactly.

**Remember:** Lexical ranking can miss a paraphrase with very different wording.

[Read the learning guide](https://pratikkumar-data-ai-portfolio.woollydog11.chatgpt.site/learn/rag.html?level=intermediate#retrieval)

## Matched-branch growth
**Category:** Branch analytics · **Scope:** Implemented concept

The percentage change in combined deposits for branch IDs present in both comparison periods.

**Formula / settings:** 100 × (latest matched deposits − prior matched deposits) / prior matched deposits

**Example:** 100 × (23,182,213.20 − 21,756,069.00) / 21,756,069.00 = 6.5551557%, rounded to 6.56%. Values are in $000.

**Remember:** This is not the simple average of individual branch growth percentages. A zero prior total produces no percentage.

## Maximum marginal relevance (MMR)
**Category:** RAG and Q&A · **Scope:** Related learning concept

Select results by balancing query relevance with reduced similarity to already selected evidence.

**Example:** A context builder can avoid returning several almost-identical passages.

**Remember:** Diversity does not prove factual correctness.

[Read the learning guide](https://pratikkumar-data-ai-portfolio.woollydog11.chatgpt.site/learn/rag.html?level=intermediate#ranking)

## MCP client
**Category:** MCP concepts · **Scope:** Related learning concept

A protocol participant managed by a host to communicate with a particular server.

**Example:** A client sends the selected request and receives the server result.

**Remember:** A client connection does not replace server-side authorization.

[Read the learning guide](https://pratikkumar-data-ai-portfolio.woollydog11.chatgpt.site/learn/mcp.html?level=beginner#architecture)

## MCP host
**Category:** MCP concepts · **Scope:** Related learning concept

The AI application coordinating model use, user experience and application policy.

**Example:** The host can manage several clients that connect to different servers.

**Remember:** The host is not the same component as the external tool server.

[Read the learning guide](https://pratikkumar-data-ai-portfolio.woollydog11.chatgpt.site/learn/mcp.html?level=beginner#architecture)

## MCP prompt
**Category:** MCP concepts · **Scope:** Related learning concept

A reusable instruction template exposed for a supported task.

**Example:** The simulator returns a template for explaining a quality report.

**Remember:** A prompt template is not model training and does not grant tool permissions.

[Read the learning guide](https://pratikkumar-data-ai-portfolio.woollydog11.chatgpt.site/learn/mcp.html?level=beginner#building-blocks)

## MCP resource
**Category:** MCP concepts · **Scope:** Related learning concept

Addressable information exposed through MCP for use as context.

**Example:** The simulator reads a fictional policy resource URI.

**Remember:** A resource URI is not necessarily a normal web URL.

[Read the learning guide](https://pratikkumar-data-ai-portfolio.woollydog11.chatgpt.site/learn/mcp.html?level=beginner#building-blocks)

## MCP server
**Category:** MCP concepts · **Scope:** Related learning concept

A program exposing capabilities through MCP interfaces.

**Example:** The fictional server validates a dataset ID and returns a summary.

**Remember:** A server can be a local process; it need not be a remote cloud machine.

[Read the learning guide](https://pratikkumar-data-ai-portfolio.woollydog11.chatgpt.site/learn/mcp.html?level=beginner#architecture)

## MCP tool
**Category:** MCP concepts · **Scope:** Related learning concept

A callable operation with described inputs exposed by an MCP server.

**Example:** get_quality_summary accepts a fictional dataset identifier.

**Remember:** A valid argument schema does not prove that the caller may access the dataset.

[Read the learning guide](https://pratikkumar-data-ai-portfolio.woollydog11.chatgpt.site/learn/mcp.html?level=beginner#building-blocks)

## Median absolute deviation (MAD)
**Category:** Anomaly detection · **Scope:** Implemented concept

The median of absolute distances from the median, used as a robust spread estimate.

**Formula / settings:** median(|x − median(x)|)

**Example:** Training-set MAD scales feature deviations; zero MAD is replaced by a tiny value to avoid division by zero.

**Remember:** A very small scale can produce very large z scores.

## Metadata filtering
**Category:** RAG and Q&A · **Scope:** Related learning concept

Restrict eligible records using fields stored alongside content.

**Example:** Select only the permitted access group and effective policy version.

**Remember:** A label is not enforcement unless application and storage queries actually apply it.

[Read the learning guide](https://pratikkumar-data-ai-portfolio.woollydog11.chatgpt.site/learn/rag.html?level=intermediate#documents)

## Milvus
**Category:** RAG and Q&A · **Scope:** Related learning concept

A vector database used to store and search vector representations.

**Example:** Milvus appears in the map as another dedicated vector-database example.

**Remember:** Choose a system based on measured workload and operating needs, not name recognition.

[Read the learning guide](https://pratikkumar-data-ai-portfolio.woollydog11.chatgpt.site/learn/rag.html?level=intermediate#vector-databases)

## Model Context Protocol (MCP)
**Category:** MCP concepts · **Scope:** Related learning concept

An open protocol for exchanging context and capabilities between an AI application and external programs.

**Example:** A server can expose a fictional quality-summary operation to a supporting host.

**Remember:** MCP is not a language model, a database, or automatic permission to access systems.

[Read the learning guide](https://pratikkumar-data-ai-portfolio.woollydog11.chatgpt.site/learn/mcp.html?level=beginner#what-is-mcp)

## Multi-query retrieval
**Category:** RAG and Q&A · **Scope:** Related learning concept

Search using several versions of a question and combine their evidence.

**Example:** An application may search both the original wording and a paraphrase.

**Remember:** Additional searches can add latency, duplicates and irrelevant candidates.

[Read the learning guide](https://pratikkumar-data-ai-portfolio.woollydog11.chatgpt.site/learn/rag.html?level=intermediate#retrieval)

## Multi-vector representation
**Category:** RAG and Q&A · **Scope:** Related learning concept

Represent an item using several vectors instead of one vector.

**Example:** Different token-level representations can support more detailed matching.

**Remember:** Multi-vector matching has different indexing and resource costs.

[Read the learning guide](https://pratikkumar-data-ai-portfolio.woollydog11.chatgpt.site/learn/rag.html?level=intermediate#embeddings)

## Multimodal embedding
**Category:** RAG and Q&A · **Scope:** Related learning concept

A representation designed for supported combinations of text, image or other modalities.

**Example:** A suitable model may support searching an image collection using text.

**Remember:** The local text-only MiniLM project is not a multimodal system.

[Read the learning guide](https://pratikkumar-data-ai-portfolio.woollydog11.chatgpt.site/learn/rag.html?level=intermediate#embeddings)

## Net branch change
**Category:** Branch analytics · **Scope:** Implemented concept

The difference between latest-period and prior-period branch counts.

**Formula / settings:** Entering IDs − exiting IDs

**Example:** 9 − 8 = +1; the sample count goes from 170 to 171.

**Remember:** A small net change can hide substantial activity in both directions.

## Null versus zero
**Category:** Shared foundations · **Scope:** Implemented concept

A missing or undefined value is different from an observed numeric zero.

**Example:** An entering branch has no prior-period record; its prior deposit is displayed as a dash.

**Remember:** The deposit bridge treats absence as a zero contribution for reconciliation, while preserving missing-period evidence in the ledger.

## Observed versus expected value
**Category:** Data quality · **Scope:** Implemented concept

The value a rule actually evaluated compared with the condition the policy required.

**Example:** Observed email: invalid-email. Expected: nonblank email syntax with no whitespace and a dotted domain.

**Remember:** The displayed observed value is normalized. The report does not preserve original pre-normalization bytes.

## Ollama
**Category:** RAG and Q&A · **Scope:** Local version

A local runtime for serving downloaded language models.

**Example:** The Python app calls qwen2.5:1.5b at 127.0.0.1:11434/api/chat.

**Remember:** The local application needs its host and model running; the public extractive demo does not.

## Optical character recognition (OCR)
**Category:** RAG and Q&A · **Scope:** Related learning concept

Convert text pictured in an image into machine-readable text.

**Example:** A scanned PDF may need OCR before chunking.

**Remember:** Recognition errors can change names, numbers and retrieval behavior.

[Read the learning guide](https://pratikkumar-data-ai-portfolio.woollydog11.chatgpt.site/learn/rag.html?level=intermediate#documents)

## Outer join
**Category:** Branch analytics · **Scope:** Implemented concept

A join that preserves keys from either input, including those without a match.

**Example:** The period comparison outer-joins branch_id and classifies both-side, prior-only, and latest-only records.

**Remember:** A missing period value is absence of a record, not an observed deposit of zero.

## Parent-child chunking
**Category:** RAG and Q&A · **Scope:** Related learning concept

Search smaller child pieces while preserving links to larger parent context.

**Example:** Find a precise approval sentence, then return its surrounding policy section.

**Remember:** Returning a large parent consumes more context space.

[Read the learning guide](https://pratikkumar-data-ai-portfolio.woollydog11.chatgpt.site/learn/rag.html?level=intermediate#chunking)

## pgvector
**Category:** RAG and Q&A · **Scope:** Related learning concept

An extension that adds vector similarity search to PostgreSQL.

**Example:** A design can keep relational data and vector retrieval in a PostgreSQL environment.

**Remember:** pgvector is an extension, not a separate database brand replacing PostgreSQL.

[Read the learning guide](https://pratikkumar-data-ai-portfolio.woollydog11.chatgpt.site/learn/rag.html?level=intermediate#vector-databases)

## Pinecone
**Category:** RAG and Q&A · **Scope:** Related learning concept

A managed vector-search service.

**Example:** The map uses Pinecone as an example of provider-operated vector infrastructure.

**Remember:** Its presence in the diagram is not a free-tier promise or a recommendation to buy it.

[Read the learning guide](https://pratikkumar-data-ai-portfolio.woollydog11.chatgpt.site/learn/rag.html?level=intermediate#vector-databases)

## Precision
**Category:** Anomaly detection · **Scope:** Implemented concept

Of all records flagged as anomalies, the proportion that are truly labeled anomalies.

**Formula / settings:** TP / (TP + FP)

**Example:** The model flags 50 test records: 32 are injected anomalies and 18 are normal. Precision = 32 / 50 = 64%.

**Remember:** High precision means fewer false alarms among flagged records; it does not tell you how many anomalies were missed.

## Precision at k
**Category:** RAG and Q&A · **Scope:** Related concept; not measured

The fraction of the top k retrieval results that are relevant.

**Formula / settings:** Relevant results among top k / k

**Example:** Two relevant passages among three retrieved candidates would give precision@3 = 2/3.

**Remember:** The current RAG evaluator does not calculate this metric. Anomaly precision uses a different set of labels and denominator.

## Product quantization (PQ)
**Category:** RAG and Q&A · **Scope:** Related learning concept

Compress vector representations using a codebook-based approximation.

**Example:** A large collection may use compressed representations to reduce memory.

**Remember:** Compression can change retrieval quality; it is not a similarity metric.

[Read the learning guide](https://pratikkumar-data-ai-portfolio.woollydog11.chatgpt.site/learn/rag.html?level=intermediate#vector-databases)

## Prompt augmentation
**Category:** RAG and Q&A · **Scope:** Local version

Adding retrieved evidence to the question before requesting a language-model answer.

**Example:** The local prompt includes numbered passages with source filename and page labels.

**Remember:** Prompt instructions do not guarantee the model follows them or that every generated claim is supported.

## Qdrant
**Category:** RAG and Q&A · **Scope:** Related learning concept

A vector database offering vector search and related filtering and hybrid-query capabilities.

**Example:** The architecture map lists Qdrant as a dedicated vector-store example.

**Remember:** It is an alternative shown for learning, not the store used by the local project.

[Read the learning guide](https://pratikkumar-data-ai-portfolio.woollydog11.chatgpt.site/learn/rag.html?level=intermediate#vector-databases)

## Query rewriting
**Category:** RAG and Q&A · **Scope:** Related learning concept

Rephrase a question into a form intended to improve retrieval.

**Example:** Resolve what “it” refers to before searching a conversational follow-up.

**Remember:** A rewrite can accidentally change intent and needs evaluation.

[Read the learning guide](https://pratikkumar-data-ai-portfolio.woollydog11.chatgpt.site/learn/rag.html?level=intermediate#retrieval)

## Recall
**Category:** Anomaly detection · **Scope:** Implemented concept

Of all truly labeled anomalies, the proportion the detector successfully flags.

**Formula / settings:** TP / (TP + FN)

**Example:** There are 48 injected anomalies. The model catches 32 and misses 16. Recall = 32 / 48 = 66.67%.

**Remember:** High recall means fewer missed anomalies; it can come with more false alarms. Also called sensitivity or true positive rate.

## Recall at k
**Category:** RAG and Q&A · **Scope:** Related concept; not measured

The fraction of all known relevant retrieval items found among the top k results.

**Formula / settings:** Relevant items retrieved in top k / total relevant items

**Example:** A dataset with multiple relevant passages would need passage-level relevance labels to calculate passage recall.

**Remember:** The current RAG evaluator reports expected-source hit rate, not a complete passage-level recall@k metric.

## Reciprocal rank fusion (RRF)
**Category:** RAG and Q&A · **Scope:** Related learning concept

Combine ranked lists using rank positions rather than adding incomparable raw scores.

**Example:** The workbench uses a sum of 1/(60 + rank) for each participating ranked list.

**Remember:** The fusion constant and weights are design choices; this is not an accuracy guarantee.

[Read the learning guide](https://pratikkumar-data-ai-portfolio.woollydog11.chatgpt.site/learn/rag.html?level=intermediate#ranking)

## Recursive chunking
**Category:** RAG and Q&A · **Scope:** Related learning concept

Try larger text boundaries first, then smaller boundaries for oversized pieces.

**Example:** Keep a paragraph together when it fits; split it further when it exceeds the limit.

**Remember:** Recursive splitting does not guarantee a semantic topic boundary.

[Read the learning guide](https://pratikkumar-data-ai-portfolio.woollydog11.chatgpt.site/learn/rag.html?level=intermediate#chunking)

## Reproducibility
**Category:** Shared foundations · **Scope:** Implemented concept

Making an analysis repeatable from its input, code, settings, and environment.

**Example:** The repositories include input samples, scripts, dependency versions, outputs, and automated checks.

**Remember:** A published batch report does not automatically refresh when its local input changes.

## Reranking
**Category:** RAG and Q&A · **Scope:** Related learning concept

Reorder an initial candidate set with a second relevance calculation.

**Example:** A model can score the question together with each retrieved candidate before context assembly.

**Remember:** A reranker cannot recover evidence absent from its candidate set.

[Read the learning guide](https://pratikkumar-data-ai-portfolio.woollydog11.chatgpt.site/learn/rag.html?level=intermediate#ranking)

## Retrieval-augmented generation (RAG)
**Category:** RAG and Q&A · **Scope:** Local version

Retrieving relevant external evidence and supplying it to a language model to help answer a question.

**Formula / settings:** Retrieve evidence → augment prompt → generate answer

**Example:** The local Python app retrieves from Chroma and sends labeled evidence to Qwen through Ollama.

**Remember:** The public browser Q&A is extractive and has no LLM generation.

## Robust z score
**Category:** Anomaly detection · **Scope:** Implemented concept

A measure of distance from a reference median using median absolute deviation as its scale.

**Formula / settings:** |value − training median| / (1.4826 × training MAD)

**Example:** The dashboard names the feature with the largest absolute robust z score for each flagged row.

**Remember:** This is a descriptive deviation diagnostic, not SHAP, causal reasoning, or a model-specific attribution.

## Rule check
**Category:** Data quality · **Scope:** Implemented concept

One execution of one rule against one record.

**Formula / settings:** Total checks = rows × applicable rules

**Example:** 250 rows × 7 rules = 1,750 checks; 67 fail and 1,683 pass.

**Remember:** One record can contribute more than one failed check.

## Semantic chunking
**Category:** RAG and Q&A · **Scope:** Related learning concept

Use changes in meaning to decide where a text chunk should end.

**Example:** A splitter may separate approval instructions from a later retention discussion.

**Remember:** The local project does not implement semantic splitting; it adds computation and tuning.

[Read the learning guide](https://pratikkumar-data-ai-portfolio.woollydog11.chatgpt.site/learn/rag.html?level=intermediate#chunking)

## Sentence chunking
**Category:** RAG and Q&A · **Scope:** Related learning concept

Group complete sentences into retrievable pieces.

**Example:** The workbench can preserve each complete sentence rather than cut by word count.

**Remember:** A sentence can depend on an earlier sentence.

[Read the learning guide](https://pratikkumar-data-ai-portfolio.woollydog11.chatgpt.site/learn/rag.html?level=intermediate#chunking)

## Similarity threshold
**Category:** RAG and Q&A · **Scope:** Local version

A minimum similarity required for a retrieved candidate to be retained.

**Formula / settings:** Local default: cosine similarity ≥ 0.25

**Example:** Candidates scoring 0.70, 0.31, and 0.18 leave two retained passages at threshold 0.25.

**Remember:** The default is provisional and needs relevant/irrelevant questions for calibration.

## Source citation
**Category:** RAG and Q&A · **Scope:** Implemented concept

A reference identifying evidence used to support an answer.

**Example:** Local passages carry filename/page labels; the browser links its selected sentence to its document.

**Remember:** Citations support inspection but do not automatically verify every claim.

## Source hit rate at k
**Category:** RAG and Q&A · **Scope:** Implemented concept

The fraction of answerable evaluation questions for which the expected source appears in retained retrieval results.

**Formula / settings:** Questions retrieving expected source / answerable questions

**Example:** The small repository baseline reports 6/6 expected-document hits.

**Remember:** This is not generated-answer accuracy or proof that the exact necessary passage was retrieved.

## Sparse representation
**Category:** RAG and Q&A · **Scope:** Related learning concept

A representation with relatively few nonzero values in a large feature space.

**Example:** Term-weighted or learned sparse representations can support lexical-style retrieval.

**Remember:** A sparse representation is not the same thing as a dense neural embedding.

[Read the learning guide](https://pratikkumar-data-ai-portfolio.woollydog11.chatgpt.site/learn/rag.html?level=intermediate#embeddings)

## Structure-aware chunking
**Category:** RAG and Q&A · **Scope:** Related learning concept

Respect the structure of content such as tables, code, lists or document layout.

**Example:** Keep table headers with the values they explain.

**Remember:** A suitable parser is needed; plain text alone may lose layout.

[Read the learning guide](https://pratikkumar-data-ai-portfolio.woollydog11.chatgpt.site/learn/rag.html?level=intermediate#chunking)

## Synthetic data
**Category:** Shared foundations · **Scope:** Implemented concept

Artificially created data used to demonstrate or test a method without using real operational records.

**Example:** The banking and branch projects use generated records; the anomaly benchmark injects known synthetic anomalies.

**Remember:** Synthetic results demonstrate behavior under their generator’s assumptions, not real-world effectiveness.

## Temperature
**Category:** RAG and Q&A · **Scope:** Local version

A generation setting that influences variation in token selection.

**Example:** The local application requests temperature 0.

**Remember:** Low temperature does not guarantee truthfulness or perfectly reproducible output.

## Timeliness
**Category:** Data quality · **Scope:** Implemented concept

Whether data is available or verified within the required time window.

**Example:** DQ006 requires a parseable verification date from 0 to 90 days before the displayed as-of date.

**Remember:** Future dates and unparseable dates fail this project’s recency rule.

## Token
**Category:** RAG and Q&A · **Scope:** Implemented concept

A model-specific text unit that may be a word, a word fragment, or punctuation.

**Example:** MiniLM and Qwen tokenize internally, while the Python chunker counts characters.

**Remember:** 600 characters does not mean 600 tokens. Word-to-token ratios vary.

## Top-k retrieval
**Category:** RAG and Q&A · **Scope:** Local version

Requesting at most k highest-ranked candidate retrieval results.

**Example:** The local app requests up to 3 chunks, then filters candidates by the minimum similarity.

**Remember:** Filtering can leave fewer than k passages; the application does not refill rejected slots.

## Total deposit growth
**Category:** Branch analytics · **Scope:** Implemented concept

The percentage change in all included deposits across the two periods, including changes in branch coverage.

**Formula / settings:** 100 × (latest total − prior total) / prior total

**Example:** The synthetic network grows from 22,652,665.00 to 24,514,624.98 ($000), or about 8.22%.

**Remember:** It has a different denominator and purpose from the 6.56% matched-cohort result.

## Training set
**Category:** Anomaly detection · **Scope:** Implemented concept

The observations used to fit model parameters.

**Example:** 1,200 synthetic normal records, generated with seed 11, fit the Isolation Forest.

**Remember:** Using a record for training and evaluating it as unseen test data would weaken the evaluation.

## True negative (TN)
**Category:** Anomaly detection · **Scope:** Implemented concept

A normal record correctly left unflagged.

**Example:** 534 normal test records are correctly left unflagged.

**Remember:** Large numbers of normal records can make accuracy look high even when recall is weak.

## True positive (TP)
**Category:** Anomaly detection · **Scope:** Implemented concept

A record correctly flagged as an anomaly.

**Example:** 32 injected anomalies are correctly flagged in the model test results.

**Remember:** “Positive” means anomaly in this benchmark; always state which class is positive.

## Uniqueness
**Category:** Data quality · **Scope:** Implemented concept

Whether an identifier satisfies the required no-duplicate condition within the relevant scope.

**Example:** DQ005 flags both rows sharing a duplicated institution ID; two rows fail.

**Remember:** Define the scope. Branch IDs across different years are expected to repeat in the branch project.

## Validity
**Category:** Data quality · **Scope:** Implemented concept

Whether values conform to permitted formats, types, or allowed sets.

**Example:** Rules check email syntax, supported state codes, license statuses, and nonblank identifiers.

**Remember:** A syntactically valid email is not necessarily deliverable; a valid state code is not a verified address.

## Vector database
**Category:** RAG and Q&A · **Scope:** Local version

A store that supports searching numeric vectors, often alongside their text and metadata.

**Example:** Chroma PersistentClient stores chunk vectors, text, filenames, page numbers, and chunk positions locally.

**Remember:** The browser demo has no vector database.

## Vector normalization
**Category:** RAG and Q&A · **Scope:** Related learning concept

Scale a vector according to a chosen rule, often to unit length.

**Example:** The local project normalizes MiniLM embeddings before cosine-based retrieval.

**Remember:** Normalization changes score interpretation; use the convention expected by the model and store.

[Read the learning guide](https://pratikkumar-data-ai-portfolio.woollydog11.chatgpt.site/learn/rag.html?level=intermediate#embeddings)

## Weaviate
**Category:** RAG and Q&A · **Scope:** Related learning concept

A database built around vector search and related data-management capabilities.

**Example:** The map includes Weaviate among dedicated vector databases.

**Remember:** Product capabilities depend on version and deployment; it is not implemented in this project.

[Read the learning guide](https://pratikkumar-data-ai-portfolio.woollydog11.chatgpt.site/learn/rag.html?level=intermediate#vector-databases)

## Weighted average
**Category:** Branch analytics · **Scope:** Implemented concept

An average in which each observation contributes according to a specified weight.

**Formula / settings:** Sum(weight × value) / sum(weights)

**Example:** With positive prior deposits, aggregate matched growth is a prior-deposit-weighted average of individual growth rates.

**Remember:** A large branch contributes more to the aggregate deposit change than a small branch with the same percentage rate.

## Weighted quality score
**Category:** Data quality · **Scope:** Implemented concept

A policy-weighted summary that penalizes a record for the relative weight of its failed rules.

**Formula / settings:** 100 × (1 − failed rule weights / total rule weights)

**Example:** The seven rule weights sum to 19. The dashboard averages rounded record scores to 96.86/100.

**Remember:** Weights are illustrative policy choices, not calibrated risk probabilities.
