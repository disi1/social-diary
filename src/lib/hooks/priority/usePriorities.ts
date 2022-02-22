import { supabase } from "../../supabaseClient";
import { Priority } from "../../priority";
import { useQuery, useQueryClient } from "react-query";

const fetchPriorities = async (userId: string) => {
  const { data, error } = await supabase
    .from("priority")
    .select("*")
    .eq("user_id", userId)
    .order("frequency", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data as Priority[];
};

export default function usePriorities(userId: string | undefined) {
  return useQuery<Priority[]>(
    ["priorities", userId],
    () => fetchPriorities(userId!),
    { enabled: userId != null }
  );
}
