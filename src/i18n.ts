import i18n from "i18next";
import {initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector"
import zhJSON from './locales/zh.json';
import frJSON from './locales/fr.json';
import grJSON from './locales/gr.json';
import jpJSON from './locales/jp.json';
import enJSON from './locales/en.json';
i18n.use(LanguageDetector).use(initReactI18next).init({debug:true,
  resources: {
    zh:{ ...zhJSON },
    en: { ...enJSON },
    fr:{ ...frJSON },
    de: { ...grJSON },
    ja:{ ...jpJSON },
  },
  fallbackLng: "en",
});