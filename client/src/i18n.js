// i18n.js or i18next.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/en/translation.json";
import translationBN from "./locales/bn/translation.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationEN },
      bn: { translation: translationBN }
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
