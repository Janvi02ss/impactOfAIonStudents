import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  TableProperties, 
  ChevronRight, 
  Database, 
  ExternalLink, 
  Wrench, 
  Sun, 
  Moon, 
  Smartphone, 
  Monitor 
} from 'lucide-react';
import { NAV_SECTIONS, NavSection } from '../data/navigationSections';
import { useTheme } from '../ThemeContext';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenResearchPack?: (tab?: string) => void;
  onOpenProvenance?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeSection, 
  onNavigate, 
  onOpenResearchPack,
  onOpenProvenance 
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme, setTheme, viewMode, toggleViewMode, setViewMode } = useTheme();

  // Close drawer on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    if (menuOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#F8F6FC]/95 dark:bg-[#0F071D]/95 backdrop-blur-md border-b border-[#DCCEFF] dark:border-[#3D2266] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Primary Identity (Horizontally aligned, unstacked) */}
            <div className="flex items-center">
              <button
                id="brand-logo-btn"
                onClick={() => handleNavClick('overview')}
                className="flex items-center space-x-3 text-left group cursor-pointer focus:outline-hidden"
              >
                <div className="w-8 h-8 rounded-lg bg-[#24113F] text-[#C7F36B] flex items-center justify-center font-editorial font-bold text-lg group-hover:bg-[#6C3BFF] group-hover:text-white transition-colors shadow-xs">
                  Ψ
                </div>
                <span className="font-editorial text-lg sm:text-xl font-bold tracking-tight text-[#24113F] dark:text-[#F8F6FC] group-hover:text-[#6C3BFF] transition-colors whitespace-nowrap">
                  The Student-AI Spectrum
                </span>
              </button>
            </div>

            {/* Actions: Theme Toggle, Mobile/Desktop View Switcher & Navigation */}
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              {/* Light / Dark Mode Toggle */}
              <button
                id="theme-toggle-btn"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                className="inline-flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg border border-[#DCCEFF] dark:border-[#3D2266] bg-white dark:bg-[#1A0D31] text-[#24113F] dark:text-[#E2DAF0] hover:bg-[#DCCEFF]/30 hover:border-[#6C3BFF] transition-all shadow-xs cursor-pointer text-xs font-medium"
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-[#C7F36B]" />
                    <span className="hidden sm:inline font-semibold">Light</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-[#6C3BFF]" />
                    <span className="hidden sm:inline font-semibold">Dark</span>
                  </>
                )}
              </button>

              {/* Mobile / Desktop Simulation Toggle */}
              <button
                id="viewmode-toggle-btn"
                onClick={toggleViewMode}
                aria-label={`Switch to ${viewMode === 'desktop' ? 'mobile' : 'desktop'} view mode`}
                className="hidden sm:inline-flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg border border-[#DCCEFF] dark:border-[#3D2266] bg-white dark:bg-[#1A0D31] text-[#24113F] dark:text-[#E2DAF0] hover:bg-[#DCCEFF]/30 hover:border-[#6C3BFF] transition-all shadow-xs cursor-pointer text-xs font-medium"
                title={viewMode === 'desktop' ? 'Switch to Mobile Preview Mode' : 'Switch to Desktop Mode'}
              >
                {viewMode === 'desktop' ? (
                  <>
                    <Smartphone className="w-3.5 h-3.5 text-[#6C3BFF]" />
                    <span className="font-semibold">Mobile</span>
                  </>
                ) : (
                  <>
                    <Monitor className="w-3.5 h-3.5 text-[#C7F36B]" />
                    <span className="font-semibold">Desktop</span>
                  </>
                )}
              </button>

              {/* Impact Matrix Shortcut */}
              <button
                id="open-impact-matrix-btn"
                onClick={() => handleNavClick('impact-matrix')}
                className="hidden md:inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-[#DCCEFF] dark:border-[#3D2266] bg-white dark:bg-[#1A0D31] text-[#29252F] dark:text-[#E2DAF0] hover:bg-[#DCCEFF]/30 hover:border-[#6C3BFF] transition-all shadow-xs cursor-pointer"
              >
                <TableProperties className="w-3.5 h-3.5 text-[#6C3BFF]" />
                <span className="font-semibold text-[#24113F] dark:text-[#F8F6FC]">Impact Matrix</span>
              </button>

              {/* AI Tools Shortcut */}
              <button
                id="open-tools-btn"
                onClick={() => handleNavClick('tools')}
                className="hidden lg:inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-[#DCCEFF] dark:border-[#3D2266] bg-white dark:bg-[#1A0D31] text-[#29252F] dark:text-[#E2DAF0] hover:bg-[#DCCEFF]/30 hover:border-[#6C3BFF] transition-all shadow-xs cursor-pointer"
              >
                <Wrench className="w-3.5 h-3.5 text-[#6C3BFF]" />
                <span className="font-semibold text-[#24113F] dark:text-[#F8F6FC]">AI Toolkit</span>
              </button>

              {/* Universal Hamburger Navigation Toggle (Visible on Desktop & Mobile) */}
              <button
                id="nav-menu-toggle-btn"
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-[#DCCEFF] dark:border-[#3D2266] bg-white dark:bg-[#1A0D31] text-[#24113F] dark:text-[#F8F6FC] hover:bg-[#DCCEFF]/40 hover:border-[#6C3BFF] transition-all shadow-xs focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#6C3BFF] cursor-pointer font-medium"
                aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={menuOpen}
              >
                {menuOpen ? (
                  <X className="w-4 h-4 text-[#24113F] dark:text-[#F8F6FC]" />
                ) : (
                  <Menu className="w-4 h-4 text-[#24113F] dark:text-[#F8F6FC]" />
                )}
                <span className="text-xs font-semibold text-[#24113F] dark:text-[#F8F6FC]">
                  {menuOpen ? 'Close' : 'Menu'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Slide-out Navigation Drawer & Overlay (Universal for all viewports) */}
      {menuOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#24113F]/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <aside
            id="navigation-drawer"
            aria-label="Story Sections Navigation"
            className="fixed inset-y-0 right-0 w-full max-w-md bg-[#F8F6FC] shadow-2xl flex flex-col border-l border-[#DCCEFF] z-50 animate-in slide-in-from-right duration-200"
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-[#DCCEFF] flex items-center justify-between bg-white">
              <div>
                <span className="text-xs font-mono-stat uppercase tracking-wider text-[#6C3BFF] font-semibold block">
                  Table of Contents
                </span>
                <h2 className="font-editorial text-xl font-normal text-[#24113F]">
                  Research Sections
                </h2>
              </div>
              <button
                id="close-drawer-btn"
                onClick={() => setMenuOpen(false)}
                className="p-2 rounded-lg text-[#29252F] hover:text-[#24113F] hover:bg-[#DCCEFF]/40 transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List of Navigation Items */}
            <nav 
              className="flex-1 overflow-y-auto p-4 space-y-1.5 focus:outline-hidden"
              aria-label="Section List"
            >
              {NAV_SECTIONS.map((item: NavSection) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-item-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-start space-x-3.5 group cursor-pointer ${
                      isActive
                        ? 'bg-white border-[#6C3BFF] shadow-xs ring-2 ring-[#6C3BFF]/25'
                        : 'bg-white/70 border-[#DCCEFF]/70 hover:bg-white hover:border-[#6C3BFF]/50 shadow-2xs'
                    }`}
                  >
                    <div className="flex-shrink-0 pt-0.5">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono-stat text-xs font-semibold transition-colors ${
                          isActive
                            ? 'bg-[#24113F] text-[#C7F36B]'
                            : 'bg-[#DCCEFF]/50 text-[#24113F] group-hover:bg-[#6C3BFF] group-hover:text-white'
                        }`}
                      >
                        {item.number}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1.5">
                          <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#6C3BFF]' : 'text-[#29252F]/70 group-hover:text-[#6C3BFF]'}`} />
                          <span className={`text-sm font-semibold truncate ${isActive ? 'text-[#24113F]' : 'text-[#29252F] group-hover:text-[#24113F]'}`}>
                            {item.label}
                          </span>
                        </div>
                        {isActive && (
                          <span className="text-[10px] font-mono-stat font-bold uppercase tracking-wider text-[#24113F] bg-[#C7F36B] border border-[#C7F36B] px-2 py-0.5 rounded-full ml-2">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#29252F]/70 mt-1 line-clamp-1 group-hover:text-[#29252F]">
                        {item.subtitle}
                      </p>
                    </div>

                    <ChevronRight className="w-4 h-4 text-[#DCCEFF] group-hover:text-[#6C3BFF] self-center transition-transform group-hover:translate-x-0.5 flex-shrink-0" />
                  </button>
                );
              })}
            </nav>

            {/* Drawer Mode & Theme Controls */}
            <div className="p-4 border-t border-[#DCCEFF] dark:border-[#3D2266] bg-white dark:bg-[#1A0D31] space-y-2.5">
              <div className="text-xs font-bold uppercase tracking-wider text-[#24113F] dark:text-[#F8F6FC] flex items-center justify-between">
                <span>Display &amp; Viewport</span>
                <span className="text-[10px] text-[#29252F]/70 dark:text-[#B5A8CE] font-mono-stat font-normal">Adaptive Controls</span>
              </div>
              
              {/* Theme Segmented Switch */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  id="drawer-theme-light-btn"
                  onClick={() => setTheme('light')}
                  className={`flex items-center justify-center space-x-1.5 py-2 px-3 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    theme === 'light'
                      ? 'bg-[#24113F] text-white border-[#24113F] shadow-2xs'
                      : 'bg-[#F8F6FC] dark:bg-[#251142] text-[#29252F] dark:text-[#E2DAF0] border-[#DCCEFF] dark:border-[#3D2266] hover:border-[#6C3BFF]'
                  }`}
                >
                  <Sun className={`w-3.5 h-3.5 ${theme === 'light' ? 'text-[#C7F36B]' : 'text-[#6C3BFF]'}`} />
                  <span>Light Mode</span>
                </button>
                <button
                  id="drawer-theme-dark-btn"
                  onClick={() => setTheme('dark')}
                  className={`flex items-center justify-center space-x-1.5 py-2 px-3 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    theme === 'dark'
                      ? 'bg-[#6C3BFF] text-white border-[#6C3BFF] shadow-2xs'
                      : 'bg-[#F8F6FC] dark:bg-[#251142] text-[#29252F] dark:text-[#E2DAF0] border-[#DCCEFF] dark:border-[#3D2266] hover:border-[#6C3BFF]'
                  }`}
                >
                  <Moon className={`w-3.5 h-3.5 ${theme === 'dark' ? 'text-[#C7F36B]' : 'text-[#29252F]'}`} />
                  <span>Dark Mode</span>
                </button>
              </div>

              {/* Viewport Segmented Switch */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  id="drawer-view-desktop-btn"
                  onClick={() => setViewMode('desktop')}
                  className={`flex items-center justify-center space-x-1.5 py-2 px-3 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    viewMode === 'desktop'
                      ? 'bg-[#24113F] text-white border-[#24113F] shadow-2xs'
                      : 'bg-[#F8F6FC] dark:bg-[#251142] text-[#29252F] dark:text-[#E2DAF0] border-[#DCCEFF] dark:border-[#3D2266] hover:border-[#6C3BFF]'
                  }`}
                >
                  <Monitor className={`w-3.5 h-3.5 ${viewMode === 'desktop' ? 'text-[#C7F36B]' : 'text-[#29252F]'}`} />
                  <span>Desktop View</span>
                </button>
                <button
                  id="drawer-view-mobile-btn"
                  onClick={() => setViewMode('mobile')}
                  className={`flex items-center justify-center space-x-1.5 py-2 px-3 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    viewMode === 'mobile'
                      ? 'bg-[#6C3BFF] text-white border-[#6C3BFF] shadow-2xs'
                      : 'bg-[#F8F6FC] dark:bg-[#251142] text-[#29252F] dark:text-[#E2DAF0] border-[#DCCEFF] dark:border-[#3D2266] hover:border-[#6C3BFF]'
                  }`}
                >
                  <Smartphone className={`w-3.5 h-3.5 ${viewMode === 'mobile' ? 'text-[#C7F36B]' : 'text-[#29252F]'}`} />
                  <span>Mobile View</span>
                </button>
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-4 border-t border-[#DCCEFF] dark:border-[#3D2266] bg-[#DCCEFF]/20 dark:bg-[#150A28] space-y-2">
              <button
                id="drawer-impact-matrix-btn"
                onClick={() => {
                  handleNavClick('impact-matrix');
                }}
                className="w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-medium rounded-lg border border-[#DCCEFF] bg-white text-[#24113F] hover:bg-[#DCCEFF]/40 hover:border-[#6C3BFF] transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-2">
                  <TableProperties className="w-4 h-4 text-[#6C3BFF]" />
                  <span className="font-semibold text-[#24113F]">AI &amp; Social Media Impact</span>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#C7F36B] text-[#24113F]">
                  Matrix
                </span>
              </button>

              {onOpenProvenance && (
                <button
                  id="drawer-provenance-btn"
                  onClick={() => {
                    onOpenProvenance();
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-2 px-3.5 py-2 text-xs font-medium rounded-lg text-[#29252F] hover:text-[#24113F] hover:bg-white transition-colors cursor-pointer"
                >
                  <Database className="w-4 h-4 text-[#6C3BFF]" />
                  <span>50,000-Row Dataset Provenance &amp; Limitations</span>
                </button>
              )}
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

