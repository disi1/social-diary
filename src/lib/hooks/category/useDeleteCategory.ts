import {Category} from "../../category";
import {supabase} from "../../supabaseClient";
import {useMutation} from "react-query";

const deleteCategory = async (category: Category) => {
    const { error, status } = await supabase
        .from("category")
        .delete()
        .eq("user_id", category.user_id)
        .eq("id", category.id);

    if (error) {
        throw error;
    }

    return status
}

export default function useDeleteCategory() {
    return useMutation((category: Category) => deleteCategory(category));
}
