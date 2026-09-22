import React, { useState } from 'react';
import { ExternalEvidenceItem } from '../types/research';
import { ExternalLink, Filter, Building2, Globe, ShieldAlert, Award } from 'lucide-react';

interface ExternalBenchmarksProps {
  evidence: ExternalEvidenceItem[];
}

export const ExternalBenchmarks: React.FC<ExternalBenchmarksProps> = ({ evidence }) => {
  const [selectedTheme, setSelectedTheme] = useState<string>('all');

  const themes = [
    { id: 'all', label: 'All Benchmarks' },
    { id: 'adoption', label: 'Adoption Rates' },
    { id: 'academic integrity', label: 'Academic Integrity' },
    { id: 'perceived benefit', label: 'Perceived Benefits' },
    { id: 'institutional context', label: 'Institutional Policy' },
    { id: 'India', label: 'India / Regional Context' }
  ];

  const filteredEvidence = selectedTheme === 'all'
    ? evidence
    : evidence.filter((e) => e.theme.toLowerCase().includes(selectedTheme.toLowerCase()));

  return (
    <section id="benchmarks-section" className="py-16 border-b border-[#DCCEFF] bg-[#F8F6FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center space-x-2 text-xs font-mono-stat uppercase tracking-wider text-[#24113F] mb-2 font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#6C3BFF]"></span>
            <span>Narrative Direction 4 &bull; Real-World Benchmarks</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl font-normal text-[#24113F] tracking-tight mb-4">
            External Study-Level Evidence Matrix
          </h2>
          <p className="text-[#29252F] text-base sm:text-lg leading-relaxed">
            To prevent relying exclusively on the supplied 50,000-student model, 
            this research benchmarks exploratory patterns against published studies from HEPI (UK), Jisc, and Indian institutional surveys (FICCI / Bodhi Journals).
          </p>
        </div>

        {/* The Institutional Support Gap Visual Strip */}
        <div className="bg-white p-6 rounded-xl border border-[#DCCEFF] mb-10 shadow-2xs">
          <div className="flex items-center space-x-2 text-xs font-mono-stat uppercase tracking-wider text-[#6C3BFF] font-semibold mb-2">
            <Building2 className="w-4 h-4 text-[#6C3BFF]" />
            <span>The Central Institutional Paradox</span>
          </div>
          <h3 className="font-editorial text-2xl font-bold text-[#24113F] mb-4">
            Adoption Surges While Training Lags Behind
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl bg-[#F8F6FC] border border-[#DCCEFF]">
              <span className="text-xs text-[#29252F]/70 block mb-1">Student AI Use (HEPI 2026)</span>
              <div className="text-3xl font-bold font-editorial text-[#24113F]">
                95%
              </div>
              <p className="text-xs text-[#29252F] mt-2">
                Nearly universal adoption: 94% use GenAI specifically to help with assessed academic work.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F8F6FC] border border-[#DCCEFF]">
              <span className="text-xs text-[#29252F]/70 block mb-1">Direct Text Injection (HEPI 2026)</span>
              <div className="text-3xl font-bold font-editorial text-rose-600">
                12%
              </div>
              <p className="text-xs text-[#29252F] mt-2">
                One in eight students admit directly copying unedited AI generated text into submissions.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F8F6FC] border border-[#DCCEFF]">
              <span className="text-xs text-[#29252F]/70 block mb-1">Institutional Training (HEPI 2025)</span>
              <div className="text-3xl font-bold font-editorial text-[#6C3BFF]">
                Only 36%
              </div>
              <p className="text-xs text-[#29252F] mt-2">
                Under two-fifths of students report having received formal guidance or training from their university.
              </p>
            </div>
          </div>
        </div>

        {/* Theme Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-xs font-semibold text-[#24113F] mr-2 flex items-center">
            <Filter className="w-3.5 h-3.5 mr-1 text-[#6C3BFF]" /> Filter Theme:
          </span>
          {themes.map((t) => (
            <button
              key={t.id}
              id={`filter-theme-${t.id}`}
              onClick={() => setSelectedTheme(t.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedTheme === t.id
                  ? 'bg-[#24113F] text-[#C7F36B] shadow-xs'
                  : 'bg-white text-[#29252F] hover:bg-[#DCCEFF]/30 border border-[#DCCEFF]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Benchmarks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEvidence.map((item, idx) => (
            <div
              key={`${item.source}-${idx}`}
              className="bg-white p-5 rounded-xl border border-[#DCCEFF] shadow-2xs hover:border-[#6C3BFF] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-mono-stat px-2 py-0.5 rounded-md bg-[#DCCEFF]/50 text-[#24113F] font-semibold">
                    {item.year}
                  </span>
                  <span className="text-[11px] font-semibold text-[#6C3BFF] uppercase tracking-wide">
                    {item.theme}
                  </span>
                </div>

                <h3 className="font-editorial text-lg font-bold text-[#24113F] leading-snug mb-1">
                  {item.metric}
                </h3>
                <div className="font-editorial text-2xl font-bold text-[#24113F] my-2">
                  <span className="bg-[#C7F36B] text-[#24113F] px-2 py-0.5 rounded-md inline-block">
                    {item.value}
                  </span>
                </div>

                <p className="text-xs text-[#29252F] mb-3 line-clamp-3">
                  {item.population}
                </p>
              </div>

              <div className="pt-3 border-t border-[#DCCEFF] mt-2">
                <div className="text-[11px] text-[#29252F] mb-2">
                  <strong className="text-[#24113F]">Analytical Use:</strong> {item.use}
                </div>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs font-semibold text-[#6C3BFF] hover:text-[#24113F] transition-colors"
                >
                  <span>{item.source}</span>
                  <ExternalLink className="w-3 h-3 ml-1 text-[#6C3BFF]" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
