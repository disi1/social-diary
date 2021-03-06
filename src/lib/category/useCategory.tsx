import { useContext } from "react";
import { CategoryContext } from "./CategoryContext";

export const useCategory = () => {
  const context = useContext(CategoryContext);

  if (context === undefined) {
    throw new Error(
      "useContext must be used within a CategoryContext.Provider"
    );
  }

  return context;
};
