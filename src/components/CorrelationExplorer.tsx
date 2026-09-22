import React, { useState } from 'react';
import { CorrelationRow } from '../types/research';
import { AlertCircle, HelpCircle, ArrowRight, Check, Info } from 'lucide-react';

interface CorrelationExplorerProps {
  correlations: CorrelationRow[];
  variables: string[];
}

export const CorrelationExplorer: React.FC<CorrelationExplorerProps> = ({ correlations, variables }) => {
  const [selectedPair, setSelectedPair] = useState<{ var1: string; var2: string }>({
    var1: 'weekly_genai_hours',
    var2: 'perceived_ai_dependency'
  });
  const [caveatExpanded, setCaveatExpanded] = useState<boolean>(true);

  // Friendly display names
  const varNames: Record<string, string> = {
    weekly_genai_hours: 'Weekly GenAI Hours',
    traditional_study_hours: 'Traditional Study Hours',
    perceived_ai_dependency: 'Perceived AI Dependency',
    anxiety_level_during_exams: 'Exam Anxiety Level',
    skill_retention_score: 'Skill Retention Score',
    pre_semester_gpa: 'Pre-Semester GPA',
    post_semester_gpa: 'Post-Semester GPA',
    gpa_change: 'GPA Change (Post - Pre)'
  };

  const getCorrelation = (v1: string, v2: string): number => {
    const row = correlations.find((r) => r.variable === v1);
    if (row && row.values[v2] !== undefined) {
      return row.values[v2];
    }
    const reverseRow = correlations.find((r) => r.variable === v2);
    if (reverseRow && reverseRow.values[v1] !== undefined) {
      return reverseRow.values[v1];
    }
    return 0;
  };

  const currentR = getCorrelation(selectedPair.var1, selectedPair.var2);

  // Determine strength label
  const getInterpretation = (r: number, v1: string, v2: string): { strength: string; description: string; caution: string } => {
    const absR = Math.abs(r);
    let strength = 'Near Zero / Negligible';
    if (absR >= 0.7) strength = 'Very Strong';
    else if (absR >= 0.5) strength = 'Moderate to Strong';
    else if (absR >= 0.25) strength = 'Moderate';
    else if (absR >= 0.1) strength = 'Weak to Modest';

    const direction = r > 0 ? 'positive' : r < 0 ? 'negative' : 'neutral';

    let desc = `A Pearson correlation of ${r.toFixed(3)} indicates a ${strength.toLowerCase()} ${direction} linear association between ${varNames[v1] || v1} and ${varNames[v2] || v2}.`;
    let caution = 'Remember that correlation describes how two variables move together, not that one causes the other.';

    if (
      (v1 === 'weekly_genai_hours' && v2 === 'perceived_ai_dependency') ||
      (v2 === 'weekly_genai_hours' && v1 === 'perceived_ai_dependency')
    ) {
      desc = `Strongest correlation in the AI dataset (r = +0.665). Students spending more weekly hours on GenAI report significantly higher perceived psychological reliance on the tool.`;
      caution = 'Does heavy usage cause dependency, or do students who feel unconfident in their coursework turn to AI for longer hours? Both dynamics likely reinforce one another.';
    } else if (
      (v1 === 'traditional_study_hours' && v2 === 'gpa_change') ||
      (v2 === 'traditional_study_hours' && v1 === 'gpa_change')
    ) {
      desc = `Traditional unassisted study hours remain the strongest positive predictor of semester GPA improvement (r = +0.376). Deliberate, unassisted practice directly associates with academic gains.`;
      caution = 'Time spent in deep study reflects active learning habits that generative tools cannot purely replicate.';
    } else if (
      (v1 === 'pre_semester_gpa' && v2 === 'post_semester_gpa') ||
      (v2 === 'pre_semester_gpa' && v1 === 'post_semester_gpa')
    ) {
      desc = `Extremely strong correlation (r = +0.927). Pre-existing academic performance is overwhelmingly sticky from one semester to the next.`;
      caution = 'CRITICAL RESEARCH INSIGHT: Because baseline GPA is so dominant, post-semester GPA cannot be interpreted as an isolated consequence of AI tools.';
    } else if (
      (v1 === 'weekly_genai_hours' && v2 === 'traditional_study_hours') ||
      (v2 === 'weekly_genai_hours' && v1 === 'traditional_study_hours')
    ) {
      desc = `Modest negative correlation (r = -0.157). More time spent with GenAI slightly displaces traditional reading and problem solving.`;
      caution = 'The displacement is modest, suggesting many students use AI in tandem with standard study rather than abandoning books entirely.';
    } else if (
      (v1 === 'weekly_genai_hours' && v2 === 'skill_retention_score') ||
      (v2 === 'weekly_genai_hours' && v1 === 'skill_retention_score')
    ) {
      desc = `Modest negative correlation (r = -0.118). Across the full 50,000 students, higher weekly AI hours associate with slightly lower long-term skill retention scores.`;
      caution = 'As shown in the use-case analysis, the nature of the task (debugging vs direct answers) modulates retention far more than raw hours alone.';
    }

    return { strength, description: desc, caution };
  };

  const currentAnalysis = getInterpretation(currentR, selectedPair.var1, selectedPair.var2);

  // Light, soft, legible heatmap color generator with gentle pastel tones and clear dark text
  const getCellColor = (val: number): string => {
    if (val === 1) return 'bg-[#EAE4FC] text-[#24113F] font-bold'; // soft light lavender
    if (val > 0.6) return 'bg-[#DFD4FA] text-[#24113F] font-semibold'; // gentle soft lilac
    if (val > 0.3) return 'bg-[#EBE3FC] text-[#24113F] font-medium'; // delicate light purple tint
    if (val > 0.1) return 'bg-[#F4EFFF] text-[#24113F]'; // subtle light pastel tint
    if (val > 0) return 'bg-[#FAF8FE] text-[#29252F]'; // soft neutral off-white
    if (val < -0.1) return 'bg-[#FFE4E8] text-[#881337] font-medium'; // soft light blush/rose tint
    if (val < 0) return 'bg-[#FFF1F3] text-[#9F1239]'; // whisper soft rose tint
    return 'bg-white text-[#29252F]';
  };

  return (
    <section id="trade-offs-section" className="py-16 border-b border-[#DCCEFF] bg-[#F8F6FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center space-x-2 text-xs font-mono-stat uppercase tracking-wider text-[#24113F] mb-2 font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#6C3BFF]"></span>
            <span>Narrative Direction 3 &bull; Trade-offs &amp; Correlations</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl font-normal text-[#24113F] tracking-tight mb-4">
            The Statistical Trade-off Matrix
          </h2>
          <p className="text-[#29252F] text-base sm:text-lg leading-relaxed">
            How do hours, anxiety, retention, and study time interrelate? 
            Below is the full correlation matrix computed from the 50,000 student records. 
            Click any cell or select two variables to inspect the Pearson coefficient and understand its real-world academic meaning.
          </p>
        </div>

        {/* Interactive Correlation Heatmap Grid */}
        <div className="bg-white p-5 rounded-xl border border-[#DCCEFF] mb-8 overflow-x-auto shadow-2xs">
          <div className="min-w-[700px]">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr>
                  <th className="p-2 text-left font-semibold text-[#24113F] border-b border-[#DCCEFF]">
                    Variable Matrix (r)
                  </th>
                  {variables.map((v) => (
                    <th key={v} className="p-2 text-center font-mono-stat font-bold text-[#24113F] border-b border-[#DCCEFF]">
                      <span className="block max-w-[80px] mx-auto truncate" title={varNames[v] || v}>
                        {varNames[v] ? varNames[v].split(' ')[0] : v}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {variables.map((v1) => (
                  <tr key={v1} className="hover:bg-[#F8F6FC] transition-colors">
                    <td className="p-2 text-left font-semibold text-[#24113F] border-b border-[#DCCEFF]">
                      {varNames[v1] || v1}
                    </td>
                    {variables.map((v2) => {
                      const val = getCorrelation(v1, v2);
                      const isSelected =
                        (selectedPair.var1 === v1 && selectedPair.var2 === v2) ||
                        (selectedPair.var1 === v2 && selectedPair.var2 === v1);
                      return (
                        <td
                          key={v2}
                          onClick={() => setSelectedPair({ var1: v1, var2: v2 })}
                          className={`p-2 text-center font-mono-stat cursor-pointer transition-all border border-[#DCCEFF]/60 ${getCellColor(
                            val
                          )} ${isSelected ? 'ring-2 ring-[#6C3BFF] ring-offset-1 z-10 font-bold' : 'hover:opacity-90'}`}
                          title={`${varNames[v1]} vs ${varNames[v2]}: r = ${val.toFixed(3)}`}
                        >
                          {val.toFixed(2)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Color Scale Legend */}
          <div className="mt-4 pt-3 border-t border-[#DCCEFF] flex flex-wrap items-center justify-between text-[11px] text-[#29252F]/70 gap-2">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="font-semibold text-[#24113F]">Color Scale (Light):</span>
              <span className="px-2 py-0.5 rounded bg-[#FFE4E8] text-[#881337] border border-[#FECDD3] font-mono-stat">-0.16 (Negative)</span>
              <span className="px-2 py-0.5 rounded bg-white text-[#29252F] border border-[#DCCEFF] font-mono-stat">0.00 (Neutral)</span>
              <span className="px-2 py-0.5 rounded bg-[#F4EFFF] text-[#24113F] border border-[#DCCEFF] font-mono-stat">+0.15 (Mild)</span>
              <span className="px-2 py-0.5 rounded bg-[#EBE3FC] text-[#24113F] border border-[#DCCEFF] font-mono-stat">+0.30 (Moderate)</span>
              <span className="px-2 py-0.5 rounded bg-[#DFD4FA] text-[#24113F] border border-[#DCCEFF] font-mono-stat font-semibold">+0.67 (Strong)</span>
              <span className="px-2 py-0.5 rounded bg-[#EAE4FC] text-[#24113F] border border-[#DCCEFF] font-mono-stat font-bold">+1.00 (Self)</span>
            </div>
            <span>Click any cell to inspect the bivariate relationship</span>
          </div>
        </div>

        {/* Selected Pair Detailed Explanation Card */}
        <div className="bg-white p-6 rounded-xl border border-[#DCCEFF] mb-8 shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#DCCEFF] mb-4">
            <div className="flex items-center space-x-3">
              <span className="text-xs font-mono-stat uppercase tracking-wider text-[#6C3BFF] font-semibold">
                Selected Relationship
              </span>
              <div className="flex items-center space-x-2 text-[#24113F] font-bold text-base sm:text-lg">
                <span>{varNames[selectedPair.var1]}</span>
                <span className="text-[#6C3BFF]">&harr;</span>
                <span>{varNames[selectedPair.var2]}</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-xs text-[#29252F]/70">Pearson Coefficient:</span>
              <span className="px-3 py-1 rounded-lg bg-[#24113F] text-[#C7F36B] font-mono-stat font-bold text-base">
                r = {currentR > 0 ? `+${currentR.toFixed(3)}` : currentR.toFixed(3)}
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#DCCEFF]/60 text-[#24113F]">
                {currentAnalysis.strength}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-7">
              <h4 className="font-editorial text-lg font-bold text-[#24113F] mb-2">
                What the Data Shows
              </h4>
              <p className="text-sm text-[#29252F] leading-relaxed mb-3">
                {currentAnalysis.description}
              </p>
            </div>

            <div className="md:col-span-5 bg-[#DCCEFF]/20 p-4 rounded-xl border border-[#6C3BFF]/20">
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-[#6C3BFF] shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-[#24113F] mb-1">
                    Causal Limitation Note
                  </h5>
                  <p className="text-xs text-[#29252F] leading-normal">
                    {currentAnalysis.caution}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Expandable "What This Does NOT Prove" Panel */}
        <div className="border border-[#DCCEFF] rounded-xl overflow-hidden shadow-2xs">
          <button
            id="toggle-caveat-panel-btn"
            onClick={() => setCaveatExpanded(!caveatExpanded)}
            className="w-full px-5 py-4 bg-white flex items-center justify-between text-left hover:bg-[#DCCEFF]/20 transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <Info className="w-5 h-5 text-[#6C3BFF]" />
              <div>
                <span className="font-editorial text-lg font-bold text-[#24113F] block">
                  Methodological Caveats: What This Dataset Does NOT Prove
                </span>
                <span className="text-xs text-[#29252F]/70">
                  Essential academic integrity limitations and data provenance disclosure
                </span>
              </div>
            </div>
            <span className="text-xs font-mono-stat text-[#6C3BFF] font-semibold">
              {caveatExpanded ? 'Hide Details ▲' : 'Show Details ▼'}
            </span>
          </button>

          {caveatExpanded && (
            <div className="p-6 bg-[#F8F6FC] space-y-4 text-sm text-[#29252F] leading-relaxed border-t border-[#DCCEFF]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-white border border-[#DCCEFF] shadow-2xs">
                  <h5 className="font-bold text-[#24113F] text-xs uppercase tracking-wider mb-2">
                    1. No Guaranteed Causal Mechanism
                  </h5>
                  <p className="text-xs leading-normal">
                    A negative correlation (-0.118) between weekly hours and skill retention does not prove that AI erodes memory. 
                    Students struggling with retention may independently log more hours attempting to catch up.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#DCCEFF] shadow-2xs">
                  <h5 className="font-bold text-[#24113F] text-xs uppercase tracking-wider mb-2">
                    2. Strong Baseline GPA Anchor (0.927)
                  </h5>
                  <p className="text-xs leading-normal">
                    Pre-semester and post-semester GPA correlate at 0.927. A student’s academic performance is heavily anchored by prior knowledge, study habits, and course difficulty, not solely semester AI usage.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#DCCEFF] shadow-2xs">
                  <h5 className="font-bold text-[#24113F] text-xs uppercase tracking-wider mb-2">
                    3. Dataset Provenance Limitation
                  </h5>
                  <p className="text-xs leading-normal">
                    The 50,000-row dataset has zero missing values and clean ranges, but lacks real-world institutional collection metadata. As mandated by the research brief, treat it as an exploratory working model.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
