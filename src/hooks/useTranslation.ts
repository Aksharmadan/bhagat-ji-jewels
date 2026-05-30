import { useState, useEffect } from "react";
import { translations } from "@/lib/translations";

export function useTranslation() {
  const [lang, setLang] = useState<"EN" | "HI">("EN");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("lang") as "EN" | "HI" | null;
      if (savedLang === "EN" || savedLang === "HI") {
        setLang(savedLang);
      }
    }

    const handleLangChange = () => {
      const currentLang = localStorage.getItem("lang") as "EN" | "HI" | null;
      if (currentLang === "EN" || currentLang === "HI") {
        setLang(currentLang);
      }
    };

    window.addEventListener("langChange", handleLangChange);
    return () => {
      window.removeEventListener("langChange", handleLangChange);
    };
  }, []);

  const t = (key: keyof typeof translations.EN) => {
    const dict = translations[lang] || translations.EN;
    return dict[key] || translations.EN[key] || "";
  };

  return { t, lang };
}
