import csv
import json
import math
import os

def process():
    # 1. Summary by hours band
    hours_bands = []
    with open('05_analysis/summary_by_genai_hours_band.csv', 'r') as f:
        reader = csv.DictReader(f)
        for row in reader:
            hours_bands.append({
                "band": row['genai_hours_band'],
                "n": int(row['n']),
                "mean_post_gpa": float(row['mean_post_gpa']),
                "mean_gpa_change": float(row['mean_gpa_change']),
                "mean_skill_retention": float(row['mean_skill_retention']),
                "mean_dependency": float(row['mean_dependency']),
                "mean_exam_anxiety": float(row['mean_exam_anxiety']),
            })

    # 2. Summary by use case
    use_cases = []
    with open('05_analysis/summary_by_primary_use_case.csv', 'r') as f:
        reader = csv.DictReader(f)
        for row in reader:
            use_cases.append({
                "use_case": row['primary_use_case'],
                "display_name": row['primary_use_case'].replace('_', ' '),
                "n": int(row['n']),
                "mean_hours": float(row['mean_hours']),
                "mean_post_gpa": float(row['mean_post_gpa']),
                "mean_skill_retention": float(row['mean_skill_retention']),
                "mean_dependency": float(row['mean_dependency']),
                "mean_exam_anxiety": float(row['mean_exam_anxiety']),
            })

    # 3. Correlation matrix
    correlations = []
    variables = []
    with open('05_analysis/correlation_matrix.csv', 'r') as f:
        reader = csv.reader(f)
        header = next(reader)
        variables = header[1:]
        for row in reader:
            var_name = row[0]
            vals = [float(x) for x in row[1:]]
            correlations.append({
                "variable": var_name,
                "values": {variables[i]: vals[i] for i in range(len(variables))}
            })

    # 4. External evidence
    external_evidence = []
    with open('03_external_evidence/external_evidence_matrix.csv', 'r') as f:
        reader = csv.DictReader(f)
        for row in reader:
            external_evidence.append({
                "source": row['source'],
                "year": row['year'],
                "population": row['population'],
                "metric": row['metric'],
                "value": row['value'],
                "theme": row['theme'],
                "url": row['url'],
                "use": row['use']
            })

    # 5. Data dictionary
    data_dict = []
    with open('02_data/data_dictionary.csv', 'r') as f:
        reader = csv.DictReader(f)
        for row in reader:
            data_dict.append({
                "variable": row['variable'],
                "description": row['description'],
                "type": row['type'],
                "notes": row['notes']
            })

    # 6. Deep aggregation from cleaned 50,000 dataset
    major_stats = {}
    policy_stats = {}
    skill_stats = {}
    year_stats = {}
    burnout_stats = {}
    
    # Representative sample of students (400 points)
    sample_students = []
    total_rows = 0

    with open('02_data/cleaned_ai_student_impact_dataset.csv', 'r') as f:
        reader = csv.DictReader(f)
        for i, row in enumerate(reader):
            total_rows += 1
            
            major = row['major_category']
            policy = row['institutional_policy']
            skill = row['prompt_engineering_skill']
            year = row['year_of_study']
            burnout = row['burnout_risk_level']
            
            genai_hrs = float(row['weekly_genai_hours'])
            trad_hrs = float(row['traditional_study_hours'])
            dep = float(row['perceived_ai_dependency'])
            anx = float(row['anxiety_level_during_exams'])
            ret = float(row['skill_retention_score'])
            gpa_chg = float(row['gpa_change'])
            post_gpa = float(row['post_semester_gpa'])

            def acc(d, key):
                if key not in d:
                    d[key] = {'n': 0, 'genai_hrs': 0.0, 'trad_hrs': 0.0, 'dep': 0.0, 'anx': 0.0, 'ret': 0.0, 'gpa_chg': 0.0, 'post_gpa': 0.0, 'use_cases': {}}
                d[key]['n'] += 1
                d[key]['genai_hrs'] += genai_hrs
                d[key]['trad_hrs'] += trad_hrs
                d[key]['dep'] += dep
                d[key]['anx'] += anx
                d[key]['ret'] += ret
                d[key]['gpa_chg'] += gpa_chg
                d[key]['post_gpa'] += post_gpa
                uc = row['primary_use_case']
                d[key]['use_cases'][uc] = d[key]['use_cases'].get(uc, 0) + 1

            acc(major_stats, major)
            acc(policy_stats, policy)
            acc(skill_stats, skill)
            acc(year_stats, year)
            acc(burnout_stats, burnout)

            # Sample 1 out of every 125 rows -> 400 sample students
            if i % 125 == 0 and len(sample_students) < 400:
                sample_students.append({
                    "id": row['student_id'],
                    "major": major,
                    "year": year,
                    "ai_hours": round(genai_hrs, 1),
                    "trad_hours": round(trad_hrs, 1),
                    "dependency": int(row['perceived_ai_dependency']),
                    "use_case": row['primary_use_case'],
                    "prompt_skill": skill,
                    "tools_count": int(row['tool_diversity']),
                    "paid": row['paid_subscription'],
                    "policy": policy,
                    "anxiety": int(row['anxiety_level_during_exams']),
                    "post_gpa": round(post_gpa, 2),
                    "gpa_change": round(gpa_chg, 3),
                    "retention": round(ret, 1),
                    "burnout": burnout,
                    "band": row['genai_hours_band']
                })

    def finalize(d):
        res = []
        for k, v in d.items():
            n = v['n']
            top_uc = max(v['use_cases'].items(), key=lambda x: x[1])[0] if v['use_cases'] else ''
            res.append({
                "group": k,
                "n": n,
                "percentage": round((n / total_rows) * 100, 1),
                "mean_genai_hours": round(v['genai_hrs'] / n, 2),
                "mean_trad_hours": round(v['trad_hrs'] / n, 2),
                "mean_dependency": round(v['dep'] / n, 2),
                "mean_anxiety": round(v['anx'] / n, 2),
                "mean_retention": round(v['ret'] / n, 2),
                "mean_gpa_change": round(v['gpa_chg'] / n, 3),
                "mean_post_gpa": round(v['post_gpa'] / n, 2),
                "top_use_case": top_uc.replace('_', ' ')
            })
        return res

    output = {
        "datasetOverview": {
            "totalStudents": total_rows,
            "provenance": "Supplied synthetic/working dataset for exploratory research (Assignment 1)",
            "columns": 22,
            "missingValues": 0,
            "duplicateRows": 0,
            "dateAnalysed": "2026"
        },
        "hoursBands": hours_bands,
        "useCases": use_cases,
        "correlationMatrix": correlations,
        "correlationVariables": variables,
        "externalEvidence": external_evidence,
        "dataDictionary": data_dict,
        "byMajor": finalize(major_stats),
        "byPolicy": finalize(policy_stats),
        "bySkill": finalize(skill_stats),
        "byYear": finalize(year_stats),
        "byBurnout": finalize(burnout_stats),
        "sampleStudents": sample_students
    }

    os.makedirs('src/data', exist_ok=True)
    with open('src/data/researchData.json', 'w') as out:
        json.dump(output, out, indent=2)

    print("Success! Processed", total_rows, "rows. Sample points:", len(sample_students))

if __name__ == '__main__':
    process()
