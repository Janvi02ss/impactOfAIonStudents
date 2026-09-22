# AI Interaction Log Template

| Date | Tool | Purpose | Prompt / prompt extract | Output | What I verified | Change made | Accepted? |
|---|---|---|---|---|---|---|---|
| | | Dataset exploration | | | Checked calculation against raw CSV | | |
| | | Qualitative coding | | | Compared categories with original responses | | |
| | | Story direction | | | Checked all claims against sources | | |
| | | Visualisation idea | | | Tested whether data supports chart | | |

## Required validation rule
AI can suggest patterns, categories, code or questions. It cannot be treated as the source of truth.

For every important AI-generated claim:
1. identify the original data/source;
2. reproduce the calculation if numerical;
3. inspect the relevant rows/categories;
4. record whether the claim is supported;
5. revise or reject it if unsupported.

## Example
Prompt: “Find relationships between GenAI hours and student outcomes in this CSV.”

AI output: “Higher GenAI use causes lower skill retention.”

Validation: Reject the word “causes”. Recalculate correlation and grouped means. Final wording: “In this supplied dataset, higher GenAI-use bands are associated with lower mean skill-retention scores; this is correlational and does not establish causation.”
