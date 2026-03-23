// everything to do with the toggle bar
// a light/dark button
// a colour picker (opens a colour wheel when clicked)
// a hex/rgb/hsl input for typing a colour manually 
// a reset button to go back to the default background

import './ThemeToggle.css';
import { SunIcon, MoonIcon, CloseIcon } from '../icons/ThemeIcons.jsx'; // icons used in the theme toggle UI

// isValidHex checks if a string is a proper hex colour like #fff
function isValidHex(value) {
  return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(value);
}

export default function ThemeToggle({ isDark, toggleTheme, customBg, setCustomBg }) {
  // the colour within the circle, showing for dark mode, light mode, or a custom colour
  const hexInput = customBg || (isDark ? '#0d1117' : '#f0f4f7');

  const handleColorWheel = (e) => {
    setCustomBg(e.target.value); // when user picks custom colour, update customBg state with the hex value
  };

  const handleReset = () => {
    setCustomBg(''); // clearing customBg makes useTheme reapply the theme default
  };

  return (
    <div className={`theme-bar ${isDark ? 'theme-bar--dark' : 'theme-bar--light'}`}>

      {/* light/dark toggle button */}
      <button className="theme-mode-btn" onClick={toggleTheme}>
        {isDark ? <><SunIcon size={14} color="#fff" style={{ marginRight: '5px' }} />Light</> : <><MoonIcon size={14} color="#fff" style={{ marginRight: '5px' }} />Dark</> }
      </button>

      <div className="theme-divider" />

      {/* colour section label */}
      <span className="theme-label">Background</span>

      {/* Colour input which when clicked opens the hidden colour wheel */}
      <label className="theme-changer" style={{ background: hexInput }} title="Open colour picker">
        <input
          type="color"
          value={isValidHex(hexInput) ? hexInput : '#ffffff'}
          onChange={handleColorWheel}
          className="theme-colour-input"
        />
      </label>

      {/* reset button which shows when a custom colour is active */}
      {customBg && (
        <button className="theme-reset-btn" onClick={handleReset} title="Reset to default">
          <CloseIcon size={11} color="currentColor" style={{ marginRight: '4px' }} />Reset
        </button>
      )}

    </div>
  );
}
