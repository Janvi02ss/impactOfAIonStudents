import React, { useState } from 'react';
import { GroupSummary } from '../types/research';
import { GraduationCap, ShieldCheck, Sparkles, Calendar, Layers } from 'lucide-react';

interface DemographicAnalysisProps {
  byMajor: GroupSummary[];
  byPolicy: GroupSummary[];
  bySkill: GroupSummary[];
  byYear: GroupSummary[];
}

export const DemographicAnalysis: React.FC<DemographicAnalysisProps> = ({
  byMajor,
  byPolicy,
  bySkill,
  byYear
}) => {
  const [activeTab, setActiveTab] = useState<'major' | 'policy' | 'skill' | 'year'>('major');

  const tabs = [
    { id: 'major', label: 'By Academic Major (5)', icon: GraduationCap },
    { id: 'policy', label: 'By Institutional Policy (3)', icon: ShieldCheck },
    { id: 'skill', label: 'By Prompting Skill (3)', icon: Sparkles },
    { id: 'year', label: 'By Academic Stage (5)', icon: Calendar },
  ];

  const currentData = activeTab === 'major'
    ? byMajor
    : activeTab === 'policy'
    ? byPolicy
    : activeTab === 'skill'
    ? bySkill
    : byYear;

  const tabInsights: Record<string, string> = {
    major: 'STEM and Medical students report higher weekly AI hours (9.1h avg) concentrated in error debugging and literature synthesis. Humanities and Arts students report slightly fewer hours (7.6h avg) but experience higher anxiety regarding authorial voice and writing homogenization.',
    policy: 'Institutions with "Strict Ban" policies show only a modest drop in weekly hours (7.4h vs 8.6h in encouraged settings), but perceived dependency remains essentially identical (~3.4/10). Bans appear to drive covert use without reducing students’ reliance.',
    skill: 'Students with "Advanced" prompting literacy report the highest skill retention (77.8%) and lowest exam anxiety. High prompt literacy equips students to treat AI as a conversational tutor rather than a passive answer generator.',
    year: 'Freshmen exhibit the lowest initial skill retention (74.2%) and highest exam panic, whereas Graduate students demonstrate more targeted, restrained use centered on literature summaries and code debugging.'
  };

  return (
    <section id="demographics-section" className="py-16 border-b border-[#DCCEFF] bg-[#F8F6FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center space-x-2 text-xs font-mono-stat uppercase tracking-wider text-[#24113F] mb-2 font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#6C3BFF]"></span>
            <span>Narrative Direction 5 &bull; Demographic Diversity</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl font-normal text-[#24113F] tracking-tight mb-4">
            Demographic &amp; Institutional Disaggregation
          </h2>
          <p className="text-[#29252F] text-base sm:text-lg leading-relaxed">
            AI is not experienced uniformly. Inspect how academic discipline, institutional regulations, 
            prompting expertise, and stage of study modulate reported outcomes across the 50,000 students.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`demo-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center space-x-2 cursor-pointer ${
                  isSelected
                    ? 'bg-[#24113F] text-[#C7F36B] shadow-sm'
                    : 'bg-white text-[#29252F] hover:bg-[#DCCEFF]/30 border border-[#DCCEFF]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Key Tab Insight Callout */}
        <div className="bg-white p-4 rounded-xl border border-[#DCCEFF] mb-6 text-xs text-[#29252F] leading-normal flex items-start space-x-3 shadow-2xs">
          <Layers className="w-4 h-4 text-[#6C3BFF] shrink-0 mt-0.5" />
          <p>
            <strong className="text-[#24113F] font-bold">Analytical Insight:</strong> {tabInsights[activeTab]}
          </p>
        </div>

        {/* Data Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentData.map((item) => (
            <div
              key={item.group}
              className="bg-white p-5 rounded-xl border border-[#DCCEFF] shadow-2xs hover:border-[#6C3BFF] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-base font-bold font-editorial text-[#24113F]">
                    {item.group.replace(/_/g, ' ')}
                  </span>
                  <span className="text-[11px] font-mono-stat px-2 py-0.5 rounded-md bg-[#DCCEFF]/50 text-[#24113F] font-semibold">
                    {item.n.toLocaleString()} ({item.percentage}%)
                  </span>
                </div>

                <div className="text-xs text-[#29252F] mb-4">
                  Primary Task: <strong className="text-[#6C3BFF] font-semibold">{item.top_use_case}</strong>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 bg-[#F8F6FC] rounded-lg border border-[#DCCEFF]/60">
                    <span className="text-[10px] text-[#29252F]/70 block font-medium">Weekly AI Hours</span>
                    <span className="font-mono-stat font-bold text-[#24113F] text-sm">
                      {item.mean_genai_hours.toFixed(1)} h
                    </span>
                  </div>

                  <div className="p-2.5 bg-[#F8F6FC] rounded-lg border border-[#DCCEFF]/60">
                    <span className="text-[10px] text-[#29252F]/70 block font-medium">Traditional Study</span>
                    <span className="font-mono-stat font-bold text-[#24113F] text-sm">
                      {item.mean_trad_hours.toFixed(1)} h
                    </span>
                  </div>

                  <div className="p-2.5 bg-[#F8F6FC] rounded-lg border border-[#DCCEFF]/60">
                    <span className="text-[10px] text-[#29252F]/70 block font-medium">Skill Retention</span>
                    <span className="font-mono-stat font-bold text-[#24113F] text-sm">
                      {item.mean_retention.toFixed(1)}%
                    </span>
                  </div>

                  <div className="p-2.5 bg-[#F8F6FC] rounded-lg border border-[#DCCEFF]/60">
                    <span className="text-[10px] text-[#29252F]/70 block font-medium">Exam Anxiety</span>
                    <span className="font-mono-stat font-bold text-[#24113F] text-sm">
                      {item.mean_anxiety.toFixed(2)} / 10
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#DCCEFF] flex items-center justify-between text-[11px] text-[#29252F]">
                <span>Post GPA: <strong className="text-[#24113F] font-bold">{item.mean_post_gpa.toFixed(2)}</strong></span>
                <span className="font-mono-stat font-bold text-[#24113F] bg-[#C7F36B] px-2 py-0.5 rounded">
                  +{item.mean_gpa_change.toFixed(3)} GPA
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
