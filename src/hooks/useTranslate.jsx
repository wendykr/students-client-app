import { useContext } from "react";
import { IntlContext } from "../context/IntlContext";

export const useTranslate = () => {
  const { messages, locale } = useContext(IntlContext);

  const t = (id) => {
    const translatedThingy = messages?.[locale]?.[id];

    if (!translatedThingy) {
      return "Unknown translation";
    }

    return translatedThingy;
  };

  return t;
};
