import { supabase } from "../../supabaseClient";
import { useQuery } from "react-query";

const fetchCategories = async () => {
  const user = supabase.auth.user();

  const { data, error } = await supabase
    .from("category")
    .select("*")
    .eq("user_id", user?.id)
    .order("name", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export default function useCategories() {
  return useQuery("categories", () => fetchCategories());
}
