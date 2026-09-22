import React, { createContext, useContext, useState, useEffect } from 'react';

export type Theme = 'light' | 'dark';
export type ViewMode = 'desktop' | 'mobile';

export interface ThemeContextType {
  theme: Theme;
  viewMode: ViewMode;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  toggleViewMode: () => void;
  setViewMode: (mode: ViewMode) => void;
  isSimulatedMobile: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state with localStorage persistence and system preference detection
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem('ai_student_theme');
      if (saved === 'dark' || saved === 'light') return saved;
      if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    } catch {
      // Fallback if localStorage or matchMedia fails
    }
    return 'light';
  });

  // ViewMode state: 'desktop' or 'mobile' preview simulator
  const [viewMode, setViewModeState] = useState<ViewMode>(() => {
    try {
      const saved = localStorage.getItem('ai_student_view_mode');
      return saved === 'mobile' ? 'mobile' : 'desktop';
    } catch {
      return 'desktop';
    }
  });

  // Apply theme class to document element
  useEffect(() => {
    try {
      const root = document.documentElement;
      if (theme === 'dark') {
        root.classList.add('dark');
        root.classList.remove('light');
      } else {
        root.classList.remove('dark');
        root.classList.add('light');
      }
      localStorage.setItem('ai_student_theme', theme);
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, [theme]);

  // Save viewMode
  useEffect(() => {
    try {
      localStorage.setItem('ai_student_view_mode', viewMode);
    } catch {
      // Ignore
    }
  }, [viewMode]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setTheme = (t: Theme) => {
    setThemeState(t);
  };

  const toggleViewMode = () => {
    setViewModeState((prev) => (prev === 'desktop' ? 'mobile' : 'desktop'));
  };

  const setViewMode = (mode: ViewMode) => {
    setViewModeState(mode);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        viewMode,
        toggleTheme,
        setTheme,
        toggleViewMode,
        setViewMode,
        isSimulatedMobile: viewMode === 'mobile',
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
