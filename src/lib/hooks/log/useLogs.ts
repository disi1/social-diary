import { supabase } from "../../supabaseClient";
import { Log } from "../../log";
import { useQuery } from "react-query";

const fetchLogs = async (userId: string) => {
  const { data, error } = await supabase
    .from("log")
    .select("*")
    .eq("user_id", userId)
    .order("timestamp", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data as Log[];
};

export default function useLogs(userId: string | undefined) {
  return useQuery<Log[]>(["logs", userId], () => fetchLogs(userId!), {
    enabled: userId != null,
  });
}
