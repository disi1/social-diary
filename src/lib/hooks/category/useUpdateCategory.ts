import {Category} from "../../category";
import {useMutation} from "react-query";
import {supabase} from "../../supabaseClient";

const updateCategory = async (category: Category) => {
    const { error, status } = await supabase
        .from("category")
        .update({
            name: category.name,
            user_id: category.user_id,
        })
        .eq("id", category.id);

    if (error) {
        throw error;
    }

    return status
}

export default function useUpdateCategory() {
    return useMutation((category: Category) => updateCategory(category));
}
