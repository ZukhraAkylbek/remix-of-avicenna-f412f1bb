import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

// Переводы делает AutoTranslate; t() всегда возвращает русский текст.
export type Lang = "ru" | "en" | "ky" | "zh";
export const LANGS: { code: Lang; label: string }[] = [
  { code: "ru", label: "Русский" },
  { code: "en", label: "English" },
  { code: "ky", label: "Кыргызча" },
  { code: "zh", label: "中文" },
];

const STORAGE_KEY = "site-lang";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (ru: string, _alt?: string) => string };

const LanguageContext = createContext<Ctx>({ lang: "ru", setLang: () => {}, t: (ru) => ru });

export function useLanguage() {
  return useContext(LanguageContext);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ru");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (saved && LANGS.some((l) => l.code === saved)) setLangState(saved);
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* приватный режим */
    }
  }, []);

  const value = useMemo<Ctx>(() => ({ lang, setLang, t: (ru: string) => ru }), [lang, setLang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
