import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './assets/locales';

const i18nextInstance = i18n.createInstance();

i18nextInstance.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
});

export default i18nextInstance;
