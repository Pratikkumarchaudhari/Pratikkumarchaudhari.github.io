# Project Dictionary
Plain-language definitions, formulas, and examples from the four portfolio projects. Examples describe synthetic/fictional data. Related concepts are marked where they are not measured or implemented.
[Open the searchable dictionary](https://pratikkumar-data-ai-portfolio.woollydog11.chatgpt.site/dictionary.html)

## Abstention
**Project:** RAG and Q&A · **Scope:** Implemented concept

Declining to answer when the system lacks sufficient supporting evidence.

**Project example:** No retained passages means the local app returns an insufficient-evidence message without calling Ollama.

**Remember:** Weak but nonempty evidence can still produce an unsupported answer. The browser uses different lexical gates.

## Accuracy
**Project:** Anomaly detection · **Scope:** Related concept

The proportion of all labeled records classified correctly.

**Formula/settings:** `(TP + TN) / total records`

**Project example:** (32 + 534) / 600 is approximately 94.33%, despite recall of only 66.67%.

**Remember:** This derived illustration is not a headline metric currently saved by monitor.py. Accuracy can hide minority-class misses.

## Accuracy
**Project:** Data quality · **Scope:** Related concept; not measured

Whether a value reflects the correct real-world fact.

**Project example:** Confirming an address exists would require additional authoritative evidence.

**Remember:** The current dashboard does not measure real-world accuracy. Format and allowed-value checks are not a substitute.

## Affected record
**Project:** Data quality · **Scope:** Implemented concept

A distinct source row that fails at least one quality rule.

**Project example:** The sample has 67 failed checks affecting 62 source rows.

**Remember:** Count distinct source row numbers, because institution IDs may be duplicated.

## Anomaly
**Project:** Anomaly detection · **Scope:** Implemented concept

A record whose measured behavior differs from the reference pattern enough to warrant attention.

**Project example:** The synthetic generator injects unusually large volume, latency, error-rate, or missing-rate values.

**Remember:** An unusual record is not automatically wrong, fraudulent, or harmful.

## Anomaly score
**Project:** Anomaly detection · **Scope:** Implemented concept

A numeric ranking of how unusual a record appears under the detector.

**Formula/settings:** `Project score = −IsolationForest.score_samples(features)`

**Project example:** The project uses the negative score so larger values are more unusual.

**Remember:** Score direction depends on the API. This score is not a probability of fraud or error.

## As-of date
**Project:** Data quality · **Scope:** Implemented concept

The reference date against which a time-sensitive rule is evaluated.

**Project example:** The sample’s recency check uses 2026-09-30.

**Remember:** A batch’s evaluation date is different from today’s date or the time a visitor opens the report.

## Average precision
**Project:** Anomaly detection · **Scope:** Implemented concept

A ranking metric that averages precision values, weighted by increases in recall as the score threshold changes.

**Formula/settings:** `Sum of (recall increase × precision at that step)`

**Project example:** monitor.py calculates average_precision_score using the injected labels and continuous anomaly scores.

**Remember:** It is not simply precision at one threshold, and it is not identical to trapezoidal PR-curve area.

## Baseline
**Project:** Shared foundations · **Scope:** Implemented concept

A simple reference approach used to judge whether a more complex method adds value.

**Project example:** The anomaly model is compared with rules; semantic RAG retrieval is accompanied by a BM25 keyword baseline.

**Remember:** Different methods must be compared on consistent labels, inputs, and evaluation scope.

## BM25
**Project:** RAG and Q&A · **Scope:** Implemented concept

A lexical relevance score based on term frequency, term rarity, and text length.

**Formula/settings:** `Project parameters: k1 = 1.5; b = 0.75`

**Project example:** The Python baseline scores character chunks. The browser scores documents and sentences.

**Remember:** BM25 scores are not probabilities or cosine similarities. The browser also adds explicit aliases and role-question heuristics.

## Calibration set
**Project:** Anomaly detection · **Scope:** Implemented concept

A separate dataset used here to choose an operational score cutoff after fitting the model.

**Project example:** 400 normal records, generated with seed 22, set the 98th-percentile review cutoff.

**Remember:** Here calibration refers to threshold selection, not converting model scores into calibrated probabilities.

## Check pass rate
**Project:** Data quality · **Scope:** Implemented concept

The fraction of evaluated rule checks that pass.

**Formula/settings:** `100 × passed checks / evaluated checks`

**Project example:** 1,683 / 1,750 × 100 = 96.17%.

**Remember:** This is not the percentage of entirely clean records; 188 of 250 rows pass every rule.

## Chunk overlap
**Project:** RAG and Q&A · **Scope:** Local version

Text intentionally repeated between adjacent chunks to preserve some boundary context.

**Formula/settings:** `Step = chunk size − overlap = 600 − 100 = 500 characters`

**Project example:** The next window starts 500 characters after the prior start.

**Remember:** Overlap costs extra storage and can put repeated evidence in the retrieved results.

## Chunking
**Project:** RAG and Q&A · **Scope:** Local version

Splitting documents into smaller retrieval units.

**Formula/settings:** `Project defaults: 600 characters per window; 100-character overlap`

**Project example:** The local app uses fixed-size character windows. It is not recursive, semantic, or token-based chunking.

**Remember:** A window can cut across sentences; the chosen size is a baseline, not a proven optimum.

## Cohort analysis
**Project:** Branch analytics · **Scope:** Implemented concept

Comparing a group with a shared characteristic across time so changes within that group can be examined.

**Project example:** The matched cohort consists of the 162 branch IDs present in both 2024 and 2025.

**Remember:** A fixed cohort helps separate comparable deposit growth from changes in which branches are included.

## Column coverage
**Project:** Data quality · **Scope:** Implemented concept

Which source columns have explicit rules and how many checks apply to each.

**Project example:** There are 7 input columns, but only 6 have rules. institution_id has two rules; bureau has none.

**Remember:** “Not assessed” is different from a 100% pass rate.

## Column profiling
**Project:** Data quality · **Scope:** Implemented concept

Summarizing properties of a column to understand its contents and potential issues.

**Project example:** The dashboard shows missing values, distinct values, assigned rules, failed checks, and affected rows.

**Remember:** These profiles use normalized strings; the distinct count includes a blank when one exists.

## Completeness
**Project:** Data quality · **Scope:** Implemented concept

Whether required values are present.

**Project example:** DQ001 flags 15 blank institution names.

**Remember:** A nonblank name may still be incorrect or outdated.

## Composite key
**Project:** Branch analytics · **Scope:** Implemented concept

A record identifier made from more than one field.

**Formula/settings:** `Project key = (year, branch_id)`

**Project example:** SYN0001 can appear in both years; it cannot appear twice in the same year after validation.

**Remember:** Joining on a nonunique key can multiply rows and inflate deposit totals.

## Confusion matrix
**Project:** Anomaly detection · **Scope:** Implemented concept

A table comparing actual labels with predicted labels.

**Formula/settings:** `Rows = actual; columns = predicted; labels = [normal, anomaly]`

**Project example:** The model matrix is [[534, 18], [16, 32]]: TN, FP in the first row and FN, TP in the second.

**Remember:** Check axis and label order before interpreting a matrix.

## Consistency
**Project:** Data quality · **Scope:** Related concept; not measured

Whether related values agree across fields, records, or sources according to defined relationships.

**Project example:** Comparing an institution’s state across two authoritative systems could be a consistency check.

**Remember:** Cross-source consistency is not implemented in the current seven-rule dashboard.

## Context window
**Project:** RAG and Q&A · **Scope:** Local version

The token capacity available for a model’s working input/output context.

**Project example:** The local Ollama request sets num_ctx to 4096 and num_predict to 400.

**Remember:** The code does not budget exact tokenizer counts before sending the prompt.

## Cosine similarity
**Project:** RAG and Q&A · **Scope:** Local version

A comparison of vector direction, commonly used with text embeddings.

**Formula/settings:** `dot(a,b) / (norm(a) × norm(b))`

**Project example:** Chroma is configured for cosine distance; the app converts it with similarity = 1 − distance.

**Remember:** A similarity of 0.70 is not 70% answer confidence.

## Data grain
**Project:** Branch analytics · **Scope:** Implemented concept

The real-world unit represented by one row.

**Project example:** In branches.csv, one row is one branch ID in one observation year. There are 341 branch-year rows and 179 distinct branch IDs.

**Remember:** A count of rows is not automatically a count of distinct branches.

## Data leakage
**Project:** Anomaly detection · **Scope:** Related concept

Using information during training or selection that would not be available when making a new prediction.

**Project example:** The project excludes injected_anomaly from features and selects the cutoff without test labels.

**Remember:** Separate seeds do not by themselves prove every aspect of an evaluation is leakage-free.

## Data lineage
**Project:** Shared foundations · **Scope:** Implemented concept

The traceable path from a data source through transformations to an output.

**Project example:** A branch row leads to cohort totals and a growth metric; a RAG passage retains source/page metadata.

**Remember:** These are traceability mechanisms, not a deployed enterprise lineage catalog.

## Data validation
**Project:** Shared foundations · **Scope:** Implemented concept

Checking that an input satisfies specified requirements before or during analysis.

**Project example:** The branch pipeline rejects duplicate branch-year keys and negative deposits; the quality pipeline records rule exceptions.

**Remember:** The two projects handle failures differently: rejecting an input is not the same as reporting an exception.

## Data-quality rule
**Project:** Data quality · **Scope:** Implemented concept

An explicit condition used to evaluate whether a data value or record satisfies a stated policy.

**Project example:** DQ002 checks email syntax in Python/Pandas. Seven rules run on each of 250 sample rows.

**Remember:** A rule passing proves only its stated condition, not every aspect of business correctness.

## Decision threshold
**Project:** Anomaly detection · **Scope:** Implemented concept

A cutoff that converts a continuous score into a flag.

**Formula/settings:** `Flag when anomaly_score ≥ threshold`

**Project example:** The cutoff is the 98th percentile of scores from 400 normal calibration records.

**Remember:** The benchmark applies its own cutoff; it does not use the model’s default predict() classification.

## Deposit reconciliation bridge
**Project:** Branch analytics · **Scope:** Implemented concept

A breakdown that connects prior total deposits to latest total deposits through matched growth and footprint effects.

**Formula/settings:** `Latest total = prior total + matched change + entering deposits − exiting deposits`

**Project example:** 22,652,665.00 + 1,426,144.20 + 1,332,411.78 − 896,596.00 = 24,514,624.98 ($000).

**Remember:** The sample bridge residual is zero; each amount must use consistent units and period definitions.

## Deposit share
**Project:** Branch analytics · **Scope:** Implemented concept

A group’s deposits as a percentage of a clearly specified total.

**Formula/settings:** `100 × group deposits / included total deposits`

**Project example:** NY holds 21.93% of the included latest-year synthetic deposits.

**Remember:** This is a share of the sample, not of the entire US banking market. State-ledger filters do not change its denominator.

## Deposit units ($000)
**Project:** Branch analytics · **Scope:** Implemented concept

A convention in which each numeric unit represents one thousand dollars.

**Formula/settings:** `Dollars = reported value × 1,000`

**Project example:** 42,919.00 in the CSV means an illustrative $42,919,000.

**Remember:** Ratios are unchanged when numerator and denominator use the same units; totals must be labeled correctly.

## Document corpus
**Project:** RAG and Q&A · **Scope:** Implemented concept

The collection of source documents available to a retrieval system.

**Project example:** The default corpus contains three fictional procedures in sample_documents/.

**Remember:** The project does not automatically scan the laptop, and project documentation is not indexed by default.

## Drift diagnostic
**Project:** Anomaly detection · **Scope:** Implemented concept

A comparison of new feature distributions with the training reference.

**Formula/settings:** `Project diagnostic = |test mean − training mean| / training standard deviation`

**Project example:** monitor.py reports standardized mean shifts for each feature.

**Remember:** This implementation checks mean shifts only; it is not a statistical significance test or a complete drift monitor.

## Embedding
**Project:** RAG and Q&A · **Scope:** Local version

A numeric representation of text used to compare semantic relationships.

**Project example:** MiniLM produces normalized dense 384-dimensional vectors for chunks and questions.

**Remember:** The embedding model retrieves evidence; Qwen performs answer generation in the local app.

## Entering and exiting IDs
**Project:** Branch analytics · **Scope:** Implemented concept

Entering IDs appear only in the latest period; exiting IDs appear only in the prior period.

**Project example:** The sample has 9 entering and 8 exiting IDs. Together with 162 matched IDs, they explain the two annual counts.

**Remember:** Presence changes in an export are not automatically proven real branch openings or closures.

## Exception queue
**Project:** Data quality · **Scope:** Implemented concept

A list of failed checks with enough evidence to support investigation.

**Project example:** Filter by bureau, column, rule, dimension, weight, or observed value; inspect the full source row.

**Remember:** The queue is a review report, not an implemented ticketing or remediation workflow.

## Extractive answer
**Project:** RAG and Q&A · **Scope:** Browser version

An answer selected directly from existing source text rather than newly written by a language model.

**Project example:** The live browser demo returns “The Data Owner approves or rejects the request.” with its source.

**Remember:** It can select an incomplete or irrelevant sentence; exact source presence alone is not full answer correctness.

## F1 score
**Project:** Anomaly detection · **Scope:** Implemented concept

The harmonic mean of precision and recall, giving one summary of their balance.

**Formula/settings:** `2 × precision × recall / (precision + recall)`

**Project example:** With precision 0.64 and recall 0.6667, model F1 is approximately 0.6531.

**Remember:** F1 does not account for true negatives or unequal business costs. The code returns 0 for undefined precision/recall through zero_division=0.

## False negative (FN)
**Project:** Anomaly detection · **Scope:** Implemented concept

An anomaly that the detector incorrectly leaves unflagged.

**Project example:** 16 injected test anomalies are missed by the model.

**Remember:** A high precision value alone does not rule out many false negatives.

## False positive (FP)
**Project:** Anomaly detection · **Scope:** Implemented concept

A normal record incorrectly flagged as an anomaly.

**Project example:** 18 normal test records are flagged by the model.

**Remember:** False positives create review work, but their business cost depends on the application.

## False positive rate
**Project:** Anomaly detection · **Scope:** Implemented concept

The proportion of actual normal records incorrectly flagged.

**Formula/settings:** `FP / (FP + TN)`

**Project example:** For the test model, 18 / (18 + 534) is about 3.26%.

**Remember:** This denominator differs from 1 − precision. A 2% calibration target does not guarantee a 2% rate on new data.

## Feature
**Project:** Anomaly detection · **Scope:** Implemented concept

An input variable used by a model to describe each observation.

**Project example:** The model uses daily_volume, error_rate, latency_ms, and missing_rate.

**Remember:** The injected_anomaly label is excluded from the feature matrix.

## Held-out test set
**Project:** Anomaly detection · **Scope:** Implemented concept

Data reserved to evaluate behavior after the model and cutoff have been selected.

**Project example:** 600 records generated with seed 33 include 48 injected anomalies, or 8%.

**Remember:** The test labels are used to calculate metrics, not to fit the model or choose its cutoff.

## Herfindahl–Hirschman Index (HHI)
**Project:** Branch analytics · **Scope:** Implemented concept

A concentration measure computed by summing squared percentage shares.

**Formula/settings:** `HHI = sum of squared bank deposit shares within a state`

**Project example:** A state with one included bank holding all deposits has HHI 10,000.

**Remember:** The project describes its included sample; HHI alone does not establish market definition or a regulatory conclusion.

## HNSW
**Project:** RAG and Q&A · **Scope:** Local version

A graph-based index approach used for approximate nearest-neighbor search.

**Project example:** Chroma’s single-node vector search uses HNSW; the application specifies cosine as its metric.

**Remember:** HNSW is the indexing/search approach; cosine is the metric. The project does not tune HNSW or prove exact-neighbor recall.

## Hybrid review flag
**Project:** Anomaly detection · **Scope:** Implemented concept

A combined flag that requests review if either the model or an explicit rule flags the record.

**Formula/settings:** `review_flag = model_flag OR rule_flag`

**Project example:** Hybrid recall is 100% on this synthetic test, but precision is about 72.73%.

**Remember:** The simple rules outperform the model on deliberately obvious injected cases; do not generalize that result to real data.

## Indexing
**Project:** RAG and Q&A · **Scope:** Local version

Preparing data structures that make later retrieval possible or efficient.

**Project example:** The local pipeline chunks and embeds documents, then stores them in a Chroma collection.

**Remember:** Indexing does not fine-tune Qwen. Rebuilding this index replaces the collection.

## Isolation Forest
**Project:** Anomaly detection · **Scope:** Implemented concept

An unsupervised method that uses random partitioning to isolate unusual observations.

**Project example:** The project fits 200 trees on 1,200 synthetic normal training rows.

**Remember:** The model is compared with explicit rules; model complexity is not assumed to improve results.

## Matched-branch growth
**Project:** Branch analytics · **Scope:** Implemented concept

The percentage change in combined deposits for branch IDs present in both comparison periods.

**Formula/settings:** `100 × (latest matched deposits − prior matched deposits) / prior matched deposits`

**Project example:** 100 × (23,182,213.20 − 21,756,069.00) / 21,756,069.00 = 6.5551557%, rounded to 6.56%. Values are in $000.

**Remember:** This is not the simple average of individual branch growth percentages. A zero prior total produces no percentage.

## Median absolute deviation (MAD)
**Project:** Anomaly detection · **Scope:** Implemented concept

The median of absolute distances from the median, used as a robust spread estimate.

**Formula/settings:** `median(|x − median(x)|)`

**Project example:** Training-set MAD scales feature deviations; zero MAD is replaced by a tiny value to avoid division by zero.

**Remember:** A very small scale can produce very large z scores.

## Net branch change
**Project:** Branch analytics · **Scope:** Implemented concept

The difference between latest-period and prior-period branch counts.

**Formula/settings:** `Entering IDs − exiting IDs`

**Project example:** 9 − 8 = +1; the sample count goes from 170 to 171.

**Remember:** A small net change can hide substantial activity in both directions.

## Null versus zero
**Project:** Shared foundations · **Scope:** Implemented concept

A missing or undefined value is different from an observed numeric zero.

**Project example:** An entering branch has no prior-period record; its prior deposit is displayed as a dash.

**Remember:** The deposit bridge treats absence as a zero contribution for reconciliation, while preserving missing-period evidence in the ledger.

## Observed versus expected value
**Project:** Data quality · **Scope:** Implemented concept

The value a rule actually evaluated compared with the condition the policy required.

**Project example:** Observed email: invalid-email. Expected: nonblank email syntax with no whitespace and a dotted domain.

**Remember:** The displayed observed value is normalized. The report does not preserve original pre-normalization bytes.

## Ollama
**Project:** RAG and Q&A · **Scope:** Local version

A local runtime for serving downloaded language models.

**Project example:** The Python app calls qwen2.5:1.5b at 127.0.0.1:11434/api/chat.

**Remember:** The local application needs its host and model running; the public extractive demo does not.

## Outer join
**Project:** Branch analytics · **Scope:** Implemented concept

A join that preserves keys from either input, including those without a match.

**Project example:** The period comparison outer-joins branch_id and classifies both-side, prior-only, and latest-only records.

**Remember:** A missing period value is absence of a record, not an observed deposit of zero.

## Precision
**Project:** Anomaly detection · **Scope:** Implemented concept

Of all records flagged as anomalies, the proportion that are truly labeled anomalies.

**Formula/settings:** `TP / (TP + FP)`

**Project example:** The model flags 50 test records: 32 are injected anomalies and 18 are normal. Precision = 32 / 50 = 64%.

**Remember:** High precision means fewer false alarms among flagged records; it does not tell you how many anomalies were missed.

## Precision at k
**Project:** RAG and Q&A · **Scope:** Related concept; not measured

The fraction of the top k retrieval results that are relevant.

**Formula/settings:** `Relevant results among top k / k`

**Project example:** Two relevant passages among three retrieved candidates would give precision@3 = 2/3.

**Remember:** The current RAG evaluator does not calculate this metric. Anomaly precision uses a different set of labels and denominator.

## Prompt augmentation
**Project:** RAG and Q&A · **Scope:** Local version

Adding retrieved evidence to the question before requesting a language-model answer.

**Project example:** The local prompt includes numbered passages with source filename and page labels.

**Remember:** Prompt instructions do not guarantee the model follows them or that every generated claim is supported.

## Recall
**Project:** Anomaly detection · **Scope:** Implemented concept

Of all truly labeled anomalies, the proportion the detector successfully flags.

**Formula/settings:** `TP / (TP + FN)`

**Project example:** There are 48 injected anomalies. The model catches 32 and misses 16. Recall = 32 / 48 = 66.67%.

**Remember:** High recall means fewer missed anomalies; it can come with more false alarms. Also called sensitivity or true positive rate.

## Recall at k
**Project:** RAG and Q&A · **Scope:** Related concept; not measured

The fraction of all known relevant retrieval items found among the top k results.

**Formula/settings:** `Relevant items retrieved in top k / total relevant items`

**Project example:** A dataset with multiple relevant passages would need passage-level relevance labels to calculate passage recall.

**Remember:** The current RAG evaluator reports expected-source hit rate, not a complete passage-level recall@k metric.

## Reproducibility
**Project:** Shared foundations · **Scope:** Implemented concept

Making an analysis repeatable from its input, code, settings, and environment.

**Project example:** The repositories include input samples, scripts, dependency versions, outputs, and automated checks.

**Remember:** A published batch report does not automatically refresh when its local input changes.

## Retrieval-augmented generation (RAG)
**Project:** RAG and Q&A · **Scope:** Local version

Retrieving relevant external evidence and supplying it to a language model to help answer a question.

**Formula/settings:** `Retrieve evidence → augment prompt → generate answer`

**Project example:** The local Python app retrieves from Chroma and sends labeled evidence to Qwen through Ollama.

**Remember:** The public browser Q&A is extractive and has no LLM generation.

## Robust z score
**Project:** Anomaly detection · **Scope:** Implemented concept

A measure of distance from a reference median using median absolute deviation as its scale.

**Formula/settings:** `|value − training median| / (1.4826 × training MAD)`

**Project example:** The dashboard names the feature with the largest absolute robust z score for each flagged row.

**Remember:** This is a descriptive deviation diagnostic, not SHAP, causal reasoning, or a model-specific attribution.

## Rule check
**Project:** Data quality · **Scope:** Implemented concept

One execution of one rule against one record.

**Formula/settings:** `Total checks = rows × applicable rules`

**Project example:** 250 rows × 7 rules = 1,750 checks; 67 fail and 1,683 pass.

**Remember:** One record can contribute more than one failed check.

## Similarity threshold
**Project:** RAG and Q&A · **Scope:** Local version

A minimum similarity required for a retrieved candidate to be retained.

**Formula/settings:** `Local default: cosine similarity ≥ 0.25`

**Project example:** Candidates scoring 0.70, 0.31, and 0.18 leave two retained passages at threshold 0.25.

**Remember:** The default is provisional and needs relevant/irrelevant questions for calibration.

## Source citation
**Project:** RAG and Q&A · **Scope:** Implemented concept

A reference identifying evidence used to support an answer.

**Project example:** Local passages carry filename/page labels; the browser links its selected sentence to its document.

**Remember:** Citations support inspection but do not automatically verify every claim.

## Source hit rate at k
**Project:** RAG and Q&A · **Scope:** Implemented concept

The fraction of answerable evaluation questions for which the expected source appears in retained retrieval results.

**Formula/settings:** `Questions retrieving expected source / answerable questions`

**Project example:** The small repository baseline reports 6/6 expected-document hits.

**Remember:** This is not generated-answer accuracy or proof that the exact necessary passage was retrieved.

## Synthetic data
**Project:** Shared foundations · **Scope:** Implemented concept

Artificially created data used to demonstrate or test a method without using real operational records.

**Project example:** The banking and branch projects use generated records; the anomaly benchmark injects known synthetic anomalies.

**Remember:** Synthetic results demonstrate behavior under their generator’s assumptions, not real-world effectiveness.

## Temperature
**Project:** RAG and Q&A · **Scope:** Local version

A generation setting that influences variation in token selection.

**Project example:** The local application requests temperature 0.

**Remember:** Low temperature does not guarantee truthfulness or perfectly reproducible output.

## Timeliness
**Project:** Data quality · **Scope:** Implemented concept

Whether data is available or verified within the required time window.

**Project example:** DQ006 requires a parseable verification date from 0 to 90 days before the displayed as-of date.

**Remember:** Future dates and unparseable dates fail this project’s recency rule.

## Token
**Project:** RAG and Q&A · **Scope:** Implemented concept

A model-specific text unit that may be a word, a word fragment, or punctuation.

**Project example:** MiniLM and Qwen tokenize internally, while the Python chunker counts characters.

**Remember:** 600 characters does not mean 600 tokens. Word-to-token ratios vary.

## Top-k retrieval
**Project:** RAG and Q&A · **Scope:** Local version

Requesting at most k highest-ranked candidate retrieval results.

**Project example:** The local app requests up to 3 chunks, then filters candidates by the minimum similarity.

**Remember:** Filtering can leave fewer than k passages; the application does not refill rejected slots.

## Total deposit growth
**Project:** Branch analytics · **Scope:** Implemented concept

The percentage change in all included deposits across the two periods, including changes in branch coverage.

**Formula/settings:** `100 × (latest total − prior total) / prior total`

**Project example:** The synthetic network grows from 22,652,665.00 to 24,514,624.98 ($000), or about 8.22%.

**Remember:** It has a different denominator and purpose from the 6.56% matched-cohort result.

## Training set
**Project:** Anomaly detection · **Scope:** Implemented concept

The observations used to fit model parameters.

**Project example:** 1,200 synthetic normal records, generated with seed 11, fit the Isolation Forest.

**Remember:** Using a record for training and evaluating it as unseen test data would weaken the evaluation.

## True negative (TN)
**Project:** Anomaly detection · **Scope:** Implemented concept

A normal record correctly left unflagged.

**Project example:** 534 normal test records are correctly left unflagged.

**Remember:** Large numbers of normal records can make accuracy look high even when recall is weak.

## True positive (TP)
**Project:** Anomaly detection · **Scope:** Implemented concept

A record correctly flagged as an anomaly.

**Project example:** 32 injected anomalies are correctly flagged in the model test results.

**Remember:** “Positive” means anomaly in this benchmark; always state which class is positive.

## Uniqueness
**Project:** Data quality · **Scope:** Implemented concept

Whether an identifier satisfies the required no-duplicate condition within the relevant scope.

**Project example:** DQ005 flags both rows sharing a duplicated institution ID; two rows fail.

**Remember:** Define the scope. Branch IDs across different years are expected to repeat in the branch project.

## Validity
**Project:** Data quality · **Scope:** Implemented concept

Whether values conform to permitted formats, types, or allowed sets.

**Project example:** Rules check email syntax, supported state codes, license statuses, and nonblank identifiers.

**Remember:** A syntactically valid email is not necessarily deliverable; a valid state code is not a verified address.

## Vector database
**Project:** RAG and Q&A · **Scope:** Local version

A store that supports searching numeric vectors, often alongside their text and metadata.

**Project example:** Chroma PersistentClient stores chunk vectors, text, filenames, page numbers, and chunk positions locally.

**Remember:** The browser demo has no vector database.

## Weighted average
**Project:** Branch analytics · **Scope:** Implemented concept

An average in which each observation contributes according to a specified weight.

**Formula/settings:** `Sum(weight × value) / sum(weights)`

**Project example:** With positive prior deposits, aggregate matched growth is a prior-deposit-weighted average of individual growth rates.

**Remember:** A large branch contributes more to the aggregate deposit change than a small branch with the same percentage rate.

## Weighted quality score
**Project:** Data quality · **Scope:** Implemented concept

A policy-weighted summary that penalizes a record for the relative weight of its failed rules.

**Formula/settings:** `100 × (1 − failed rule weights / total rule weights)`

**Project example:** The seven rule weights sum to 19. The dashboard averages rounded record scores to 96.86/100.

**Remember:** Weights are illustrative policy choices, not calibrated risk probabilities.
