import React, { useState } from 'react';
import { HoursBand } from '../types/research';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, AlertCircle, Info, Sparkles, Brain, Clock } from 'lucide-react';

interface HoursSpectrumSectionProps {
  hoursBands: HoursBand[];
}

export const HoursSpectrumSection: React.FC<HoursSpectrumSectionProps> = ({ hoursBands }) => {
  const [selectedBandIndex, setSelectedBandIndex] = useState<number>(2); // Default to >5–10 (sweet spot)
  const [activeChartMetric, setActiveChartMetric] = useState<'retention_vs_dep' | 'gpa_change' | 'anxiety'>('retention_vs_dep');

  const selectedBand = hoursBands[selectedBandIndex] || hoursBands[0];

  // Band narratives based on research plan
  const bandDescriptions: Record<string, { label: string; archetype: string; summary: string; risk: string }> = {
    '0–2': {
      label: 'Minimalist / Skeptic (0–2 h/wk)',
      archetype: 'The Independent Traditionalist',
      summary: 'Students primarily rely on textbooks, lecture recordings, and traditional notes. GenAI is used sparingly for occasional syntax lookup or initial definitions.',
      risk: 'Lower risk of cognitive dependency (2.45/10), but may face slower assignment turnaround compared to peers leveraging AI acceleration.'
    },
    '>2–5': {
      label: 'Light Assisted (>2–5 h/wk)',
      archetype: 'The Targeted Helper',
      summary: 'Targeted usage for specific friction points: debugging stubborn code errors, clarifying confusing textbook paragraphs, or unblocking an initial essay brainstorm.',
      risk: 'Maintains healthy cognitive autonomy. Dependency remains low (2.78/10), while mean skill retention ticks up slightly to 76.32%.'
    },
    '>5–10': {
      label: 'Balanced Hybrid (>5–10 h/wk)',
      archetype: 'The Accelerated Integrator',
      summary: 'The empirical peak for both GPA gain (+0.227) and skill retention (77.08%). Students integrate AI systematically as a tutor and feedback generator without outsourcing full drafts.',
      risk: 'Dependency rises to 3.30/10 and anxiety ticks up to 4.07/10, signaling the upper boundary before substitution effects emerge.'
    },
    '>10–20': {
      label: 'Heavy Reliance (>10–20 h/wk)',
      archetype: 'The Accelerated Co-Pilot',
      summary: 'GenAI is deeply embedded in almost all daily homework. Students frequently generate full draft sections and rely on AI to structure arguments.',
      risk: 'Clear transition threshold: dependency jumps to 4.30/10 and exam anxiety climbs to 4.79/10, though measured skill retention remains relatively steady at 76.59%.'
    },
    '>20': {
      label: 'Intensive Immersion (>20 h/wk)',
      archetype: 'The Cognitive Substitute',
      summary: 'Over 20 hours per week of GenAI interaction. Students report using AI to generate comprehensive answers and substitute for deep independent problem-solving.',
      risk: 'Marked inflection: skill retention drops sharply by 6.8 points to 70.25%, exam anxiety peaks at 5.62/10 (+47% vs minimalists), and perceived dependency surges to 6.37/10.'
    }
  };

  const chartData = hoursBands.map((band) => ({
    band: `${band.band} h/wk`,
    rawBand: band.band,
    students: band.n,
    retention: band.mean_skill_retention,
    dependency: band.mean_dependency * 10, // Normalized to 0–100 scale for comparison
    anxiety: band.mean_exam_anxiety * 10, // Normalized to 0–100 scale
    gpaChange: Number((band.mean_gpa_change * 100).toFixed(1)), // Centi-GPA units for readability
    postGpa: band.mean_post_gpa
  }));

  const currentDesc = bandDescriptions[selectedBand.band] || {
    label: selectedBand.band,
    archetype: 'Student Cohort',
    summary: 'Exploratory data band across the 50,000 student sample.',
    risk: 'Statistical association observed in dataset.'
  };

  return (
    <section id="spectrum-section" className="py-16 border-b border-[#DCCEFF] bg-[#F8F6FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center space-x-2 text-xs font-mono-stat uppercase tracking-wider text-[#24113F] mb-2 font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#6C3BFF]"></span>
            <span>Narrative Direction 1 &bull; Usage Intensity</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl font-normal text-[#24113F] tracking-tight mb-4">
            The AI Study Intensity Spectrum
          </h2>
          <p className="text-[#29252F] text-base sm:text-lg leading-relaxed">
            What happens to a student’s cognitive retention, anxiety, and grades as AI shifts from an occasional tutor to a full-time co-pilot? 
            The 50,000-student data reveals a distinct non-linear curve: modest positive outcomes up to 10 hours/week, 
            followed by a steep dependency surge and skill retention drop-off past 20 hours/week.
          </p>
        </div>

        {/* 5-Band Interactive Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 p-1.5 bg-[#DCCEFF]/30 rounded-xl mb-8 border border-[#DCCEFF]">
          {hoursBands.map((band, idx) => {
            const isSelected = selectedBandIndex === idx;
            const pct = ((band.n / 50000) * 100).toFixed(1);
            return (
              <button
                key={band.band}
                id={`band-tab-${idx}`}
                onClick={() => setSelectedBandIndex(idx)}
                className={`p-3 rounded-lg text-left transition-all relative cursor-pointer ${
                  isSelected
                    ? 'bg-white text-[#24113F] shadow-xs border-2 border-[#6C3BFF]'
                    : 'text-[#29252F] hover:text-[#24113F] hover:bg-white/60 border border-transparent'
                }`}
              >
                <div className="text-xs font-mono-stat font-semibold">
                  {band.band} hrs/wk
                </div>
                <div className="text-[11px] text-[#29252F]/70 mt-0.5">
                  {band.n.toLocaleString()} students ({pct}%)
                </div>
                {idx === 2 && (
                  <span className="mt-1.5 inline-block text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#C7F36B] text-[#24113F]">
                    Optimal Peak
                  </span>
                )}
                {idx === 4 && (
                  <span className="mt-1.5 inline-block text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#24113F] text-[#C7F36B]">
                    Inflection Zone
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Band Metric Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left Column: Metric Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white p-5 rounded-xl border border-[#DCCEFF] shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono-stat uppercase tracking-wider text-[#6C3BFF] font-semibold">
                  Cohort Profile
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#DCCEFF]/60 text-[#24113F]">
                  {selectedBand.n.toLocaleString()} Students
                </span>
              </div>
              <h3 className="font-editorial text-2xl font-bold text-[#24113F] mb-1">
                {currentDesc.archetype}
              </h3>
              <p className="text-sm text-[#29252F] mb-4 leading-normal">
                {currentDesc.summary}
              </p>

              <div className="p-3 bg-[#DCCEFF]/20 rounded-lg border border-[#6C3BFF]/20 mb-4">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-[#6C3BFF] shrink-0 mt-0.5" />
                  <p className="text-xs text-[#29252F] leading-normal">
                    <strong className="text-[#24113F]">Critical Nuance:</strong> {currentDesc.risk}
                  </p>
                </div>
              </div>

              {/* 4 Metric Chips */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#F8F6FC] p-3 rounded-lg border border-[#DCCEFF]">
                  <span className="text-[11px] text-[#29252F]/70 block mb-0.5">Skill Retention</span>
                  <div className="text-xl font-bold font-mono-stat text-[#24113F]">
                    {selectedBand.mean_skill_retention.toFixed(1)}%
                  </div>
                  <span className="text-[10px] text-[#29252F]/70 block mt-0.5">
                    {selectedBandIndex === 4 ? '▼ -6.8% vs peak' : '0–100 scale'}
                  </span>
                </div>

                <div className="bg-[#F8F6FC] p-3 rounded-lg border border-[#DCCEFF]">
                  <span className="text-[11px] text-[#29252F]/70 block mb-0.5">Perceived Dependency</span>
                  <div className="text-xl font-bold font-mono-stat text-[#6C3BFF]">
                    {selectedBand.mean_dependency.toFixed(2)} / 10
                  </div>
                  <span className="text-[10px] text-[#29252F]/70 block mt-0.5">
                    {selectedBandIndex === 4 ? '▲ +160% vs 0–2h' : 'Self-reported'}
                  </span>
                </div>

                <div className="bg-[#F8F6FC] p-3 rounded-lg border border-[#DCCEFF]">
                  <span className="text-[11px] text-[#29252F]/70 block mb-0.5">Mean GPA Change</span>
                  <div className="text-xl font-bold font-mono-stat text-[#24113F]">
                    +{selectedBand.mean_gpa_change.toFixed(3)}
                  </div>
                  <span className="text-[10px] text-[#29252F]/70 block mt-0.5">
                    Post GPA: {selectedBand.mean_post_gpa.toFixed(2)}
                  </span>
                </div>

                <div className="bg-[#F8F6FC] p-3 rounded-lg border border-[#DCCEFF]">
                  <span className="text-[11px] text-[#29252F]/70 block mb-0.5">Exam Anxiety</span>
                  <div className="text-xl font-bold font-mono-stat text-[#24113F]">
                    {selectedBand.mean_exam_anxiety.toFixed(2)} / 10
                  </div>
                  <span className="text-[10px] text-[#29252F]/70 block mt-0.5">
                    {selectedBandIndex === 4 ? '▲ +47% vs minimalists' : 'Self-reported'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Comparative Interactive Chart */}
          <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-[#DCCEFF] shadow-2xs">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div>
                <h4 className="font-editorial text-lg font-bold text-[#24113F]">
                  Cross-Band Comparison Across 50,000 Students
                </h4>
                <p className="text-xs text-[#29252F]/70">
                  Visualizing how outcomes evolve across weekly GenAI study time
                </p>
              </div>

              {/* Chart Metric Toggle */}
              <div className="inline-flex rounded-lg border border-[#DCCEFF] p-0.5 bg-[#F8F6FC] text-xs">
                <button
                  id="metric-retention-btn"
                  onClick={() => setActiveChartMetric('retention_vs_dep')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    activeChartMetric === 'retention_vs_dep'
                      ? 'bg-[#6C3BFF] font-semibold text-white shadow-2xs'
                      : 'text-[#29252F] hover:text-[#24113F]'
                  }`}
                >
                  Retention vs Dependency
                </button>
                <button
                  id="metric-anxiety-btn"
                  onClick={() => setActiveChartMetric('anxiety')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    activeChartMetric === 'anxiety'
                      ? 'bg-[#6C3BFF] font-semibold text-white shadow-2xs'
                      : 'text-[#29252F] hover:text-[#24113F]'
                  }`}
                >
                  Exam Anxiety
                </button>
                <button
                  id="metric-gpa-btn"
                  onClick={() => setActiveChartMetric('gpa_change')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    activeChartMetric === 'gpa_change'
                      ? 'bg-[#6C3BFF] font-semibold text-white shadow-2xs'
                      : 'text-[#29252F] hover:text-[#24113F]'
                  }`}
                >
                  GPA Gain
                </button>
              </div>
            </div>

            {/* Recharts Container */}
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                {activeChartMetric === 'retention_vs_dep' ? (
                  <BarChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#DCCEFF" />
                    <XAxis dataKey="band" tick={{ fontSize: 11, fill: '#29252F' }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#29252F' }} />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white p-3 rounded-lg border border-[#DCCEFF] shadow-md text-xs">
                              <p className="font-bold text-[#24113F] mb-1">{label}</p>
                              <p className="text-[#29252F]">
                                Skill Retention: <strong className="font-mono-stat">{data.retention.toFixed(1)}%</strong>
                              </p>
                              <p className="text-[#6C3BFF]">
                                Perceived Dependency: <strong className="font-mono-stat">{(data.dependency / 10).toFixed(2)} / 10</strong>
                              </p>
                              <p className="text-[#29252F]/70 mt-1">Cohort size: {data.students.toLocaleString()} students</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                    <Bar name="Skill Retention Score (0–100)" dataKey="retention" fill="#24113F" radius={[4, 4, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={index === selectedBandIndex ? '#6C3BFF' : index === 4 ? '#24113F' : '#6C3BFF/60'}
                        />
                      ))}
                    </Bar>
                    <Bar name="Perceived Dependency (Scaled ×10)" dataKey="dependency" fill="#C7F36B" stroke="#6C3BFF" strokeWidth={1} radius={[4, 4, 0, 0]} />
                  </BarChart>
                ) : activeChartMetric === 'anxiety' ? (
                  <LineChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#DCCEFF" />
                    <XAxis dataKey="band" tick={{ fontSize: 11, fill: '#29252F' }} />
                    <YAxis domain={[2, 7]} tick={{ fontSize: 11, fill: '#29252F' }} />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white p-3 rounded-lg border border-[#DCCEFF] shadow-md text-xs">
                              <p className="font-bold text-[#24113F] mb-1">{label}</p>
                              <p className="text-[#24113F]">
                                Exam Anxiety: <strong className="font-mono-stat">{(data.anxiety / 10).toFixed(2)} / 10</strong>
                              </p>
                              <p className="text-[#29252F]/70 mt-1">Cohort size: {data.students.toLocaleString()}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                    <Line
                      type="monotone"
                      name="Exam Anxiety Level (1–10)"
                      dataKey={(d) => d.anxiety / 10}
                      stroke="#6C3BFF"
                      strokeWidth={3}
                      dot={{ r: 5, fill: '#C7F36B', stroke: '#6C3BFF', strokeWidth: 2 }}
                    />
                  </LineChart>
                ) : (
                  <BarChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#DCCEFF" />
                    <XAxis dataKey="band" tick={{ fontSize: 11, fill: '#29252F' }} />
                    <YAxis domain={[0, 0.3]} tick={{ fontSize: 11, fill: '#29252F' }} />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white p-3 rounded-lg border border-[#DCCEFF] shadow-md text-xs">
                              <p className="font-bold text-[#24113F] mb-1">{label}</p>
                              <p className="text-[#6C3BFF]">
                                Mean GPA Change: <strong className="font-mono-stat">+{ (data.gpaChange / 100).toFixed(3) }</strong>
                              </p>
                              <p className="text-[#29252F]">Post GPA: {data.postGpa.toFixed(2)}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                    <Bar
                      name="Mean GPA Change (Semester Gain)"
                      dataKey={(d) => d.gpaChange / 100}
                      fill="#6C3BFF"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>

            {/* Chart Caption */}
            <div className="mt-3 pt-3 border-t border-[#DCCEFF] flex items-center justify-between text-[11px] text-[#29252F]/70">
              <span>Source: Supplied 50,000-student exploratory dataset</span>
              <span className="font-mono-stat font-semibold text-[#6C3BFF]">Inflection threshold: &gt;20 hrs/week</span>
            </div>
          </div>
        </div>

        {/* Narrative Synthesis Takeaways Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-white border border-[#DCCEFF] shadow-2xs">
            <div className="flex items-center space-x-2 text-[#24113F] font-semibold text-sm mb-1">
              <Sparkles className="w-4 h-4 text-[#6C3BFF]" />
              <span>1. The Accelerator Window (2–10 hrs)</span>
            </div>
            <p className="text-xs text-[#29252F] leading-relaxed">
              When used as an assistive tool for targeted friction points (syntax debugging, literature summarization), 
              students maintain higher retention (77.08%) and positive GPA momentum without sacrificing cognitive independence.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#DCCEFF] shadow-2xs">
            <div className="flex items-center space-x-2 text-[#24113F] font-semibold text-sm mb-1">
              <Clock className="w-4 h-4 text-[#6C3BFF]" />
              <span>2. Time Displacement (-0.157 r)</span>
            </div>
            <p className="text-xs text-[#29252F] leading-relaxed">
              Higher AI hours modestly reduce traditional unassisted study time. While this speeds up assignment deadlines, 
              it cuts into the repetitive problem-solving iterations needed for deep memory encoding.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#DCCEFF] shadow-2xs">
            <div className="flex items-center space-x-2 text-[#24113F] font-semibold text-sm mb-1">
              <Brain className="w-4 h-4 text-[#6C3BFF]" />
              <span>3. The Examination Void (&gt;20 hrs)</span>
            </div>
            <p className="text-xs text-[#29252F] leading-relaxed">
              Students logging &gt;20 hours report the highest exam anxiety (5.62/10). In qualitative interviews, students describe 
              a 'blank page freeze' during closed-book assessments when the external AI reasoning engine is removed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
