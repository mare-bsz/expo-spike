// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Language resources
const resources = {
  de: {
    translation: {
      welcome: 'Willkommen auf der geschützten Seite',
      fetchData: 'Geschützte Daten abrufen',
      loading: 'Wird geladen...',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'de',
  interpolation: {
    escapeValue: false, // React already does escaping
  },
});

export default i18n;
