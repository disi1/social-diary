import { Log } from "../../log";
import { supabase } from "../../supabaseClient";
import { useMutation } from "react-query";

const updateLog = async (log: Log) => {
  const { error, status } = await supabase
    .from("log")
    .update({
      user_id: log.user_id,
      contact_id: log.contact_id,
      note: log.note,
      timestamp: log.timestamp,
    })
    .eq("user_id", log.user_id)
    .eq("id", log.id);

  if (error) {
    throw error;
  }

  return status;
};

export default function useUpdateLog() {
  return useMutation((log: Log) => updateLog(log));
}
