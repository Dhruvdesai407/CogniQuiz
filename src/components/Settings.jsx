import React from 'react';

const Settings = ({ uiSettings, onUiSettingChange, onReturnToSettings }) => {
  return (
    <div className="text-center p-8 md:p-12 rounded-xl shadow-xl frosted-glass-effect max-w-2xl w-11/12 md:w-full animate-pop-in">
      <h2 className="text-4xl md:text-6xl font-heading text-heading-color mb-4 md:mb-6">App Settings</h2>
      <p className="text-body-color text-lg md:text-xl mb-8 md:mb-10 font-merriweather">Customize your CogniQuiz experience.</p>

      <div className="space-y-6 max-w-md mx-auto text-left">
        <div className="flex items-center justify-between p-4 rounded-lg bg-input-bg-color border border-subtle-color">
          <label htmlFor="customCursor" className="text-body-color text-lg md:text-xl font-medium">
            Custom Cursor
          </label>
          <label className="toggle-switch">
            <input
              type="checkbox"
              id="customCursor"
              checked={uiSettings.showCustomCursor}
              onChange={(e) => onUiSettingChange('showCustomCursor', e.target.checked)}
              data-interactive="true"
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 rounded-lg bg-input-bg-color border border-subtle-color">
          <label htmlFor="backgroundPattern" className="text-body-color text-lg md:text-xl font-medium">
            Background Pattern
          </label>
          <label className="toggle-switch">
            <input
              type="checkbox"
              id="backgroundPattern"
              checked={uiSettings.showBackgroundPattern}
              onChange={(e) => onUiSettingChange('showBackgroundPattern', e.target.checked)}
              data-interactive="true"
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 rounded-lg bg-input-bg-color border border-subtle-color">
          <label htmlFor="soundEffects" className="text-body-color text-lg md:text-xl font-medium">
            Sound Effects
          </label>
          <label className="toggle-switch">
            <input
              type="checkbox"
              id="soundEffects"
              checked={uiSettings.enableSoundEffects}
              onChange={(e) => onUiSettingChange('enableSoundEffects', e.target.checked)}
              data-interactive="true"
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>

      <button
        onClick={onReturnToSettings}
        className="btn w-full md:w-auto mt-10"
        data-interactive="true"
      >
        Back to Main Menu
      </button>
    </div>
  );
};

export default Settings;