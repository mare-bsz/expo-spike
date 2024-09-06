// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import homeDe from './home.de.json';
import headerDe from './header.de.json';

const resources = {
  de: {
    home: homeDe,
    header: headerDe,
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
