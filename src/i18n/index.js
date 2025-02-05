import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en';
import zh_CN from './locales/zh_CN';

const resources = {
  en,
  zh_CN
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // 默认语言
    fallbackLng: 'en', // 备选语言
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;