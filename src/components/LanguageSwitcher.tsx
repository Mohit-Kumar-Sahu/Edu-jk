import React from 'react';
import { useLocalization } from '../hooks/useLocalization';

const LanguageSwitcher: React.FC = () => {
  const { changeLanguage, currentLanguage, languages } = useLocalization();

  return (
    <div className="relative">
      <select
        value={currentLanguage}
        onChange={(e) => changeLanguage(e.target.value)}
        className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.nativeName} ({lang.name})
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;
