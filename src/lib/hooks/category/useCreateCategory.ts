import { Category } from "../../category";
import { supabase } from "../../supabaseClient";
import { useMutation } from "react-query";

const createCategory = async (category: Category) => {
  const { error, status } = await supabase
    .from("category")
    .insert({
      name: category.name,
      user_id: category.user_id,
    });

  if (error) {
    throw error;
  }
  return status;
};

export default function useCreateCategory() {
  return useMutation((category: Category) => createCategory(category));
}
