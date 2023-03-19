import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// import { LanguageDetector } from "i18next-browser-languagedetector";
// import { LanguageDetector } from "i18next-browser-languagedetector";
// const translationEN = { welcome: "english" };
// const translationFr = { welcome: "french" };
import en from "./en";
import fr from "./fr";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    fr: {
      translation: fr,
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
