const PROJECT_TERMS = [
  {
    "id": "abstention",
    "term": "Abstention",
    "category": "RAG and Q&A",
    "definition": "Declining to answer when the system lacks sufficient supporting evidence.",
    "formula": "",
    "example": "No retained passages means the local app returns an insufficient-evidence message without calling Ollama.",
    "note": "Weak but nonempty evidence can still produce an unsupported answer. The browser uses different lexical gates.",
    "scope": "Implemented concept"
  },
  {
    "id": "accuracy",
    "term": "Accuracy",
    "category": "Anomaly detection",
    "definition": "The proportion of all labeled records classified correctly.",
    "formula": "(TP + TN) / total records",
    "example": "(32 + 534) / 600 is approximately 94.33%, despite recall of only 66.67%.",
    "note": "This derived illustration is not a headline metric currently saved by monitor.py. Accuracy can hide minority-class misses.",
    "scope": "Related concept"
  },
  {
    "id": "accuracy-data-quality",
    "term": "Accuracy",
    "category": "Data quality",
    "definition": "Whether a value reflects the correct real-world fact.",
    "formula": "",
    "example": "Confirming an address exists would require additional authoritative evidence.",
    "note": "The current dashboard does not measure real-world accuracy. Format and allowed-value checks are not a substitute.",
    "scope": "Related concept; not measured"
  },
  {
    "id": "affected-record",
    "term": "Affected record",
    "category": "Data quality",
    "definition": "A distinct source row that fails at least one quality rule.",
    "formula": "",
    "example": "The sample has 67 failed checks affecting 62 source rows.",
    "note": "Count distinct source row numbers, because institution IDs may be duplicated.",
    "scope": "Implemented concept"
  },
  {
    "id": "anomaly",
    "term": "Anomaly",
    "category": "Anomaly detection",
    "definition": "A record whose measured behavior differs from the reference pattern enough to warrant attention.",
    "formula": "",
    "example": "The synthetic generator injects unusually large volume, latency, error-rate, or missing-rate values.",
    "note": "An unusual record is not automatically wrong, fraudulent, or harmful.",
    "scope": "Implemented concept"
  },
  {
    "id": "anomaly-score",
    "term": "Anomaly score",
    "category": "Anomaly detection",
    "definition": "A numeric ranking of how unusual a record appears under the detector.",
    "formula": "Project score = −IsolationForest.score_samples(features)",
    "example": "The project uses the negative score so larger values are more unusual.",
    "note": "Score direction depends on the API. This score is not a probability of fraud or error.",
    "scope": "Implemented concept"
  },
  {
    "id": "as-of-date",
    "term": "As-of date",
    "category": "Data quality",
    "definition": "The reference date against which a time-sensitive rule is evaluated.",
    "formula": "",
    "example": "The sample’s recency check uses 2026-09-30.",
    "note": "A batch’s evaluation date is different from today’s date or the time a visitor opens the report.",
    "scope": "Implemented concept"
  },
  {
    "id": "average-precision",
    "term": "Average precision",
    "category": "Anomaly detection",
    "definition": "A ranking metric that averages precision values, weighted by increases in recall as the score threshold changes.",
    "formula": "Sum of (recall increase × precision at that step)",
    "example": "monitor.py calculates average_precision_score using the injected labels and continuous anomaly scores.",
    "note": "It is not simply precision at one threshold, and it is not identical to trapezoidal PR-curve area.",
    "scope": "Implemented concept"
  },
  {
    "id": "baseline",
    "term": "Baseline",
    "category": "Shared foundations",
    "definition": "A simple reference approach used to judge whether a more complex method adds value.",
    "formula": "",
    "example": "The anomaly model is compared with rules; semantic RAG retrieval is accompanied by a BM25 keyword baseline.",
    "note": "Different methods must be compared on consistent labels, inputs, and evaluation scope.",
    "scope": "Implemented concept"
  },
  {
    "id": "bm25",
    "term": "BM25",
    "category": "RAG and Q&A",
    "definition": "A lexical relevance score based on term frequency, term rarity, and text length.",
    "formula": "Project parameters: k1 = 1.5; b = 0.75",
    "example": "The Python baseline scores character chunks. The browser scores documents and sentences.",
    "note": "BM25 scores are not probabilities or cosine similarities. The browser also adds explicit aliases and role-question heuristics.",
    "scope": "Implemented concept"
  },
  {
    "id": "calibration-set",
    "term": "Calibration set",
    "category": "Anomaly detection",
    "definition": "A separate dataset used here to choose an operational score cutoff after fitting the model.",
    "formula": "",
    "example": "400 normal records, generated with seed 22, set the 98th-percentile review cutoff.",
    "note": "Here calibration refers to threshold selection, not converting model scores into calibrated probabilities.",
    "scope": "Implemented concept"
  },
  {
    "id": "check-pass-rate",
    "term": "Check pass rate",
    "category": "Data quality",
    "definition": "The fraction of evaluated rule checks that pass.",
    "formula": "100 × passed checks / evaluated checks",
    "example": "1,683 / 1,750 × 100 = 96.17%.",
    "note": "This is not the percentage of entirely clean records; 188 of 250 rows pass every rule.",
    "scope": "Implemented concept"
  },
  {
    "id": "chunk-overlap",
    "term": "Chunk overlap",
    "category": "RAG and Q&A",
    "definition": "Text intentionally repeated between adjacent chunks to preserve some boundary context.",
    "formula": "Step = chunk size − overlap = 600 − 100 = 500 characters",
    "example": "The next window starts 500 characters after the prior start.",
    "note": "Overlap costs extra storage and can put repeated evidence in the retrieved results.",
    "scope": "Local version"
  },
  {
    "id": "chunking",
    "term": "Chunking",
    "category": "RAG and Q&A",
    "definition": "Splitting documents into smaller retrieval units.",
    "formula": "Project defaults: 600 characters per window; 100-character overlap",
    "example": "The local app uses fixed-size character windows. It is not recursive, semantic, or token-based chunking.",
    "note": "A window can cut across sentences; the chosen size is a baseline, not a proven optimum.",
    "scope": "Local version"
  },
  {
    "id": "cohort-analysis",
    "term": "Cohort analysis",
    "category": "Branch analytics",
    "definition": "Comparing a group with a shared characteristic across time so changes within that group can be examined.",
    "formula": "",
    "example": "The matched cohort consists of the 162 branch IDs present in both 2024 and 2025.",
    "note": "A fixed cohort helps separate comparable deposit growth from changes in which branches are included.",
    "scope": "Implemented concept"
  },
  {
    "id": "column-coverage",
    "term": "Column coverage",
    "category": "Data quality",
    "definition": "Which source columns have explicit rules and how many checks apply to each.",
    "formula": "",
    "example": "There are 7 input columns, but only 6 have rules. institution_id has two rules; bureau has none.",
    "note": "“Not assessed” is different from a 100% pass rate.",
    "scope": "Implemented concept"
  },
  {
    "id": "column-profiling",
    "term": "Column profiling",
    "category": "Data quality",
    "definition": "Summarizing properties of a column to understand its contents and potential issues.",
    "formula": "",
    "example": "The dashboard shows missing values, distinct values, assigned rules, failed checks, and affected rows.",
    "note": "These profiles use normalized strings; the distinct count includes a blank when one exists.",
    "scope": "Implemented concept"
  },
  {
    "id": "completeness",
    "term": "Completeness",
    "category": "Data quality",
    "definition": "Whether required values are present.",
    "formula": "",
    "example": "DQ001 flags 15 blank institution names.",
    "note": "A nonblank name may still be incorrect or outdated.",
    "scope": "Implemented concept"
  },
  {
    "id": "composite-key",
    "term": "Composite key",
    "category": "Branch analytics",
    "definition": "A record identifier made from more than one field.",
    "formula": "Project key = (year, branch_id)",
    "example": "SYN0001 can appear in both years; it cannot appear twice in the same year after validation.",
    "note": "Joining on a nonunique key can multiply rows and inflate deposit totals.",
    "scope": "Implemented concept"
  },
  {
    "id": "confusion-matrix",
    "term": "Confusion matrix",
    "category": "Anomaly detection",
    "definition": "A table comparing actual labels with predicted labels.",
    "formula": "Rows = actual; columns = predicted; labels = [normal, anomaly]",
    "example": "The model matrix is [[534, 18], [16, 32]]: TN, FP in the first row and FN, TP in the second.",
    "note": "Check axis and label order before interpreting a matrix.",
    "scope": "Implemented concept"
  },
  {
    "id": "consistency",
    "term": "Consistency",
    "category": "Data quality",
    "definition": "Whether related values agree across fields, records, or sources according to defined relationships.",
    "formula": "",
    "example": "Comparing an institution’s state across two authoritative systems could be a consistency check.",
    "note": "Cross-source consistency is not implemented in the current seven-rule dashboard.",
    "scope": "Related concept; not measured"
  },
  {
    "id": "context-window",
    "term": "Context window",
    "category": "RAG and Q&A",
    "definition": "The token capacity available for a model’s working input/output context.",
    "formula": "",
    "example": "The local Ollama request sets num_ctx to 4096 and num_predict to 400.",
    "note": "The code does not budget exact tokenizer counts before sending the prompt.",
    "scope": "Local version"
  },
  {
    "id": "cosine-similarity",
    "term": "Cosine similarity",
    "category": "RAG and Q&A",
    "definition": "A comparison of vector direction, commonly used with text embeddings.",
    "formula": "dot(a,b) / (norm(a) × norm(b))",
    "example": "Chroma is configured for cosine distance; the app converts it with similarity = 1 − distance.",
    "note": "A similarity of 0.70 is not 70% answer confidence.",
    "scope": "Local version"
  },
  {
    "id": "data-grain",
    "term": "Data grain",
    "category": "Branch analytics",
    "definition": "The real-world unit represented by one row.",
    "formula": "",
    "example": "In branches.csv, one row is one branch ID in one observation year. There are 341 branch-year rows and 179 distinct branch IDs.",
    "note": "A count of rows is not automatically a count of distinct branches.",
    "scope": "Implemented concept"
  },
  {
    "id": "data-leakage",
    "term": "Data leakage",
    "category": "Anomaly detection",
    "definition": "Using information during training or selection that would not be available when making a new prediction.",
    "formula": "",
    "example": "The project excludes injected_anomaly from features and selects the cutoff without test labels.",
    "note": "Separate seeds do not by themselves prove every aspect of an evaluation is leakage-free.",
    "scope": "Related concept"
  },
  {
    "id": "data-lineage",
    "term": "Data lineage",
    "category": "Shared foundations",
    "definition": "The traceable path from a data source through transformations to an output.",
    "formula": "",
    "example": "A branch row leads to cohort totals and a growth metric; a RAG passage retains source/page metadata.",
    "note": "These are traceability mechanisms, not a deployed enterprise lineage catalog.",
    "scope": "Implemented concept"
  },
  {
    "id": "data-validation",
    "term": "Data validation",
    "category": "Shared foundations",
    "definition": "Checking that an input satisfies specified requirements before or during analysis.",
    "formula": "",
    "example": "The branch pipeline rejects duplicate branch-year keys and negative deposits; the quality pipeline records rule exceptions.",
    "note": "The two projects handle failures differently: rejecting an input is not the same as reporting an exception.",
    "scope": "Implemented concept"
  },
  {
    "id": "data-quality-rule",
    "term": "Data-quality rule",
    "category": "Data quality",
    "definition": "An explicit condition used to evaluate whether a data value or record satisfies a stated policy.",
    "formula": "",
    "example": "DQ002 checks email syntax in Python/Pandas. Seven rules run on each of 250 sample rows.",
    "note": "A rule passing proves only its stated condition, not every aspect of business correctness.",
    "scope": "Implemented concept"
  },
  {
    "id": "decision-threshold",
    "term": "Decision threshold",
    "category": "Anomaly detection",
    "definition": "A cutoff that converts a continuous score into a flag.",
    "formula": "Flag when anomaly_score ≥ threshold",
    "example": "The cutoff is the 98th percentile of scores from 400 normal calibration records.",
    "note": "The benchmark applies its own cutoff; it does not use the model’s default predict() classification.",
    "scope": "Implemented concept"
  },
  {
    "id": "deposit-reconciliation-bridge",
    "term": "Deposit reconciliation bridge",
    "category": "Branch analytics",
    "definition": "A breakdown that connects prior total deposits to latest total deposits through matched growth and footprint effects.",
    "formula": "Latest total = prior total + matched change + entering deposits − exiting deposits",
    "example": "22,652,665.00 + 1,426,144.20 + 1,332,411.78 − 896,596.00 = 24,514,624.98 ($000).",
    "note": "The sample bridge residual is zero; each amount must use consistent units and period definitions.",
    "scope": "Implemented concept"
  },
  {
    "id": "deposit-share",
    "term": "Deposit share",
    "category": "Branch analytics",
    "definition": "A group’s deposits as a percentage of a clearly specified total.",
    "formula": "100 × group deposits / included total deposits",
    "example": "NY holds 21.93% of the included latest-year synthetic deposits.",
    "note": "This is a share of the sample, not of the entire US banking market. State-ledger filters do not change its denominator.",
    "scope": "Implemented concept"
  },
  {
    "id": "deposit-units-000",
    "term": "Deposit units ($000)",
    "category": "Branch analytics",
    "definition": "A convention in which each numeric unit represents one thousand dollars.",
    "formula": "Dollars = reported value × 1,000",
    "example": "42,919.00 in the CSV means an illustrative $42,919,000.",
    "note": "Ratios are unchanged when numerator and denominator use the same units; totals must be labeled correctly.",
    "scope": "Implemented concept"
  },
  {
    "id": "document-corpus",
    "term": "Document corpus",
    "category": "RAG and Q&A",
    "definition": "The collection of source documents available to a retrieval system.",
    "formula": "",
    "example": "The default corpus contains three fictional procedures in sample_documents/.",
    "note": "The project does not automatically scan the laptop, and project documentation is not indexed by default.",
    "scope": "Implemented concept"
  },
  {
    "id": "drift-diagnostic",
    "term": "Drift diagnostic",
    "category": "Anomaly detection",
    "definition": "A comparison of new feature distributions with the training reference.",
    "formula": "Project diagnostic = |test mean − training mean| / training standard deviation",
    "example": "monitor.py reports standardized mean shifts for each feature.",
    "note": "This implementation checks mean shifts only; it is not a statistical significance test or a complete drift monitor.",
    "scope": "Implemented concept"
  },
  {
    "id": "embedding",
    "term": "Embedding",
    "category": "RAG and Q&A",
    "definition": "A numeric representation of text used to compare semantic relationships.",
    "formula": "",
    "example": "MiniLM produces normalized dense 384-dimensional vectors for chunks and questions.",
    "note": "The embedding model retrieves evidence; Qwen performs answer generation in the local app.",
    "scope": "Local version"
  },
  {
    "id": "entering-and-exiting-ids",
    "term": "Entering and exiting IDs",
    "category": "Branch analytics",
    "definition": "Entering IDs appear only in the latest period; exiting IDs appear only in the prior period.",
    "formula": "",
    "example": "The sample has 9 entering and 8 exiting IDs. Together with 162 matched IDs, they explain the two annual counts.",
    "note": "Presence changes in an export are not automatically proven real branch openings or closures.",
    "scope": "Implemented concept"
  },
  {
    "id": "exception-queue",
    "term": "Exception queue",
    "category": "Data quality",
    "definition": "A list of failed checks with enough evidence to support investigation.",
    "formula": "",
    "example": "Filter by bureau, column, rule, dimension, weight, or observed value; inspect the full source row.",
    "note": "The queue is a review report, not an implemented ticketing or remediation workflow.",
    "scope": "Implemented concept"
  },
  {
    "id": "extractive-answer",
    "term": "Extractive answer",
    "category": "RAG and Q&A",
    "definition": "An answer selected directly from existing source text rather than newly written by a language model.",
    "formula": "",
    "example": "The live browser demo returns “The Data Owner approves or rejects the request.” with its source.",
    "note": "It can select an incomplete or irrelevant sentence; exact source presence alone is not full answer correctness.",
    "scope": "Browser version"
  },
  {
    "id": "f1-score",
    "term": "F1 score",
    "category": "Anomaly detection",
    "definition": "The harmonic mean of precision and recall, giving one summary of their balance.",
    "formula": "2 × precision × recall / (precision + recall)",
    "example": "With precision 0.64 and recall 0.6667, model F1 is approximately 0.6531.",
    "note": "F1 does not account for true negatives or unequal business costs. The code returns 0 for undefined precision/recall through zero_division=0.",
    "scope": "Implemented concept"
  },
  {
    "id": "false-negative-fn",
    "term": "False negative (FN)",
    "category": "Anomaly detection",
    "definition": "An anomaly that the detector incorrectly leaves unflagged.",
    "formula": "",
    "example": "16 injected test anomalies are missed by the model.",
    "note": "A high precision value alone does not rule out many false negatives.",
    "scope": "Implemented concept"
  },
  {
    "id": "false-positive-fp",
    "term": "False positive (FP)",
    "category": "Anomaly detection",
    "definition": "A normal record incorrectly flagged as an anomaly.",
    "formula": "",
    "example": "18 normal test records are flagged by the model.",
    "note": "False positives create review work, but their business cost depends on the application.",
    "scope": "Implemented concept"
  },
  {
    "id": "false-positive-rate",
    "term": "False positive rate",
    "category": "Anomaly detection",
    "definition": "The proportion of actual normal records incorrectly flagged.",
    "formula": "FP / (FP + TN)",
    "example": "For the test model, 18 / (18 + 534) is about 3.26%.",
    "note": "This denominator differs from 1 − precision. A 2% calibration target does not guarantee a 2% rate on new data.",
    "scope": "Implemented concept"
  },
  {
    "id": "feature",
    "term": "Feature",
    "category": "Anomaly detection",
    "definition": "An input variable used by a model to describe each observation.",
    "formula": "",
    "example": "The model uses daily_volume, error_rate, latency_ms, and missing_rate.",
    "note": "The injected_anomaly label is excluded from the feature matrix.",
    "scope": "Implemented concept"
  },
  {
    "id": "held-out-test-set",
    "term": "Held-out test set",
    "category": "Anomaly detection",
    "definition": "Data reserved to evaluate behavior after the model and cutoff have been selected.",
    "formula": "",
    "example": "600 records generated with seed 33 include 48 injected anomalies, or 8%.",
    "note": "The test labels are used to calculate metrics, not to fit the model or choose its cutoff.",
    "scope": "Implemented concept"
  },
  {
    "id": "herfindahl-hirschman-index-hhi",
    "term": "Herfindahl–Hirschman Index (HHI)",
    "category": "Branch analytics",
    "definition": "A concentration measure computed by summing squared percentage shares.",
    "formula": "HHI = sum of squared bank deposit shares within a state",
    "example": "A state with one included bank holding all deposits has HHI 10,000.",
    "note": "The project describes its included sample; HHI alone does not establish market definition or a regulatory conclusion.",
    "scope": "Implemented concept"
  },
  {
    "id": "hnsw",
    "term": "HNSW",
    "category": "RAG and Q&A",
    "definition": "A graph-based index approach used for approximate nearest-neighbor search.",
    "formula": "",
    "example": "Chroma’s single-node vector search uses HNSW; the application specifies cosine as its metric.",
    "note": "HNSW is the indexing/search approach; cosine is the metric. The project does not tune HNSW or prove exact-neighbor recall.",
    "scope": "Local version"
  },
  {
    "id": "hybrid-review-flag",
    "term": "Hybrid review flag",
    "category": "Anomaly detection",
    "definition": "A combined flag that requests review if either the model or an explicit rule flags the record.",
    "formula": "review_flag = model_flag OR rule_flag",
    "example": "Hybrid recall is 100% on this synthetic test, but precision is about 72.73%.",
    "note": "The simple rules outperform the model on deliberately obvious injected cases; do not generalize that result to real data.",
    "scope": "Implemented concept"
  },
  {
    "id": "indexing",
    "term": "Indexing",
    "category": "RAG and Q&A",
    "definition": "Preparing data structures that make later retrieval possible or efficient.",
    "formula": "",
    "example": "The local pipeline chunks and embeds documents, then stores them in a Chroma collection.",
    "note": "Indexing does not fine-tune Qwen. Rebuilding this index replaces the collection.",
    "scope": "Local version"
  },
  {
    "id": "isolation-forest",
    "term": "Isolation Forest",
    "category": "Anomaly detection",
    "definition": "An unsupervised method that uses random partitioning to isolate unusual observations.",
    "formula": "",
    "example": "The project fits 200 trees on 1,200 synthetic normal training rows.",
    "note": "The model is compared with explicit rules; model complexity is not assumed to improve results.",
    "scope": "Implemented concept"
  },
  {
    "id": "matched-branch-growth",
    "term": "Matched-branch growth",
    "category": "Branch analytics",
    "definition": "The percentage change in combined deposits for branch IDs present in both comparison periods.",
    "formula": "100 × (latest matched deposits − prior matched deposits) / prior matched deposits",
    "example": "100 × (23,182,213.20 − 21,756,069.00) / 21,756,069.00 = 6.5551557%, rounded to 6.56%. Values are in $000.",
    "note": "This is not the simple average of individual branch growth percentages. A zero prior total produces no percentage.",
    "scope": "Implemented concept"
  },
  {
    "id": "median-absolute-deviation-mad",
    "term": "Median absolute deviation (MAD)",
    "category": "Anomaly detection",
    "definition": "The median of absolute distances from the median, used as a robust spread estimate.",
    "formula": "median(|x − median(x)|)",
    "example": "Training-set MAD scales feature deviations; zero MAD is replaced by a tiny value to avoid division by zero.",
    "note": "A very small scale can produce very large z scores.",
    "scope": "Implemented concept"
  },
  {
    "id": "net-branch-change",
    "term": "Net branch change",
    "category": "Branch analytics",
    "definition": "The difference between latest-period and prior-period branch counts.",
    "formula": "Entering IDs − exiting IDs",
    "example": "9 − 8 = +1; the sample count goes from 170 to 171.",
    "note": "A small net change can hide substantial activity in both directions.",
    "scope": "Implemented concept"
  },
  {
    "id": "null-versus-zero",
    "term": "Null versus zero",
    "category": "Shared foundations",
    "definition": "A missing or undefined value is different from an observed numeric zero.",
    "formula": "",
    "example": "An entering branch has no prior-period record; its prior deposit is displayed as a dash.",
    "note": "The deposit bridge treats absence as a zero contribution for reconciliation, while preserving missing-period evidence in the ledger.",
    "scope": "Implemented concept"
  },
  {
    "id": "observed-versus-expected-value",
    "term": "Observed versus expected value",
    "category": "Data quality",
    "definition": "The value a rule actually evaluated compared with the condition the policy required.",
    "formula": "",
    "example": "Observed email: invalid-email. Expected: nonblank email syntax with no whitespace and a dotted domain.",
    "note": "The displayed observed value is normalized. The report does not preserve original pre-normalization bytes.",
    "scope": "Implemented concept"
  },
  {
    "id": "ollama",
    "term": "Ollama",
    "category": "RAG and Q&A",
    "definition": "A local runtime for serving downloaded language models.",
    "formula": "",
    "example": "The Python app calls qwen2.5:1.5b at 127.0.0.1:11434/api/chat.",
    "note": "The local application needs its host and model running; the public extractive demo does not.",
    "scope": "Local version"
  },
  {
    "id": "outer-join",
    "term": "Outer join",
    "category": "Branch analytics",
    "definition": "A join that preserves keys from either input, including those without a match.",
    "formula": "",
    "example": "The period comparison outer-joins branch_id and classifies both-side, prior-only, and latest-only records.",
    "note": "A missing period value is absence of a record, not an observed deposit of zero.",
    "scope": "Implemented concept"
  },
  {
    "id": "precision",
    "term": "Precision",
    "category": "Anomaly detection",
    "definition": "Of all records flagged as anomalies, the proportion that are truly labeled anomalies.",
    "formula": "TP / (TP + FP)",
    "example": "The model flags 50 test records: 32 are injected anomalies and 18 are normal. Precision = 32 / 50 = 64%.",
    "note": "High precision means fewer false alarms among flagged records; it does not tell you how many anomalies were missed.",
    "scope": "Implemented concept"
  },
  {
    "id": "precision-at-k",
    "term": "Precision at k",
    "category": "RAG and Q&A",
    "definition": "The fraction of the top k retrieval results that are relevant.",
    "formula": "Relevant results among top k / k",
    "example": "Two relevant passages among three retrieved candidates would give precision@3 = 2/3.",
    "note": "The current RAG evaluator does not calculate this metric. Anomaly precision uses a different set of labels and denominator.",
    "scope": "Related concept; not measured"
  },
  {
    "id": "prompt-augmentation",
    "term": "Prompt augmentation",
    "category": "RAG and Q&A",
    "definition": "Adding retrieved evidence to the question before requesting a language-model answer.",
    "formula": "",
    "example": "The local prompt includes numbered passages with source filename and page labels.",
    "note": "Prompt instructions do not guarantee the model follows them or that every generated claim is supported.",
    "scope": "Local version"
  },
  {
    "id": "recall",
    "term": "Recall",
    "category": "Anomaly detection",
    "definition": "Of all truly labeled anomalies, the proportion the detector successfully flags.",
    "formula": "TP / (TP + FN)",
    "example": "There are 48 injected anomalies. The model catches 32 and misses 16. Recall = 32 / 48 = 66.67%.",
    "note": "High recall means fewer missed anomalies; it can come with more false alarms. Also called sensitivity or true positive rate.",
    "scope": "Implemented concept"
  },
  {
    "id": "recall-at-k",
    "term": "Recall at k",
    "category": "RAG and Q&A",
    "definition": "The fraction of all known relevant retrieval items found among the top k results.",
    "formula": "Relevant items retrieved in top k / total relevant items",
    "example": "A dataset with multiple relevant passages would need passage-level relevance labels to calculate passage recall.",
    "note": "The current RAG evaluator reports expected-source hit rate, not a complete passage-level recall@k metric.",
    "scope": "Related concept; not measured"
  },
  {
    "id": "reproducibility",
    "term": "Reproducibility",
    "category": "Shared foundations",
    "definition": "Making an analysis repeatable from its input, code, settings, and environment.",
    "formula": "",
    "example": "The repositories include input samples, scripts, dependency versions, outputs, and automated checks.",
    "note": "A published batch report does not automatically refresh when its local input changes.",
    "scope": "Implemented concept"
  },
  {
    "id": "retrieval-augmented-generation-rag",
    "term": "Retrieval-augmented generation (RAG)",
    "category": "RAG and Q&A",
    "definition": "Retrieving relevant external evidence and supplying it to a language model to help answer a question.",
    "formula": "Retrieve evidence → augment prompt → generate answer",
    "example": "The local Python app retrieves from Chroma and sends labeled evidence to Qwen through Ollama.",
    "note": "The public browser Q&A is extractive and has no LLM generation.",
    "scope": "Local version"
  },
  {
    "id": "robust-z-score",
    "term": "Robust z score",
    "category": "Anomaly detection",
    "definition": "A measure of distance from a reference median using median absolute deviation as its scale.",
    "formula": "|value − training median| / (1.4826 × training MAD)",
    "example": "The dashboard names the feature with the largest absolute robust z score for each flagged row.",
    "note": "This is a descriptive deviation diagnostic, not SHAP, causal reasoning, or a model-specific attribution.",
    "scope": "Implemented concept"
  },
  {
    "id": "rule-check",
    "term": "Rule check",
    "category": "Data quality",
    "definition": "One execution of one rule against one record.",
    "formula": "Total checks = rows × applicable rules",
    "example": "250 rows × 7 rules = 1,750 checks; 67 fail and 1,683 pass.",
    "note": "One record can contribute more than one failed check.",
    "scope": "Implemented concept"
  },
  {
    "id": "similarity-threshold",
    "term": "Similarity threshold",
    "category": "RAG and Q&A",
    "definition": "A minimum similarity required for a retrieved candidate to be retained.",
    "formula": "Local default: cosine similarity ≥ 0.25",
    "example": "Candidates scoring 0.70, 0.31, and 0.18 leave two retained passages at threshold 0.25.",
    "note": "The default is provisional and needs relevant/irrelevant questions for calibration.",
    "scope": "Local version"
  },
  {
    "id": "source-citation",
    "term": "Source citation",
    "category": "RAG and Q&A",
    "definition": "A reference identifying evidence used to support an answer.",
    "formula": "",
    "example": "Local passages carry filename/page labels; the browser links its selected sentence to its document.",
    "note": "Citations support inspection but do not automatically verify every claim.",
    "scope": "Implemented concept"
  },
  {
    "id": "source-hit-rate-at-k",
    "term": "Source hit rate at k",
    "category": "RAG and Q&A",
    "definition": "The fraction of answerable evaluation questions for which the expected source appears in retained retrieval results.",
    "formula": "Questions retrieving expected source / answerable questions",
    "example": "The small repository baseline reports 6/6 expected-document hits.",
    "note": "This is not generated-answer accuracy or proof that the exact necessary passage was retrieved.",
    "scope": "Implemented concept"
  },
  {
    "id": "synthetic-data",
    "term": "Synthetic data",
    "category": "Shared foundations",
    "definition": "Artificially created data used to demonstrate or test a method without using real operational records.",
    "formula": "",
    "example": "The banking and branch projects use generated records; the anomaly benchmark injects known synthetic anomalies.",
    "note": "Synthetic results demonstrate behavior under their generator’s assumptions, not real-world effectiveness.",
    "scope": "Implemented concept"
  },
  {
    "id": "temperature",
    "term": "Temperature",
    "category": "RAG and Q&A",
    "definition": "A generation setting that influences variation in token selection.",
    "formula": "",
    "example": "The local application requests temperature 0.",
    "note": "Low temperature does not guarantee truthfulness or perfectly reproducible output.",
    "scope": "Local version"
  },
  {
    "id": "timeliness",
    "term": "Timeliness",
    "category": "Data quality",
    "definition": "Whether data is available or verified within the required time window.",
    "formula": "",
    "example": "DQ006 requires a parseable verification date from 0 to 90 days before the displayed as-of date.",
    "note": "Future dates and unparseable dates fail this project’s recency rule.",
    "scope": "Implemented concept"
  },
  {
    "id": "token",
    "term": "Token",
    "category": "RAG and Q&A",
    "definition": "A model-specific text unit that may be a word, a word fragment, or punctuation.",
    "formula": "",
    "example": "MiniLM and Qwen tokenize internally, while the Python chunker counts characters.",
    "note": "600 characters does not mean 600 tokens. Word-to-token ratios vary.",
    "scope": "Implemented concept"
  },
  {
    "id": "top-k-retrieval",
    "term": "Top-k retrieval",
    "category": "RAG and Q&A",
    "definition": "Requesting at most k highest-ranked candidate retrieval results.",
    "formula": "",
    "example": "The local app requests up to 3 chunks, then filters candidates by the minimum similarity.",
    "note": "Filtering can leave fewer than k passages; the application does not refill rejected slots.",
    "scope": "Local version"
  },
  {
    "id": "total-deposit-growth",
    "term": "Total deposit growth",
    "category": "Branch analytics",
    "definition": "The percentage change in all included deposits across the two periods, including changes in branch coverage.",
    "formula": "100 × (latest total − prior total) / prior total",
    "example": "The synthetic network grows from 22,652,665.00 to 24,514,624.98 ($000), or about 8.22%.",
    "note": "It has a different denominator and purpose from the 6.56% matched-cohort result.",
    "scope": "Implemented concept"
  },
  {
    "id": "training-set",
    "term": "Training set",
    "category": "Anomaly detection",
    "definition": "The observations used to fit model parameters.",
    "formula": "",
    "example": "1,200 synthetic normal records, generated with seed 11, fit the Isolation Forest.",
    "note": "Using a record for training and evaluating it as unseen test data would weaken the evaluation.",
    "scope": "Implemented concept"
  },
  {
    "id": "true-negative-tn",
    "term": "True negative (TN)",
    "category": "Anomaly detection",
    "definition": "A normal record correctly left unflagged.",
    "formula": "",
    "example": "534 normal test records are correctly left unflagged.",
    "note": "Large numbers of normal records can make accuracy look high even when recall is weak.",
    "scope": "Implemented concept"
  },
  {
    "id": "true-positive-tp",
    "term": "True positive (TP)",
    "category": "Anomaly detection",
    "definition": "A record correctly flagged as an anomaly.",
    "formula": "",
    "example": "32 injected anomalies are correctly flagged in the model test results.",
    "note": "“Positive” means anomaly in this benchmark; always state which class is positive.",
    "scope": "Implemented concept"
  },
  {
    "id": "uniqueness",
    "term": "Uniqueness",
    "category": "Data quality",
    "definition": "Whether an identifier satisfies the required no-duplicate condition within the relevant scope.",
    "formula": "",
    "example": "DQ005 flags both rows sharing a duplicated institution ID; two rows fail.",
    "note": "Define the scope. Branch IDs across different years are expected to repeat in the branch project.",
    "scope": "Implemented concept"
  },
  {
    "id": "validity",
    "term": "Validity",
    "category": "Data quality",
    "definition": "Whether values conform to permitted formats, types, or allowed sets.",
    "formula": "",
    "example": "Rules check email syntax, supported state codes, license statuses, and nonblank identifiers.",
    "note": "A syntactically valid email is not necessarily deliverable; a valid state code is not a verified address.",
    "scope": "Implemented concept"
  },
  {
    "id": "vector-database",
    "term": "Vector database",
    "category": "RAG and Q&A",
    "definition": "A store that supports searching numeric vectors, often alongside their text and metadata.",
    "formula": "",
    "example": "Chroma PersistentClient stores chunk vectors, text, filenames, page numbers, and chunk positions locally.",
    "note": "The browser demo has no vector database.",
    "scope": "Local version"
  },
  {
    "id": "weighted-average",
    "term": "Weighted average",
    "category": "Branch analytics",
    "definition": "An average in which each observation contributes according to a specified weight.",
    "formula": "Sum(weight × value) / sum(weights)",
    "example": "With positive prior deposits, aggregate matched growth is a prior-deposit-weighted average of individual growth rates.",
    "note": "A large branch contributes more to the aggregate deposit change than a small branch with the same percentage rate.",
    "scope": "Implemented concept"
  },
  {
    "id": "weighted-quality-score",
    "term": "Weighted quality score",
    "category": "Data quality",
    "definition": "A policy-weighted summary that penalizes a record for the relative weight of its failed rules.",
    "formula": "100 × (1 − failed rule weights / total rule weights)",
    "example": "The seven rule weights sum to 19. The dashboard averages rounded record scores to 96.86/100.",
    "note": "Weights are illustrative policy choices, not calibrated risk probabilities.",
    "scope": "Implemented concept"
  }
];
