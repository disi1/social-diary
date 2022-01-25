import { Priority } from "../../priority";
import { useMutation } from "react-query";
import { supabase } from "../../supabaseClient";

const createPriority = async (priority: Priority) => {
  const { error, status } = await supabase.from("priority").insert({
    name: priority.name,
    frequency: priority.frequency,
    user_id: priority.user_id,
  });

  if (error) {
    throw error;
  }
  return status;
};

export default function useCreatePriority() {
  return useMutation((priority: Priority) => createPriority(priority));
}
