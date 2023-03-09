import { createContext, useContext, useEffect, useState } from "react";

const modeContext = createContext();

export const ModeContextProvider = ({ children }) => {
  const [mode, setMode] = useState(
    localStorage.getItem("mode")
      ? JSON.parse(localStorage.getItem("mode"))
      : "light"
  );

  const controlMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  useEffect(() => {
    localStorage.setItem("mode", JSON.stringify(mode));
  }, [mode]);

  return (
    <modeContext.Provider
      value={{
        mode,
        controlMode,
      }}
    >
      {children}
    </modeContext.Provider>
  );
};

export const useModeContext = () => useContext(modeContext);
