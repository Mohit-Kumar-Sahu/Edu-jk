import React, { useState } from 'react';
import { useLocalization } from '../hooks/useLocalization';
import { ChevronDown, Globe } from 'lucide-react'; // Example icons from lucide-react

const LanguageSwitcher: React.FC = () => {
  const { changeLanguage, currentLanguage, languages } = useLocalization();
  const [isOpen, setIsOpen] = useState(false);
  const currentLangName = languages.find(lang => lang.code === currentLanguage)?.nativeName;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <Globe size={16} />
        {currentLangName}
        <ChevronDown size={16} className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 w-full mt-2 origin-top-right bg-white border border-gray-300 rounded-md shadow-lg min-w-[150px]">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  changeLanguage(lang.code);
                  setIsOpen(false);
                }}
                className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                {lang.nativeName} ({lang.name})
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;