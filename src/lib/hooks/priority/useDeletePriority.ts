import {Priority} from "../../priority";
import {supabase} from "../../supabaseClient";
import {useMutation} from "react-query";

const deletePriority = async (priority: Priority) => {
    const { error, status } = await supabase
        .from("priority")
        .delete()
        .eq("user_id", priority.user_id)
        .eq("id", priority.id);

    if (error) {
        throw error;
    }

    return status
}

export default function useDeletePriority() {
    return useMutation((priority: Priority) => deletePriority(priority))
}
