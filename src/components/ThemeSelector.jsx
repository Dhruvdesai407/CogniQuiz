import React from 'react';

const ThemeSelector = ({ currentTheme, onThemeChange }) => {
  const themes = [
    { name: 'Emerald Serenity', value: 'theme-emerald' },
    { name: 'Royal Indigo', value: 'theme-indigo' },
    { name: 'Crimson Grandeur', value: 'theme-crimson' },
    { name: 'Obsidian Grace', value: 'theme-obsidian' },
    { name: 'Azure Dawn', value: 'theme-light-azure' },
  ];

  return (
    <div className="relative">
      <select
        value={currentTheme}
        onChange={(e) => onThemeChange(e.target.value)}
        className="bg-input-bg-color text-body-color border border-subtle-color rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-main cursor-pointer transition-colors duration-200"
        data-interactive="true"
      >
        {themes.map(theme => (
          <option key={theme.value} value={theme.value}>{theme.name}</option>
        ))}
      </select>
    </div>
  );
};

export default ThemeSelector;