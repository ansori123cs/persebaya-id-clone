"use client";

import { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext<any>(null);

export const LanguageProvider = ({ children, translations }: any) => {
  const [lang, setLang] = useState<"id" | "en">("id");

  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved) setLang(saved as "id" | "en");
  }, []);

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  const toggleLang = (language: "id" | "en") => {
    // kalau pakai select option
    setLang(language);

    // kalau pakai  togle
    // setLang((prev) => (prev === "id" ? "en" : "id"));
  };

  const t = (key: string) => {
    const keys = key.split(".");
    let value: any = translations[lang];

    keys.forEach((k) => {
      value = value?.[k];
    });

    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
