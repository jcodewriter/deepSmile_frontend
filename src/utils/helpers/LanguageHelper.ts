/*
 * The sole purpose of this module is to get the preferred language
 */

import i18Config from "i18n.json";

const prefLangName = "pref_lang_store_name";

const extractLang = (language: string) => {
  const indexOfIphen = language.indexOf("-");
  if (indexOfIphen !== -1) {
    language = language.substring(0, indexOfIphen);
  }
  return language;
};

export const isSupported = (lang: string) => {
  return i18Config.allLanguages.includes(lang);
};

/**
 * Functions used by AuthProvider
 */

export const initialLang = () => {
  if (process.browser) {
    const storedLang = localStorage.getItem(prefLangName);
    const navigatorLang = extractLang(
      (navigator.languages && navigator.languages[0]) || navigator.language
    );

    const lang = storedLang ?? navigatorLang;
    if (isSupported(lang)) {
      return lang;
    }
  }
  return i18Config.defaultLanguage;
};

export const getStoredPrefLang = () => {
  if (process.browser) {
    return localStorage.getItem(prefLangName);
  }
  return null;
};

export const storePrefLang = (lang: string) => {
  localStorage.setItem(prefLangName, lang);
};

// Testing purposes only, until Unit tests are in place
// export const removePrefLanguage = () => {
//   localStorage.removeItem(prefLangName);
// };
