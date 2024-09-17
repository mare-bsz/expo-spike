// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import headerDe from './header.de.json';
import searchDe from './search.de.json';

const resources = {
  de: {
    header: headerDe,
    search: searchDe,
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'de',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
