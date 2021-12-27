import { LogContext } from "./LogContext";
import { useContext } from "react";

export const useLog = () => {
  const context = useContext(LogContext);

  if (context === undefined) {
    throw new Error("useLog must be used within a LogContext.Provider");
  }

  return context;
};
