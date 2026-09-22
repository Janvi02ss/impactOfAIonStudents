import React from 'react';
import { NAV_SECTIONS, NavSection } from '../data/navigationSections';
import { useTheme } from '../ThemeContext';

interface SideNavProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const SideNav: React.FC<SideNavProps> = ({ activeSection, onNavigate }) => {
  const { isSimulatedMobile } = useTheme();

  // Hide side ribbon when simulating mobile device
  if (isSimulatedMobile) {
    return null;
  }

  return (
    <nav
      id="side-nav-ribbon"
      aria-label="Story Section Navigation Ribbon"
      className="fixed right-2 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col items-center"
    >
      <div className="relative bg-[#F8F6FC]/95 dark:bg-[#1A0D31]/95 backdrop-blur-md border border-[#DCCEFF] dark:border-[#3D2266] shadow-md py-3.5 px-2 rounded-full flex flex-col items-center space-y-2">
        {/* Subtle background track connector line */}
        <div 
          className="absolute w-[2px] top-6 bottom-6 bg-[#DCCEFF] dark:bg-[#3D2266] -z-10" 
          aria-hidden="true" 
        />

        {NAV_SECTIONS.map((section: NavSection) => {
          const isActive = activeSection === section.id;
          return (
            <div key={section.id} className="relative group flex items-center justify-center">
              {/* Dot Button */}
              <button
                id={`side-dot-${section.id}`}
                onClick={() => onNavigate(section.id)}
                aria-label={`Jump to section ${section.number}: ${section.label}`}
                aria-current={isActive ? 'true' : undefined}
                className="p-1.5 rounded-full focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#6C3BFF] cursor-pointer flex items-center justify-center transition-transform"
              >
                <span
                  className={`block rounded-full transition-all duration-200 ${
                    isActive
                      ? 'w-3.5 h-3.5 bg-[#6C3BFF] ring-3 ring-[#C7F36B] shadow-xs scale-110'
                      : 'w-2 h-2 bg-[#DCCEFF] dark:bg-[#3D2266] group-hover:bg-[#6C3BFF] group-hover:scale-125'
                  }`}
                />
              </button>

              {/* Tooltip on Hover */}
              <div
                role="tooltip"
                className="pointer-events-none absolute right-full mr-3.5 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[#24113F] dark:bg-[#150A28] text-[#F8F6FC] text-xs px-3 py-1.5 rounded-md shadow-lg border border-[#6C3BFF]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center space-x-2 z-50"
              >
                <span className="font-mono-stat font-semibold text-[#C7F36B]">
                  {section.number}
                </span>
                <span className="font-medium text-[#F8F6FC]">{section.shortLabel}</span>
                {isActive && (
                  <span className="text-[10px] uppercase tracking-wider font-bold text-[#24113F] bg-[#C7F36B] px-1.5 py-0.5 rounded">
                    Current
                  </span>
                )}
                {/* Tooltip Caret */}
                <div 
                  className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-[#24113F] dark:border-l-[#150A28]" 
                  aria-hidden="true" 
                />
              </div>
            </div>
          );
        })}
      </div>
    </nav>
  );
};

