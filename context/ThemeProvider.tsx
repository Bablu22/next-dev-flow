"use client";

import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

type ThemeContextType = {
  mode: string;
  setMode: (mode: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [mode, setMode] = useState("light");

  useEffect(() => {
    if (mode === "light") {
      setMode("dark");
      document.documentElement.classList.add("dark");
    } else {
      setMode("light");
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
