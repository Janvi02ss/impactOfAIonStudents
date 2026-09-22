import React, { useState } from 'react';
import { UseCaseData } from '../types/research';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, Cell } from 'recharts';
import { CheckCircle2, XCircle, Code, Lightbulb, FileText, BookOpen, Zap, HelpCircle } from 'lucide-react';

interface UseCasesSectionProps {
  useCases: UseCaseData[];
}

export const UseCasesSection: React.FC<UseCasesSectionProps> = ({ useCases }) => {
  const [selectedUseCaseIndex, setSelectedUseCaseIndex] = useState<number>(0);
  const [comparisonMetric, setComparisonMetric] = useState<'retention' | 'gpa' | 'hours'>('retention');

  const selectedCase = useCases[selectedUseCaseIndex] || useCases[0];

  const useCaseIcons: Record<string, any> = {
    'Debugging/Troubleshooting': Code,
    'Ideation': Lightbulb,
    'Copywriting/Drafting': FileText,
    'Summarizing_Reading': BookOpen,
    'Direct_Answer_Generation': Zap,
  };

  const useCaseDetails: Record<string, { role: string; dynamic: string; tutorVsShortcut: string; riskLevel: string }> = {
    'Debugging/Troubleshooting': {
      role: 'Cognitive Amplifier / Error Diagnosis',
      dynamic: 'Students submit existing, self-authored code or mathematical attempts to identify syntax errors, explain stack traces, and understand edge cases.',
      tutorVsShortcut: 'Tutor Mode: The student has already engaged with the problem space. AI acts as an interactive diagnostic assistant, explaining WHY the error happened rather than doing the thinking.',
      riskLevel: 'Lowest cognitive atrophy risk. Yields the highest skill retention (78.07%) and highest post-semester GPA (3.40) in the dataset.'
    },
    'Ideation': {
      role: 'Creative Sparring Partner & Brainstorming',
      dynamic: 'Generating preliminary thesis angles, divergent research questions, or contrasting philosophical viewpoints to unblock project starts.',
      tutorVsShortcut: 'Tutor Mode: Used to overcome initial blank-page inertia. Successful students treat the AI’s suggestions as rough raw material to critique and filter.',
      riskLevel: 'Moderate. High utility for early momentum, but carries risk of narrowing originality if the student accepts generic suggestions without critique.'
    },
    'Summarizing_Reading': {
      role: 'Reading Synthesizer & Concept Explainer',
      dynamic: 'Condensing dense academic articles, technical whitepapers, or textbook chapters into key takeaways and bullet points.',
      tutorVsShortcut: 'Hybrid Mode: Effective when used as a pre-reading map or post-reading check. Harmful when substituted completely for reading the original text.',
      riskLevel: 'Moderate-High. Bypasses the active grappling with difficult prose, potentially weakening deep reading stamina and nuanced comprehension.'
    },
    'Copywriting/Drafting': {
      role: 'Prose Polisher / Text Co-Writer',
      dynamic: 'Drafting assignment sections, restructuring sentences, improving rhetorical tone, and refining grammar.',
      tutorVsShortcut: 'Shortcut Hazard: Borderline between editing and ghostwriting. When students outsource paragraph drafting, they lose their authentic authorial voice.',
      riskLevel: 'High. 12% of UK students in HEPI 2026 report directly including AI-generated text in submitted work. Leads to perceived homogenization of student writing.'
    },
    'Direct_Answer_Generation': {
      role: 'Cognitive Bypass / Complete Outsourcing',
      dynamic: 'Pasting assignment prompts, homework questions, or quiz problems directly into the model and copy-pasting the returned answer.',
      tutorVsShortcut: 'Pure Shortcut Mode: Zero cognitive struggle. The student acts merely as a copy-paste courier between the question prompt and submission portal.',
      riskLevel: 'Severe Hazard. Lowest skill retention (73.72%) and lowest post-semester GPA (3.29) across all 50,000 records. Substantial risk of exam failure.'
    }
  };

  const currentDetails = useCaseDetails[selectedCase.use_case] || {
    role: 'Academic Task',
    dynamic: 'Student interaction pattern.',
    tutorVsShortcut: 'Assistance mode.',
    riskLevel: 'General observation.'
  };

  const IconComponent = useCaseIcons[selectedCase.use_case] || Code;

  // Chart data sorted by skill retention
  const chartData = [...useCases]
    .sort((a, b) => b.mean_skill_retention - a.mean_skill_retention)
    .map((c) => ({
      name: c.display_name,
      rawName: c.use_case,
      retention: c.mean_skill_retention,
      gpa: c.mean_post_gpa,
      hours: c.mean_hours,
      students: c.n
    }));

  return (
    <section id="use-cases-section" className="py-16 border-b border-[#DCCEFF] bg-[#F8F6FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center space-x-2 text-xs font-mono-stat uppercase tracking-wider text-[#24113F] mb-2 font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#6C3BFF]"></span>
            <span>Narrative Direction 2 &bull; Purpose &amp; Modality</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl font-normal text-[#24113F] tracking-tight mb-4">
            Tutor or Shortcut: The 5 Primary Use Cases
          </h2>
          <p className="text-[#29252F] text-base sm:text-lg leading-relaxed">
            The impact of AI depends heavily on <em>what students ask it to do</em>. 
            Students using AI for diagnostic problem-solving (such as debugging) show the highest skill retention and GPA, 
            whereas those using it for direct answer generation show the lowest retention and poorest academic outcomes.
          </p>
        </div>

        {/* 5 Use-Case Interactive Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-8">
          {useCases.map((uc, idx) => {
            const isSelected = selectedUseCaseIndex === idx;
            const Icon = useCaseIcons[uc.use_case] || Code;
            const isHighest = uc.use_case === 'Debugging/Troubleshooting';
            const isLowest = uc.use_case === 'Direct_Answer_Generation';

            // Clean title to ensure long words like "Troubleshooting" break elegantly and never overflow
            const formattedTitle = uc.use_case === 'Debugging/Troubleshooting'
              ? 'Debugging & Troubleshooting'
              : uc.display_name.replace(/_/g, ' ').replace(/\//g, ' / ');

            return (
              <button
                key={uc.use_case}
                id={`use-case-btn-${idx}`}
                onClick={() => setSelectedUseCaseIndex(idx)}
                className={`p-3.5 sm:p-4 rounded-xl text-left transition-all relative border flex flex-col justify-between cursor-pointer min-w-0 overflow-hidden ${
                  isSelected
                    ? 'bg-white border-2 border-[#6C3BFF] shadow-xs'
                    : 'bg-white/70 border-[#DCCEFF] hover:bg-white hover:border-[#6C3BFF]/50 shadow-2xs'
                }`}
              >
                <div className="min-w-0 w-full">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-[#24113F] text-[#C7F36B]' : 'bg-[#DCCEFF]/50 text-[#24113F]'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    {isHighest && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#C7F36B] text-[#24113F] shrink-0">
                        Top Outcome
                      </span>
                    )}
                    {isLowest && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#24113F] text-[#C7F36B] shrink-0">
                        Lowest Score
                      </span>
                    )}
                  </div>
                  <h3 className="font-editorial text-sm sm:text-base font-bold text-[#24113F] leading-tight break-words hyphens-auto">
                    {formattedTitle}
                  </h3>
                  <p className="text-xs text-[#29252F]/70 mt-1 truncate">
                    {uc.n.toLocaleString()} students ({((uc.n / 50000) * 100).toFixed(1)}%)
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#DCCEFF]/60 flex items-center justify-between text-xs w-full min-w-0">
                  <span className="text-[#29252F]/70 text-[11px] truncate">Retention:</span>
                  <span className={`font-mono-stat font-bold text-xs ${isHighest ? 'text-[#6C3BFF]' : isLowest ? 'text-red-700' : 'text-[#24113F]'}`}>
                    {uc.mean_skill_retention.toFixed(1)}%
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Use-Case Deep Breakdown & Chart Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Deep Qualitative Context */}
          <div className="lg:col-span-6 bg-white p-6 rounded-xl border border-[#DCCEFF] shadow-2xs">
            <div className="flex items-center space-x-2 mb-2">
              <IconComponent className="w-5 h-5 text-[#6C3BFF]" />
              <span className="text-xs font-mono-stat uppercase tracking-wider text-[#6C3BFF] font-semibold">
                Task Modality Analysis
              </span>
            </div>
            <h3 className="font-editorial text-2xl font-bold text-[#24113F] mb-1">
              {selectedCase.display_name}
            </h3>
            <div className="text-xs font-bold text-[#6C3BFF] uppercase tracking-wide mb-4">
              {currentDetails.role}
            </div>

            <p className="text-sm text-[#29252F] mb-4 leading-relaxed">
              {currentDetails.dynamic}
            </p>

            {/* Tutor vs Shortcut Comparison Card */}
            <div className="p-4 rounded-xl bg-[#DCCEFF]/20 border border-[#6C3BFF]/20 space-y-3 mb-6">
              <div>
                <strong className="text-xs font-bold uppercase tracking-wider text-[#24113F] block mb-1">
                  How This Operates: Tutor vs. Shortcut
                </strong>
                <p className="text-xs text-[#29252F] leading-normal">
                  {currentDetails.tutorVsShortcut}
                </p>
              </div>

              <div className="pt-2 border-t border-[#DCCEFF]">
                <strong className="text-xs font-bold uppercase tracking-wider text-[#24113F] block mb-1">
                  Empirical Risk Level
                </strong>
                <p className="text-xs text-[#29252F] leading-normal">
                  {currentDetails.riskLevel}
                </p>
              </div>
            </div>

            {/* 4 Outcome Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="p-2.5 bg-[#F8F6FC] rounded-lg border border-[#DCCEFF] text-center">
                <span className="text-[10px] text-[#29252F]/70 block">Avg Weekly Hours</span>
                <span className="font-mono-stat font-bold text-sm text-[#24113F]">
                  {selectedCase.mean_hours.toFixed(1)} h
                </span>
              </div>
              <div className="p-2.5 bg-[#F8F6FC] rounded-lg border border-[#DCCEFF] text-center">
                <span className="text-[10px] text-[#29252F]/70 block">Post-Sem GPA</span>
                <span className="font-mono-stat font-bold text-sm text-[#24113F]">
                  {selectedCase.mean_post_gpa.toFixed(2)}
                </span>
              </div>
              <div className="p-2.5 bg-[#F8F6FC] rounded-lg border border-[#DCCEFF] text-center">
                <span className="text-[10px] text-[#29252F]/70 block">Skill Retention</span>
                <span className="font-mono-stat font-bold text-sm text-[#6C3BFF]">
                  {selectedCase.mean_skill_retention.toFixed(1)}%
                </span>
              </div>
              <div className="p-2.5 bg-[#F8F6FC] rounded-lg border border-[#DCCEFF] text-center">
                <span className="text-[10px] text-[#29252F]/70 block">Dependency (1–10)</span>
                <span className="font-mono-stat font-bold text-sm text-[#24113F]">
                  {selectedCase.mean_dependency.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Comparative Ranked Horizontal Bar Chart */}
          <div className="lg:col-span-6 bg-white p-6 rounded-xl border border-[#DCCEFF] shadow-2xs">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div>
                <h4 className="font-editorial text-lg font-bold text-[#24113F]">
                  Ranked Comparison Across Use Cases
                </h4>
                <p className="text-xs text-[#29252F]/70">
                  Comparing cognitive retention and outcomes across student tasks
                </p>
              </div>

              {/* Metric Toggle */}
              <div className="inline-flex rounded-lg border border-[#DCCEFF] p-0.5 bg-[#F8F6FC] text-xs">
                <button
                  id="uc-metric-retention"
                  onClick={() => setComparisonMetric('retention')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    comparisonMetric === 'retention'
                      ? 'bg-[#6C3BFF] font-semibold text-white shadow-2xs'
                      : 'text-[#29252F] hover:text-[#24113F]'
                  }`}
                >
                  Skill Retention
                </button>
                <button
                  id="uc-metric-gpa"
                  onClick={() => setComparisonMetric('gpa')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    comparisonMetric === 'gpa'
                      ? 'bg-[#6C3BFF] font-semibold text-white shadow-2xs'
                      : 'text-[#29252F] hover:text-[#24113F]'
                  }`}
                >
                  Post GPA
                </button>
                <button
                  id="uc-metric-hours"
                  onClick={() => setComparisonMetric('hours')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    comparisonMetric === 'hours'
                      ? 'bg-[#6C3BFF] font-semibold text-white shadow-2xs'
                      : 'text-[#29252F] hover:text-[#24113F]'
                  }`}
                >
                  Weekly Hours
                </button>
              </div>
            </div>

            {/* Horizontal Bar Chart */}
            <div className="h-68 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  layout="vertical"
                  margin={{ top: 5, right: 25, left: 35, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#DCCEFF" horizontal={false} />
                  <XAxis
                    type="number"
                    domain={
                      comparisonMetric === 'retention'
                        ? [70, 80]
                        : comparisonMetric === 'gpa'
                        ? [3.2, 3.45]
                        : [6, 11]
                    }
                    tick={{ fontSize: 11, fill: '#29252F' }}
                  />
                  <YAxis
                    dataKey="name"
                    type="category"
                    tick={{ fontSize: 11, fill: '#24113F' }}
                    width={110}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const d = payload[0].payload;
                        return (
                          <div className="bg-white p-2.5 rounded-lg border border-[#DCCEFF] shadow-md text-xs">
                            <p className="font-bold text-[#24113F]">{d.name}</p>
                            <p className="text-[#29252F] mt-1">
                              Skill Retention: <strong className="font-mono-stat">{d.retention.toFixed(1)}%</strong>
                            </p>
                            <p className="text-[#29252F]">
                              Post-Sem GPA: <strong className="font-mono-stat">{d.gpa.toFixed(2)}</strong>
                            </p>
                            <p className="text-[#6C3BFF]">
                              Avg AI Hours: <strong className="font-mono-stat">{d.hours.toFixed(1)} h/wk</strong>
                            </p>
                            <p className="text-[#29252F]/70 mt-0.5">Students: {d.students.toLocaleString()}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar
                    dataKey={comparisonMetric}
                    radius={[0, 4, 4, 0]}
                  >
                    {chartData.map((entry, index) => {
                      const isSelected = entry.rawName === selectedCase.use_case;
                      const isLowest = entry.rawName === 'Direct_Answer_Generation';
                      const isHighest = entry.rawName === 'Debugging/Troubleshooting';
                      let fill = '#DCCEFF';
                      if (isSelected) fill = '#24113F';
                      else if (isHighest) fill = '#6C3BFF';
                      else if (isLowest) fill = '#e11d48';
                      return <Cell key={`cell-${index}`} fill={fill} />;
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <p className="text-xs text-[#29252F] mt-4 leading-relaxed">
              <strong className="text-[#24113F]">Key Empirical Takeaway:</strong> Notice that higher AI hours do <em>not</em> automatically equate to lower retention. 
              Debugging accounts for the highest average weekly hours (9.4h), yet yields the highest retention (78.1%), 
              because the student maintains active cognitive engagement.
            </p>
          </div>
        </div>

        {/* Diagnostic Behavior Checklist: Tutor vs. Shortcut */}
        <div className="bg-white p-6 rounded-xl border border-[#DCCEFF] shadow-2xs">
          <h3 className="font-editorial text-xl font-bold text-[#24113F] mb-4">
            Diagnostic Framework: Are You Using AI as a Tutor or a Shortcut?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3 p-4 rounded-xl bg-[#DCCEFF]/20 border border-[#6C3BFF]/20">
              <div className="flex items-center space-x-2 text-[#24113F] font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#6C3BFF] shrink-0" />
                <span>The Learning Accelerator Pattern (Tutor Mode)</span>
              </div>
              <ul className="text-xs text-[#29252F] space-y-2 pl-6 list-disc">
                <li>Asking AI to explain the underlying logic behind confusing textbook passages or code errors.</li>
                <li>Requesting counterarguments to challenge and refine self-authored theses.</li>
                <li>Using AI to generate practice quiz questions to test active recall before closed-book exams.</li>
                <li>Treating AI output as an unverified draft requiring line-by-line editorial scrutiny.</li>
              </ul>
            </div>

            <div className="space-y-3 p-4 rounded-xl bg-rose-50/60 border border-rose-200/80">
              <div className="flex items-center space-x-2 text-rose-950 font-bold text-sm">
                <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>The Learning Substitute Pattern (Shortcut Mode)</span>
              </div>
              <ul className="text-xs text-[#29252F] space-y-2 pl-6 list-disc">
                <li>Copy-pasting assignment prompts directly to obtain complete solutions without trying first.</li>
                <li>Submitting AI-generated paragraphs with minimal or zero revision (12% UK benchmark).</li>
                <li>Accepting numerical solutions or factual claims without cross-referencing authoritative sources.</li>
                <li>Relying on AI summaries in place of reading primary source literature and research papers.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
