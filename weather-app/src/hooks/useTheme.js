// for the background colours, we use CSS variables so that we can easily switch between light and dark themes

import { useState, useEffect } from 'react';

const LIGHT = {
  '--bg-primary':       '#f0f4f7',
  '--bg-card':          '#ffffff',
  '--bg-input':         '#e8ecef',
  '--bg-location':      '#cfd6dc',
  '--text-primary':     '#2c3e50',
  '--text-secondary':   '#5b6d7a',
  '--text-heading':     '#5d8ea4',
  '--accent':           '#7AADC5',
  '--accent-hover':     '#4e7f94',
  '--border':           '#d1dbe3',

  // widget-specific colors (keep original light widget theme)
  '--widget-bg':            '#dce8f0',
  '--widget-text':          '#1a2e42',
  '--widget-subtext':       '#4c7095',
  '--widget-label':         '#5f7286',
  '--widget-accent':        '#7AADC5',
  '--widget-forecast-bg':   '#7AADC5',
  '--widget-forecast-text': '#ffffff',
  '--widget-forecast-muted':'rgba(255,255,255,0.7)',
  '--widget-hourly-time':   '#7AADC5',
  '--widget-dot-active':    '#ffffff',
  '--widget-dot-inactive':  'rgba(255,255,255,0.38)',
  '--widget-icon':          '#5E9FCC',
  '--widget-sunset-subtext':'#ffffff',
  '--symptom-text': 'black',
  '--symptom-subtext': 'grey',
  '--symptom-warning-bg': '#FFF7ED',
  '--symptom-warning-border': '#FFD6A8',
  '--medication-taken': '#4CAF50',
  '--medication-taken-bg': '#d1eed1',
};

const DARK = {
  '--bg-primary':       '#16191d',
  '--bg-card':          '#1c2128',
  '--bg-input':         '#21262d',
  '--bg-location':      '#1c2128',
  '--text-primary':     '#e6edf3',
  '--text-secondary':   '#8b949e',
  '--text-heading':     '#79c0ff',
  '--accent':           '#7AADC5',
  '--accent-hover':     '#4e7f94',
  '--border':           '#30363d',

  // widget-specific colors
  '--widget-bg':            '#202a36',
  '--widget-text':          '#e6edf3',
  '--widget-subtext':       '#8b949e',
  '--widget-label':         '#8b949e',
  '--widget-accent':        '#1c2128',
  '--widget-forecast-bg':   '#1c2128',
  '--widget-forecast-text': '#e6edf3',
  '--widget-forecast-muted':'rgba(230,237,243,0.7)',
  '--widget-hourly-time':   '#c9ddf8',
  '--widget-dot-active':    '#ffffff',
  '--widget-dot-inactive':  'rgba(255,255,255,0.38)',
  '--widget-icon':          '#58a6ff',
  '--widget-sunset-subtext':'#e6edf3',
  '--symptom-text': '#e6edf3',
  '--symptom-subtext': '#8b949e',
  '--symptom-warning-bg': '#2d2a1f',
  '--symptom-warning-border': '#5d4a2a',
  '--medication-taken': '#6e8f6f',
  '--medication-taken-bg': '#29412fb0',
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