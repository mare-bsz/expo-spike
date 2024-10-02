import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import headerDe from './header.de.json';
import homeDe from './home.de.json';
import searchDe from './search.de.json';
import detailDe from './detail.de.json';
import imageDe from './image.de.json';

const resources = {
  de: {
    detail: detailDe,
    header: headerDe,
    home: homeDe,
    image: imageDe,
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
