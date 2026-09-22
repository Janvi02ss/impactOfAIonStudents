# Data Quality & Preparation Report

## File received
`ai_student_impact_dataset (1).csv`

## Size
- Rows: 50,000
- Original columns: 16

## Missing values
All 16 original columns have **0 missing values**.

## Duplicates
- Duplicate full rows: 0
- Duplicate Student_ID values: 0

## Range checks
- Pre-semester GPA outside 1–4: 0
- Post-semester GPA outside 1–4: 0
- Weekly GenAI hours outside 0–40: 0
- Perceived AI dependency outside 1–10: 0
- Exam anxiety outside 1–10: 0
- Skill retention outside 0–100: 0

## Cleaning performed
1. Standardised column names to lowercase snake_case.
2. Converted `Paid_Subscription` from boolean to Yes/No.
3. Added `gpa_change = post_semester_gpa - pre_semester_gpa`.
4. Added GenAI-hours bands.
5. Added dependency bands.
6. Added anxiety bands.
7. Added total study hours.
8. Added AI-to-traditional-study ratio.
9. Preserved the original raw file unchanged.

## Quality limitation
The CSV itself does not identify:
- who collected it;
- when it was collected;
- country/institution;
- sampling method;
- survey instrument;
- whether rows are observed, simulated or synthetic.

Therefore, internal cleanliness is **not** evidence of external validity.
