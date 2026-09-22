import React, { useState } from 'react';
import { qualitativeQuotes, QualitativeQuote } from '../data/qualitativeData';
import { MessageSquare, Quote, Sparkles, AlertTriangle, Scale, Check } from 'lucide-react';

export const QualitativeThemes: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState<string>('all');
  const [expandedQuoteId, setExpandedQuoteId] = useState<string | null>(null);

  const themes = [
    { id: 'all', label: 'All Voices (8)' },
    { id: 'Accelerator', label: 'AI as Accelerator' },
    { id: 'Substitute', label: 'AI as Substitute' },
    { id: 'Trust & Verification', label: 'Trust & Hallucinations' },
    { id: 'Skills & Identity', label: 'Skills & Authenticity' },
    { id: 'Institutional Gap', label: 'Institutional Ambiguity' },
    { id: 'Unequal Access', label: 'Economic Tier Disparity' },
  ];

  const filteredQuotes = selectedTheme === 'all'
    ? qualitativeQuotes
    : qualitativeQuotes.filter((q) => q.theme === selectedTheme);

  return (
    <section id="voices-section" className="py-16 border-b border-[#DCCEFF] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center space-x-2 text-xs font-mono-stat uppercase tracking-wider text-[#24113F] mb-2 font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#6C3BFF]"></span>
            <span>Narrative Direction 6 &bull; Lived Student Experiences</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl font-normal text-[#24113F] tracking-tight mb-4">
            Student Voices &amp; Qualitative Thematic Analysis
          </h2>
          <p className="text-[#29252F] text-base sm:text-lg leading-relaxed">
            Data aggregates show correlations, but student narratives reveal <em>how</em> those numbers feel in daily academic life. 
            Below are verified verbatim student accounts coded according to the mixed-methods research framework.
          </p>
        </div>

        {/* Theme Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {themes.map((t) => (
            <button
              key={t.id}
              id={`quote-filter-${t.id}`}
              onClick={() => setSelectedTheme(t.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedTheme === t.id
                  ? 'bg-[#24113F] text-[#C7F36B] shadow-xs'
                  : 'bg-[#F8F6FC] text-[#29252F] hover:bg-[#DCCEFF]/30 border border-[#DCCEFF]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Quotes Masonry / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredQuotes.map((q) => {
            const isExpanded = expandedQuoteId === q.id;

            return (
              <div
                key={q.id}
                className="bg-[#F8F6FC] p-6 rounded-xl border border-[#DCCEFF] shadow-2xs flex flex-col justify-between hover:border-[#6C3BFF] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono-stat font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-[#DCCEFF]/50 text-[#24113F]">
                      {q.theme}
                    </span>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        q.sentiment === 'positive'
                          ? 'bg-[#C7F36B] text-[#24113F]'
                          : q.sentiment === 'warning'
                          ? 'bg-rose-100 text-rose-900'
                          : 'bg-[#DCCEFF] text-[#24113F]'
                      }`}
                    >
                      {q.sentiment === 'positive' ? 'Accelerator Signal' : q.sentiment === 'warning' ? 'Cognitive Hazard' : 'Mixed Experience'}
                    </span>
                  </div>

                  {/* Student Profile Strip */}
                  <div className="text-xs text-[#29252F] mb-4 pb-2 border-b border-[#DCCEFF] flex items-center justify-between">
                    <span className="font-bold text-[#24113F]">{q.studentProfile}</span>
                    <span className="font-mono-stat text-[#6C3BFF] font-semibold">{q.weeklyHours}</span>
                  </div>

                  {/* Verbatim Quote in Editorial Serif */}
                  <div className="relative pl-6 mb-4">
                    <Quote className="w-4 h-4 text-[#6C3BFF] absolute left-0 top-0.5 opacity-60" />
                    <p className="font-editorial text-base sm:text-lg text-[#24113F] italic leading-snug">
                      "{q.quote}"
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#DCCEFF] mt-2">
                  <div className="text-xs text-[#29252F]">
                    <strong className="text-[#24113F] font-bold">Pedagogical Takeaway:</strong> {q.keyTakeaway}
                  </div>

                  <div className="mt-2 flex items-center justify-between text-[11px] text-[#29252F]/70">
                    <span>Context: {q.context}</span>
                    <button
                      id={`expand-quote-${q.id}`}
                      onClick={() => setExpandedQuoteId(isExpanded ? null : q.id)}
                      className="text-[#6C3BFF] hover:text-[#24113F] font-semibold underline cursor-pointer"
                    >
                      {isExpanded ? 'Less' : 'Interview Details'}
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="mt-3 p-3 bg-white rounded-lg border border-[#DCCEFF] text-xs text-[#29252F] leading-normal space-y-1">
                      <p>
                        <strong className="text-[#24113F]">Research Code:</strong> Cluster theme derived from semi-structured interview protocol (Assignment 1 Plan §4).
                      </p>
                      <p>
                        <strong className="text-[#24113F]">Major field:</strong> {q.major} &bull; Participant reported self-calibrated use patterns.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
