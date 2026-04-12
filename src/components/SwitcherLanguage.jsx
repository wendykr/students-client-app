import { CzechFlag } from "../icons/CzechFlag";
import { EnglishFlag } from "../icons/EnglishFlag";

export const SwitcherLanguage = ({locale, setLocale}) => {

  return (
    <button
      style={{ all: "unset", cursor: "pointer" }}
      onClick={() => {
        const nextLocale = locale === "cs" ? "en" : "cs";

        setLocale(nextLocale);
      }}
    >
      {locale === "cs" ? (
        <CzechFlag />
      ) : (
        <EnglishFlag />
      )}
    </button>
  );
}