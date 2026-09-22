import React from 'react';
import { ArrowDown, AlertTriangle, ShieldCheck, Database, Award, ExternalLink } from 'lucide-react';
import coverImage from '../assets/images/ai_student_cover_1790057853907.jpg';

interface HeroSectionProps {
  onExplore: () => void;
  onOpenProvenance: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExplore, onOpenProvenance }) => {
  return (
    <section id="overview-section" className="pt-6 sm:pt-8 pb-16 border-b border-[#DCCEFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Cover Banner - Placed above the first heading, fitting the website width */}
        <div className="w-full mb-8 sm:mb-10 rounded-2xl sm:rounded-3xl overflow-hidden border border-[#DCCEFF] shadow-xl relative group bg-[#24113F]">
          <div className="aspect-[16/9] sm:aspect-[21/9] max-h-[500px] w-full overflow-hidden">
            <img
              src={coverImage}
              alt="Students collaborating with AI in modern education"
              className="w-full h-full object-cover object-center transform group-hover:scale-[1.01] transition-transform duration-700 ease-out"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#24113F]/75 via-[#24113F]/15 to-transparent pointer-events-none" />
          <div className="absolute bottom-3 left-4 sm:bottom-5 sm:left-6 right-4 flex flex-wrap items-center justify-between text-white text-xs font-mono-stat pointer-events-none gap-2">
            <span className="bg-[#24113F]/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#DCCEFF]/30 text-[#C7F36B] font-semibold">
              Cover Feature &bull; The Digital Learning Frontier
            </span>
            <span className="hidden sm:inline-block bg-[#24113F]/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#DCCEFF]/20 text-[#DCCEFF] text-[11px]">
              Empirical Research &bull; 50,000 Students &bull; 2025–2026
            </span>
          </div>
        </div>

        {/* Topic Badge */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#DCCEFF]/60 text-[#24113F] border border-[#6C3BFF]/20">
            Higher Education Research &bull; 2025–2026
          </span>
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-[#C7F36B] text-[#24113F] border border-[#C7F36B]">
            Exploratory Data Story
          </span>
          <button
            id="provenance-badge-btn"
            onClick={onOpenProvenance}
            className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-medium text-[#29252F] hover:text-[#24113F] hover:bg-white transition-colors border border-[#DCCEFF] cursor-pointer"
          >
            <Database className="w-3 h-3 text-[#6C3BFF]" />
            <span>50,000-Row Dataset Provenance Note</span>
          </button>
        </div>

        {/* Main Headline */}
        <div className="max-w-4xl">
          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#24113F] leading-[1.12] mb-6">
            AI &amp; the Student: <br />
            <span className="italic font-light text-[#6C3BFF]">
              Learning Accelerator
            </span>{' '}
            or{' '}
            <span className="italic font-light text-[#24113F]">
              Learning Substitute?
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-[#29252F] leading-relaxed max-w-3xl mb-8">
            Generative AI has swept higher education, but its impact is not a simple dichotomy of helpful or harmful. 
            This interactive data story explores how <strong>50,000 students</strong> navigate the trade-offs between rapid task completion, 
            cognitive retention, study time displacement, and psychological dependence.
          </p>
        </div>

        {/* Key Benchmark Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 my-8">
          <div className="bg-white p-4 rounded-xl border border-[#DCCEFF] shadow-2xs">
            <span className="text-[11px] font-mono-stat uppercase tracking-wider text-[#29252F]/70 block mb-1">
              Sample Analyzed
            </span>
            <div className="font-editorial text-2xl sm:text-3xl font-semibold text-[#24113F]">
              50,000
            </div>
            <p className="text-xs text-[#29252F]/80 mt-1">
              Cleaned student records across 5 academic majors
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-[#DCCEFF] shadow-2xs">
            <span className="text-[11px] font-mono-stat uppercase tracking-wider text-[#29252F]/70 block mb-1">
              HEPI 2026 Benchmark
            </span>
            <div className="font-editorial text-2xl sm:text-3xl font-semibold text-[#24113F]">
              95%
            </div>
            <p className="text-xs text-[#29252F]/80 mt-1">
              UK students using AI in at least one academic way
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-[#DCCEFF] shadow-2xs">
            <span className="text-[11px] font-mono-stat uppercase tracking-wider text-[#29252F]/70 block mb-1">
              Experience Impact
            </span>
            <div className="font-editorial text-2xl sm:text-3xl font-semibold text-[#24113F]">
              49% vs 16%
            </div>
            <p className="text-xs text-[#29252F]/80 mt-1">
              Reported student experience improved vs worsened
            </p>
          </div>

          <div className="bg-[#24113F] p-4 rounded-xl border border-[#24113F] shadow-sm">
            <span className="text-[11px] font-mono-stat uppercase tracking-wider text-[#DCCEFF] block mb-1 font-semibold">
              Dependency Surge
            </span>
            <div className="font-editorial text-2xl sm:text-3xl font-bold text-[#C7F36B]">
              +0.665 r
            </div>
            <p className="text-xs text-[#F8F6FC]/80 mt-1">
              Correlation: weekly GenAI hours &amp; perceived reliance
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-[#DCCEFF] shadow-2xs col-span-2 sm:col-span-1">
            <span className="text-[11px] font-mono-stat uppercase tracking-wider text-[#29252F]/70 block mb-1">
              Study Substitution
            </span>
            <div className="font-editorial text-2xl sm:text-3xl font-semibold text-[#24113F]">
              -0.157 r
            </div>
            <p className="text-xs text-[#29252F]/80 mt-1">
              Correlation: GenAI hours &amp; traditional study hours
            </p>
          </div>
        </div>

        {/* Critical Methodology Caution Card */}
        <div className="bg-[#DCCEFF]/30 border border-[#6C3BFF]/30 rounded-xl p-4 sm:p-5 mb-8">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-[#6C3BFF] shrink-0 mt-0.5" />
            <div className="text-sm text-[#24113F]">
              <strong className="font-semibold block text-[#24113F] mb-0.5">
                Core Research Caution &bull; Association, Not Direct Causation
              </strong>
              <p className="text-[#29252F] leading-normal">
                Correlation in this dataset does <strong>not</strong> prove that AI caused a decline in GPA, retention, or an increase in anxiety.
                Pre-semester and post-semester GPA share a high baseline correlation (<em>r = 0.927</em>), meaning post-semester GPA cannot be attributed solely to AI.
                All findings represent descriptive self-reports and exploratory trends.
              </p>
            </div>
          </div>
        </div>

        {/* Exploration Action Bar */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            id="start-exploring-btn"
            onClick={onExplore}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-[#6C3BFF] text-white hover:bg-[#582be6] transition-colors text-sm font-semibold shadow-xs cursor-pointer"
          >
            <span>Explore the 5 Usage Bands</span>
            <ArrowDown className="w-4 h-4" />
          </button>

          <a
            id="jump-to-use-cases-btn"
            href="#use-cases-section"
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-lg border border-[#DCCEFF] bg-white text-[#24113F] hover:bg-[#DCCEFF]/30 hover:border-[#6C3BFF] transition-colors text-sm font-medium shadow-xs"
          >
            <span>Tutor vs. Shortcut Matrix</span>
          </a>

          <a
            id="jump-to-self-test-btn"
            href="#self-test-section"
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-lg border border-[#C7F36B] bg-[#C7F36B] text-[#24113F] hover:bg-[#b5ea52] transition-colors text-sm font-bold shadow-xs"
          >
            <span>Take the Self-Reflection Assessment</span>
          </a>
        </div>
      </div>
    </section>
  );
};
