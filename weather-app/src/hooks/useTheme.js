// for the background colours, we use CSS variables so that we can easily switch between light and dark themes

import { useState, useEffect } from 'react';

const LIGHT = {
  '--bg-primary':     '#f0f4f7',
  '--bg-card':        '#ffffff',
  '--bg-input':       '#e8ecef',
  '--bg-location':    '#cfd6dc',
  '--text-primary':   '#2c3e50',
  '--text-secondary': '#5b6d7a',
  '--text-heading':   '#5d8ea4',
  '--accent':         '#5d8ea4',
  '--accent-hover':   '#4e7f94',
  '--border':         '#d1dbe3',
};

const DARK = {
  '--bg-primary':     '#0d1117',
  '--bg-card':        '#161b22',
  '--bg-input':       '#21262d',
  '--bg-location':    '#1c2128',
  '--text-primary':   '#e6edf3',
  '--text-secondary': '#8b949e',
  '--text-heading':   '#79c0ff',
  '--accent':         '#388bfd',
  '--accent-hover':   '#58a6ff',
  '--border':         '#30363d',
};

export function useTheme() {
  const [isDark, setIsDark] = useState(false);   // default to light theme
  const [customBg, setCustomBg] = useState('');  // for user-selected background colour

  // when the theme or custom background changes, we need to update the CSS variables on the page
  useEffect(() => {
    const colours = isDark ? DARK : LIGHT;

    // loop through each colour and apply it to the page
    Object.entries(colours).forEach(([variable, value]) => {
      document.documentElement.style.setProperty(variable, value);
    });

    // if the user picked a custom background, override just that one variable
    if (customBg) {
      document.documentElement.style.setProperty('--bg-primary', customBg);
    }
  }, [isDark, customBg]);

  // return the current theme
  return {
    isDark,
    toggleTheme: () => {
      setIsDark(prev => !prev);
      setCustomBg(''); // clear custom bg when switching theme
    },
    customBg,
    setCustomBg,
  };
}