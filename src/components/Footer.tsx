import React from 'react';
import { Database, ShieldCheck, ArrowUp, Sparkles, BookOpen, Share2, Compass, Sun, Moon, Smartphone, Monitor } from 'lucide-react';
import { useTheme } from '../ThemeContext';

interface FooterProps {
  onOpenProvenance: () => void;
  onOpenResearchPack?: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenProvenance }) => {
  const { theme, toggleTheme, viewMode, toggleViewMode } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#24113F] text-[#DCCEFF] py-14 border-t border-[#6C3BFF]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
          {/* Main Website Identity & Mission */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center space-x-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#6C3BFF] text-white flex items-center justify-center font-editorial font-bold text-sm shadow-xs">
                Ψ
              </div>
              <span className="font-editorial text-xl font-bold text-white tracking-tight">
                The Student-AI Spectrum
              </span>
            </div>
            <p className="text-xs text-[#DCCEFF]/80 leading-relaxed max-w-sm">
              An independent exploratory platform examining how artificial intelligence technologies 
              and algorithmic social media ecosystems are reshaping student cognition, attention spans, 
              and higher education outcomes.
            </p>
            <div className="text-[11px] text-[#DCCEFF]/50 font-mono-stat">
              Synthesizing 50,000 student records with real-world empirical benchmarks (HEPI, Jisc, FICCI).
            </div>

            {/* Quick Preference Switchers in Footer */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <button
                id="footer-theme-toggle-btn"
                onClick={toggleTheme}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#2D164D] hover:bg-[#6C3BFF] text-white text-xs font-semibold transition-colors cursor-pointer border border-[#6C3BFF]/30"
              >
                {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-[#C7F36B]" /> : <Moon className="w-3.5 h-3.5 text-[#C7F36B]" />}
                <span>{theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}</span>
              </button>
              <button
                id="footer-view-toggle-btn"
                onClick={toggleViewMode}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#2D164D] hover:bg-[#6C3BFF] text-white text-xs font-semibold transition-colors cursor-pointer border border-[#6C3BFF]/30"
              >
                {viewMode === 'desktop' ? <Smartphone className="w-3.5 h-3.5 text-[#C7F36B]" /> : <Monitor className="w-3.5 h-3.5 text-[#C7F36B]" />}
                <span>{viewMode === 'desktop' ? 'Mobile View' : 'Desktop View'}</span>
              </button>
            </div>
          </div>

          {/* Research & Data Story Sections */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-mono-stat uppercase tracking-wider text-[#C7F36B] font-bold mb-3">
              Explore Sections
            </h4>
            <ul className="text-xs space-y-2.5">
              <li>
                <a href="#spectrum-section" className="text-[#DCCEFF]/80 hover:text-[#C7F36B] transition-colors">
                  AI Study Intensity Spectrum (0–40h)
                </a>
              </li>
              <li>
                <a href="#use-cases-section" className="text-[#DCCEFF]/80 hover:text-[#C7F36B] transition-colors">
                  Tutor or Shortcut: 5 Academic Tasks
                </a>
              </li>
              <li>
                <a href="#trade-offs-section" className="text-[#DCCEFF]/80 hover:text-[#C7F36B] transition-colors">
                  Trade-off Correlation Matrix
                </a>
              </li>
              <li>
                <a href="#benchmarks-section" className="text-[#DCCEFF]/80 hover:text-[#C7F36B] transition-colors">
                  External Benchmarks (HEPI &amp; Jisc)
                </a>
              </li>
              <li>
                <a href="#impact-matrix-section" className="text-[#C7F36B] hover:text-white transition-colors font-medium">
                  AI &amp; Social Media Impact Matrix &rarr;
                </a>
              </li>
              <li>
                <a href="#conclusion-section" className="text-[#C7F36B] hover:text-white transition-colors font-medium">
                  The Path Forward (Conclusion) &rarr;
                </a>
              </li>
              <li>
                <a href="#tools-section" className="text-[#C7F36B] hover:text-white transition-colors font-medium">
                  Design &amp; AI Student Toolkit &rarr;
                </a>
              </li>
            </ul>
          </div>

          {/* About The Platform & Scientific Ethics */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono-stat uppercase tracking-wider text-[#C7F36B] font-bold mb-1">
              About This Platform
            </h4>
            <p className="text-xs text-[#DCCEFF]/80 leading-relaxed">
              Designed as an open educational resource to help students, educators, and researchers navigate the 
              balance between technological leverage and cognitive autonomy. We advocate for intentional, 
              inquiry-driven tool adoption over passive academic offloading.
            </p>
            <div className="pt-2 space-y-2 text-xs">
              <a
                href="#self-test-section"
                className="text-[#DCCEFF] hover:text-[#C7F36B] block transition-colors flex items-center space-x-1.5"
              >
                <span>&bull;</span>
                <span>Interactive Self-Reflection Diagnostic</span>
              </a>
              <button
                id="footer-provenance-btn"
                onClick={onOpenProvenance}
                className="text-[#C7F36B] hover:underline block transition-colors flex items-center space-x-1.5 font-semibold pt-1 cursor-pointer"
              >
                <Database className="w-3.5 h-3.5" />
                <span>Dataset Provenance &amp; Non-Causal Ethics Declaration</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="pt-6 border-t border-[#6C3BFF]/20 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#DCCEFF]/50 gap-3">
          <p>
            The Student-AI Spectrum &bull; Empowering Thoughtful, Autonomous Learning in an Algorithmic World
          </p>
          <button
            id="back-to-top-btn"
            onClick={scrollToTop}
            className="inline-flex items-center space-x-1.5 text-[#C7F36B] hover:text-white font-semibold transition-colors cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
