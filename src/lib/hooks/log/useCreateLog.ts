import { Log } from "../../log";
import { supabase } from "../../supabaseClient";
import { useMutation } from "react-query";

const createLog = async (log: Log) => {
  const { error, status } = await supabase.from("log").insert([
    {
      contact_id: log.contact_id,
      note: log.note,
      timestamp: log.timestamp,
      user_id: log.user_id,
    },
  ]);

  if (error) {
    throw error;
  }

  return status;
};

export default function useCreateLog() {
  return useMutation((log: Log) => createLog(log));
}
