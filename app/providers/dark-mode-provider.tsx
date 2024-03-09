'use client'
import { DarkModeContext } from "@/lib/useDarkMode";
import { ReactNode, useState, useEffect } from "react";

export const DarkModeProvider = ({ children }: { children: ReactNode }) => {

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if(typeof localStorage !== 'undefined'){
      const userPreference = localStorage.getItem('darkMode');
      if (userPreference !== null) return JSON.parse(userPreference);

      const usePrefersDark = window.matchMedia('(prefers-color-scheme: dark)')?.matches;
      const usePrefersLight = window.matchMedia('(prefers-color-scheme: light)')?.matches;
      if (usePrefersDark || usePrefersLight) {
        if (usePrefersDark) {
          return true;
        }
        if (usePrefersLight) {
          return false;
        }
      }
    }
    // Default to dark mode
    return true;
  });

  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
