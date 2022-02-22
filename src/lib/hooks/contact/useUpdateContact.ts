import { Contact } from "../../contact";
import { supabase } from "../../supabaseClient";
import { useMutation } from "react-query";

const updateContact = async (contact: Contact) => {
  const { error, status } = await supabase
    .from("contact")
    .update({
      name: contact.name,
      relationship: contact.relationship,
      location: contact.location,
      category_id: contact.category_id,
      priority_id: contact.priority_id,
      user_id: contact.user_id,
    })
    .eq("id", contact.id);

  if (error) {
    throw error;
  }

  return status;
};

export default function useUpdateContact() {
  return useMutation((contact: Contact) => updateContact(contact));
}
