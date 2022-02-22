import { supabase } from "../../supabaseClient";
import { useQuery } from "react-query";
import { Category } from "../../category";

const fetchCategories = async (userId: string) => {
  const { data, error } = await supabase
    .from("category")
    .select("*")
    .eq("user_id", userId)
    .order("name", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data as Category[];
};

export default function useCategories(userId: string | undefined) {
  return useQuery<Category[]>(
    ["categories", userId],
    () => fetchCategories(userId!),
    {
      enabled: userId != null,
    }
  );
}
