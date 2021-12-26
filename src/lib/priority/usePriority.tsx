import { useContext } from "react";
import { PriorityContext } from "./PriorityContext";

export const usePriority = () => {
  const context = useContext(PriorityContext);

  if (context === undefined) {
    throw new Error(
      "usePriority must be used within a PriorityContext.Provider"
    );
  }

  return context;
};
