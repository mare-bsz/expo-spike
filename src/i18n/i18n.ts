import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import headerDe from './header.de.json';
import homeDe from './home.de.json';
import searchDe from './search.de.json';
import detailDe from './detail.de.json';

const resources = {
  de: {
    header: headerDe,
    home: homeDe,
    search: searchDe,
    detail: detailDe,
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
