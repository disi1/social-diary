import { Log } from "../../log";
import { useMutation } from "react-query";
import { supabase } from "../../supabaseClient";

const deleteLog = async (log: Log) => {
  const { error, status } = await supabase
    .from("log")
    .delete()
    .eq("user_id", log.user_id)
    .eq("id", log.id);

  if (error) {
    throw error;
  }

  return status;
};

export default function useDeleteLog() {
  return useMutation((log: Log) => deleteLog(log));
}
