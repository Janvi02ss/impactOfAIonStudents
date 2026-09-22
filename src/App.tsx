import React, { useState, useEffect } from 'react';
import researchDataRaw from './data/researchData.json';
import { ResearchDataset } from './types/research';
import { Navbar } from './components/Navbar';
import { SideNav } from './components/SideNav';
import { HeroSection } from './components/HeroSection';
import { HoursSpectrumSection } from './components/HoursSpectrumSection';
import { UseCasesSection } from './components/UseCasesSection';
import { CorrelationExplorer } from './components/CorrelationExplorer';
import { ExternalBenchmarks } from './components/ExternalBenchmarks';
import { QualitativeThemes } from './components/QualitativeThemes';
import { DemographicAnalysis } from './components/DemographicAnalysis';
import { SelfReflectionTool } from './components/SelfReflectionTool';
import { AIImpactAndSocialMedia } from './components/AIImpactAndSocialMedia';
import { ConcludingSection } from './components/ConcludingSection';
import { AIToolsSection } from './components/AIToolsSection';
import { Footer } from './components/Footer';
import { ProvenanceModal } from './components/ProvenanceModal';
import { NAV_SECTIONS } from './data/navigationSections';
import { useTheme } from './ThemeContext';
import { Smartphone, Monitor, Sun, Moon } from 'lucide-react';

const data = researchDataRaw as unknown as ResearchDataset;

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [provenanceModalOpen, setProvenanceModalOpen] = useState<boolean>(false);
  const { isSimulatedMobile, toggleViewMode, theme, toggleTheme } = useTheme();

  // Track active section on scroll using IntersectionObserver
  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      // Find the entry with highest intersection ratio or top intersecting
      const intersectingEntries = entries.filter((entry) => entry.isIntersecting);
      if (intersectingEntries.length > 0) {
        // Find which NAV_SECTION matches this element
        const visibleElement = intersectingEntries[0].target;
        const matchingSection = NAV_SECTIONS.find(
          (section) => section.targetId === visibleElement.id
        );
        if (matchingSection) {
          setActiveSection(matchingSection.id);
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '-15% 0px -65% 0px', // Triggers when section is near the upper-middle of viewport
      threshold: [0, 0.2, 0.5],
    });

    NAV_SECTIONS.forEach((section) => {
      const el = document.getElementById(section.targetId);
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Smooth scroll handler
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const matchingSection = NAV_SECTIONS.find((sec) => sec.id === sectionId);
    const targetElId = matchingSection ? matchingSection.targetId : `${sectionId}-section`;

    const el = document.getElementById(targetElId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isSimulatedMobile ? 'bg-[#180A2E] py-0 sm:py-6 px-0 sm:px-4' : 'bg-[#F8F6FC] dark:bg-[#0F071D]'}`}>
      {/* Mobile Simulation Notice Bar (Visible on desktop when mobile mode is simulated) */}
      {isSimulatedMobile && (
        <aside aria-label="Mobile preview simulator banner" className="hidden sm:flex max-w-[440px] mx-auto mb-3 items-center justify-between px-3.5 py-1.5 bg-[#24113F] text-white text-xs rounded-xl border border-[#DCCEFF]/30 shadow-lg">
          <div className="flex items-center space-x-1.5">
            <Smartphone className="w-3.5 h-3.5 text-[#C7F36B]" />
            <span className="font-semibold">Mobile Mode Active</span>
            <span className="text-[#DCCEFF]/70 text-[10px]">(390px)</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-1 rounded hover:bg-[#3D2266] text-[#C7F36B] transition-colors cursor-pointer"
              title="Toggle theme in mobile view"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={toggleViewMode}
              className="px-2 py-0.5 rounded bg-[#C7F36B] hover:bg-[#b4ea54] text-[#24113F] font-bold text-[11px] transition-colors cursor-pointer inline-flex items-center space-x-1"
            >
              <Monitor className="w-3 h-3 text-[#24113F]" />
              <span>Desktop View</span>
            </button>
          </div>
        </aside>
      )}

      {/* Main Container Wrapper */}
      <div 
        className={`min-h-screen flex flex-col bg-[#F8F6FC] dark:bg-[#0F071D] text-[#29252F] dark:text-[#E2DAF0] selection:bg-[#C7F36B] selection:text-[#24113F] relative transition-all duration-300 ${
          isSimulatedMobile
            ? 'sm:max-w-[430px] sm:mx-auto sm:rounded-[36px] sm:border-[8px] sm:border-[#24113F] sm:dark:border-[#3D2266] sm:shadow-2xl sm:overflow-hidden sm:min-h-[844px]'
            : 'w-full'
        }`}
      >
        {/* Dynamic Island / Speaker Notch for simulated phone on desktop */}
        {isSimulatedMobile && (
          <div className="hidden sm:flex justify-center items-center py-2 bg-[#24113F] dark:bg-[#1A0D31] text-white border-b border-[#3D2266]/40">
            <div className="w-24 h-3.5 bg-black/50 rounded-full flex items-center justify-center space-x-1.5 px-2">
              <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
              <div className="w-6 h-1 bg-white/20 rounded-full" />
            </div>
          </div>
        )}

        {/* Top Navigation Bar with Unstacked Brand & Controls */}
        <Navbar
          activeSection={activeSection}
          onNavigate={handleNavigate}
          onOpenProvenance={() => setProvenanceModalOpen(true)}
        />

        {/* Floating Side Navigation Ribbon (Dots for each section) */}
        <SideNav
          activeSection={activeSection}
          onNavigate={handleNavigate}
        />

        <main className="flex-1">
          {/* 1. Hero & Research Framing */}
          <HeroSection
            onExplore={() => handleNavigate('spectrum')}
            onOpenProvenance={() => setProvenanceModalOpen(true)}
          />

          {/* 2. Narrative Direction 1: The AI Study Intensity Spectrum */}
          <HoursSpectrumSection hoursBands={data.hoursBands} />

          {/* 3. Narrative Direction 2: Tutor or Shortcut (5 Use Cases) */}
          <UseCasesSection useCases={data.useCases} />

          {/* 4. Narrative Direction 3: Correlation Matrix & Trade-offs */}
          <CorrelationExplorer
            correlations={data.correlationMatrix}
            variables={data.correlationVariables}
          />

          {/* 5. Narrative Direction 4: Real-World Benchmarks & Support Gap */}
          <ExternalBenchmarks evidence={data.externalEvidence} />

          {/* 6. Narrative Direction 6: Student Voices & Qualitative Codes */}
          <QualitativeThemes />

          {/* 7. Narrative Direction 5: Demographics & Policy Disaggregation */}
          <DemographicAnalysis
            byMajor={data.byMajor}
            byPolicy={data.byPolicy}
            bySkill={data.bySkill}
            byYear={data.byYear}
          />

          {/* 8. Interactive Self-Reflection Diagnostic Assessment */}
          <SelfReflectionTool />

          {/* 9. AI Impact on Students & Social Media Tabular Section */}
          <AIImpactAndSocialMedia />

          {/* 10. The Path Forward: Concluding Synthesis */}
          <ConcludingSection />

          {/* 11. Curated AI Tools for Design & AI Students */}
          <AIToolsSection />
        </main>

        {/* Footer */}
        <Footer
          onOpenProvenance={() => setProvenanceModalOpen(true)}
        />

        {/* Provenance & Non-Causal Modal */}
        <ProvenanceModal
          isOpen={provenanceModalOpen}
          onClose={() => setProvenanceModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default App;


