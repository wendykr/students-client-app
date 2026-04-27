import { createContext } from "react";

export const IntlContext = createContext();

export const IntlProvider = ({ locale, messages, children }) => {
  return (
    <IntlContext.Provider value={{ locale, messages }}>
      {children}
    </IntlContext.Provider>
  );
};
