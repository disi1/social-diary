import { createContext, FunctionComponent, useEffect } from "react";
import { useAuth } from "../auth";
import { Category } from "./category.types";
import useCategories from "../hooks/category/useCategories";
import { supabase } from "../supabaseClient";
import { useQueryClient } from "react-query";

export type CategoryContextProps = {
  categories: Category[];
};

export const CategoryContext = createContext<Partial<CategoryContextProps>>({});

export const CategoryProvider: FunctionComponent = ({ children }) => {
  const queryClient = useQueryClient();

  const { user } = useAuth();

  const { data: categories } = useCategories(user?.id);

  useEffect(() => {
    const categoryListener = supabase
      .from("category")
      .on("*", (payload) => {
        queryClient.invalidateQueries(["categories", user?.id]);
      })
      .subscribe();

    return () => {
      categoryListener.unsubscribe();
    };
  }, [user?.id]);

  return (
    <CategoryContext.Provider
      value={{
        categories,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
