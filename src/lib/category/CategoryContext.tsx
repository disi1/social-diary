import { createContext, FunctionComponent, useEffect, useState } from "react";
import { useAuth } from "../auth";
import { supabase } from "../supabaseClient";
import { Category } from "./category.types";

export type CategoryContextProps = {
  categories: Category[];
};

export const CategoryContext = createContext<Partial<CategoryContextProps>>({});

export const CategoryProvider: FunctionComponent = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      supabase
        .from("category")
        .select("*")
        .eq("user_id", user.id)
        .order("name", { ascending: true })
        .then(({ data, error }) => {
          if (!error) {
            setCategories(data as Category[]);
          }
        });
    }
  }, [user]);

  useEffect(() => {
    const categoryListener = supabase
      .from("category")
      .on("*", (payload) => {
        const newCategory = payload.new as Category;
        setCategories((oldCategories) => {
          const newCategories = oldCategories
            ? [...oldCategories, newCategory]
            : [newCategory];

          newCategories.sort((a, b) => a.name.localeCompare(b.name));

          return newCategories;
        });
      })
      .subscribe();

    return () => {
      categoryListener.unsubscribe();
    };
  }, []);

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
