import { Priority } from "../../priority";
import { supabase } from "../../supabaseClient";
import { useMutation } from "react-query";

const updatePriority = async (priority: Priority) => {
  const { error, status } = await supabase
    .from("priority")
    .update({
      name: priority.name,
      frequency: priority.frequency,
      user_id: priority.user_id,
    })
    .eq("id", priority.id);

  if (error) {
    throw error;
  }

  return status;
};

export default function useUpdatePriority() {
  return useMutation((priority: Priority) => updatePriority(priority));
}
