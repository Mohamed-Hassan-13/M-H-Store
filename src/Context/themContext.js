import { createContext, useState } from "react";

export const theme = createContext();
export default function ThemContext({ children }) {
  const [Theme, setTheme] = useState("light");
  return (
    <theme.Provider value={{ Theme, setTheme }}>{children}</theme.Provider>
  );
}
