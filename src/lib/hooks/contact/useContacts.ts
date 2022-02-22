import { Contact } from "../../contact";
import { supabase } from "../../supabaseClient";
import {useQuery} from "react-query";

const fetchContacts = async (userId: string) => {
  const { data, error } = await supabase
    .from("contact")
    .select("*")
    .eq("user_id", userId)
    .order("name", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data as Contact[];
};

export default function useContacts(userId: string | undefined) {
  return useQuery<Contact[]>(["contacts", userId], () => fetchContacts(userId!), {
    enabled: userId != null,
  });
}
