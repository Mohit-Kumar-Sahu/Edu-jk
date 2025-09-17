import { useTranslation } from 'react-i18next';

export const useLocalization = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const currentLanguage = i18n.language;

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'ur', name: 'Urdu', nativeName: 'اردو' },
    { code: 'ks', name: 'Kashmiri', nativeName: 'کٲشُر' },
    { code: 'hn', name: 'Hindi', nativeName: 'हिन्दी' },
  ];

  return {
    t,
    changeLanguage,
    currentLanguage,
    languages,
  };
};