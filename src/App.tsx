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

const data = researchDataRaw as unknown as ResearchDataset;

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [provenanceModalOpen, setProvenanceModalOpen] = useState<boolean>(false);

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
    <div className="min-h-screen flex flex-col bg-[#F8F6FC] text-[#29252F] selection:bg-[#C7F36B] selection:text-[#24113F] relative">
      {/* Top Navigation Bar with Unstacked Brand & Universal Hamburger Menu */}
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
  );
};

export default App;

