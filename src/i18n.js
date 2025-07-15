import i18n from 'i18next'; import { initReactI18next } from 'react-i18next';

import en from './lang/en.json'; import hi from './lang/hi.json'; import gu from './lang/gu.json'; import bn from './lang/bn.json'; import ta from './lang/ta.json'; import te from './lang/te.json'; import pa from './lang/pa.json'; import or from './lang/or.json'; import ks from './lang/ks.json';

i18n.use(initReactI18next).init({ resources: { en: { translation: en }, hi: { translation: hi }, gu: { translation: gu }, bn: { translation: bn }, ta: { translation: ta }, te: { translation: te }, pa: { translation: pa }, or: { translation: or }, ks: { translation: ks }, }, lng: 'en', fallbackLng: 'en', interpolation: { escapeValue: false, }, });

export default i18n;