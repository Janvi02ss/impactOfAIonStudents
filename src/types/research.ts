export interface DatasetOverview {
  totalStudents: number;
  provenance: string;
  columns: number;
  missingValues: number;
  duplicateRows: number;
  dateAnalysed: string;
}

export interface HoursBand {
  band: string;
  n: number;
  mean_post_gpa: number;
  mean_gpa_change: number;
  mean_skill_retention: number;
  mean_dependency: number;
  mean_exam_anxiety: number;
}

export interface UseCaseData {
  use_case: string;
  display_name: string;
  n: number;
  mean_hours: number;
  mean_post_gpa: number;
  mean_skill_retention: number;
  mean_dependency: number;
  mean_exam_anxiety: number;
}

export interface CorrelationRow {
  variable: string;
  values: Record<string, number>;
}

export interface ExternalEvidenceItem {
  source: string;
  year: string;
  population: string;
  metric: string;
  value: string;
  theme: string;
  url: string;
  use: string;
}

export interface DataDictionaryItem {
  variable: string;
  description: string;
  type: string;
  notes: string;
}

export interface GroupSummary {
  group: string;
  n: number;
  percentage: number;
  mean_genai_hours: number;
  mean_trad_hours: number;
  mean_dependency: number;
  mean_anxiety: number;
  mean_retention: number;
  mean_gpa_change: number;
  mean_post_gpa: number;
  top_use_case: string;
}

export interface SampleStudent {
  id: string;
  major: string;
  year: string;
  ai_hours: number;
  trad_hours: number;
  dependency: number;
  use_case: string;
  prompt_skill: string;
  tools_count: number;
  paid: string;
  policy: string;
  anxiety: number;
  post_gpa: number;
  gpa_change: number;
  retention: number;
  burnout: string;
  band: string;
}

export interface ResearchDataset {
  datasetOverview: DatasetOverview;
  hoursBands: HoursBand[];
  useCases: UseCaseData[];
  correlationMatrix: CorrelationRow[];
  correlationVariables: string[];
  externalEvidence: ExternalEvidenceItem[];
  dataDictionary: DataDictionaryItem[];
  byMajor: GroupSummary[];
  byPolicy: GroupSummary[];
  bySkill: GroupSummary[];
  byYear: GroupSummary[];
  byBurnout: GroupSummary[];
  sampleStudents: SampleStudent[];
}
