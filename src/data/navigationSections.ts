import { 
  Compass, 
  BarChart3, 
  Layers, 
  AlertCircle, 
  BookOpen, 
  Users, 
  HelpCircle, 
  Sliders,
  TableProperties,
  Sparkles,
  Wrench
} from 'lucide-react';
import React from 'react';

export interface NavSection {
  id: string;
  targetId: string;
  label: string;
  shortLabel: string;
  number: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const NAV_SECTIONS: NavSection[] = [
  {
    id: 'overview',
    targetId: 'overview-section',
    label: 'Overview & Framing',
    shortLabel: 'Overview',
    number: '01',
    subtitle: 'Executive Summary & 50,000-Row Provenance',
    icon: Compass,
  },
  {
    id: 'spectrum',
    targetId: 'spectrum-section',
    label: 'Hours Spectrum',
    shortLabel: 'Spectrum',
    number: '02',
    subtitle: '0–2h to >20h Weekly Study Inflection Curve',
    icon: BarChart3,
  },
  {
    id: 'use-cases',
    targetId: 'use-cases-section',
    label: 'Academic Use Cases',
    shortLabel: 'Use Cases',
    number: '03',
    subtitle: 'Tutor vs. Shortcut Across 5 Core Modalities',
    icon: Layers,
  },
  {
    id: 'trade-offs',
    targetId: 'trade-offs-section',
    label: 'Trade-offs & Correlations',
    shortLabel: 'Trade-offs',
    number: '04',
    subtitle: 'Statistical Correlation Matrix & Anxiety Curves',
    icon: AlertCircle,
  },
  {
    id: 'benchmarks',
    targetId: 'benchmarks-section',
    label: 'External Benchmarks',
    shortLabel: 'Benchmarks',
    number: '05',
    subtitle: 'HEPI, Jisc & The Institutional Support Gap',
    icon: BookOpen,
  },
  {
    id: 'voices',
    targetId: 'voices-section',
    label: 'Student Voices',
    shortLabel: 'Voices',
    number: '06',
    subtitle: 'Qualitative Survey Themes & 6 Thematic Codes',
    icon: Users,
  },
  {
    id: 'demographics',
    targetId: 'demographics-section',
    label: 'Demographics & Policy',
    shortLabel: 'Demographics',
    number: '07',
    subtitle: 'Disciplinary Breakdown, Skill & Institutional Rules',
    icon: Sliders,
  },
  {
    id: 'self-test',
    targetId: 'self-test-section',
    label: 'Self-Reflection Diagnostic',
    shortLabel: 'Diagnostic',
    number: '08',
    subtitle: 'Personal Usage Intensity & Risk Profiling Tool',
    icon: HelpCircle,
  },
  {
    id: 'impact-matrix',
    targetId: 'impact-matrix-section',
    label: 'AI & Social Media Impact',
    shortLabel: 'Impact Matrix',
    number: '09',
    subtitle: 'Cognition, Social Algorithms & Academic Workflows',
    icon: TableProperties,
  },
  {
    id: 'conclusion',
    targetId: 'conclusion-section',
    label: 'The Path Forward',
    shortLabel: 'Conclusion',
    number: '10',
    subtitle: 'Human Agency, Focus & Modern Study Rules',
    icon: Sparkles,
  },
  {
    id: 'tools',
    targetId: 'tools-section',
    label: 'Design & AI Student Tools',
    shortLabel: 'AI Tools',
    number: '11',
    subtitle: 'Curated Accelerators for Prototyping & AI Work',
    icon: Wrench,
  },
];
