import { Contact } from "../../contact";
import { supabase } from "../../supabaseClient";
import { useMutation } from "react-query";

const deleteContact = async (contact: Contact) => {
  const { error, status } = await supabase
    .from("contact")
    .delete()
    .eq("id", contact.id);

  if (error) {
    throw error;
  }

  return status;
};

export default function useDeleteContact() {
  return useMutation((contact: Contact) => deleteContact(contact));
}
