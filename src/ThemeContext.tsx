import React, { useState } from "react";
import { ThemeProvider as SCThemeProvider } from "styled-components";
import { light, dark } from "@pancakeswap-libs/uikit";

const CACHE_KEY = "IS_DARK";

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

export interface ThemeContextProviderType {
  children: any;
}

const ThemeContext = React.createContext<ThemeContextType>({ isDark: true, toggleTheme: () => null });

const ThemeContextProvider: React.FC<ThemeContextProviderType> = ({ children }) => {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark((prevState: any) => {
      localStorage.setItem(CACHE_KEY, JSON.stringify(!prevState));
      return !prevState;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <SCThemeProvider theme={dark}>{children}</SCThemeProvider>
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeContextProvider };
