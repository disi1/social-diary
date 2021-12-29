import { Contact } from "./contact.types";
import { createContext, FunctionComponent, useEffect, useState } from "react";
import { useAuth } from "../auth";
import { supabase } from "../supabaseClient";

export type ContactContextProps = {
  contacts: Contact[];
};

export const ContactContext = createContext<Partial<ContactContextProps>>({});

export const ContactProvider: FunctionComponent = ({ children }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      supabase
        .from("contact")
        .select("*")
        .eq("user_id", user.id)
        .order("name", { ascending: true })
        .then(({ data, error }) => {
          if (!error) {
            setContacts(data as Contact[]);
          }
        });
    }
  }, [user]);

  useEffect(() => {
    const contactListener = supabase
      .from("contact")
      .on("*", (payload) => {
        const newContact = payload.new as Contact;

        setContacts((oldContacts) => {
          const exists = oldContacts.find(
            (contact) => contact.id === newContact.id
          );

          let newContacts;

          if (exists) {
            const oldContactIndex = oldContacts.findIndex(
              (obj) => obj.id === newContact.id
            );
            oldContacts[oldContactIndex] = newContact;
            newContacts = oldContacts;
          } else {
            newContacts = [...oldContacts, newContact];
          }

          newContacts.sort((a, b) => a.name.localeCompare(b.name));

          return newContacts;
        });
      })
      .subscribe();

    return () => {
      contactListener.unsubscribe();
    };
  }, []);

  return (
    <ContactContext.Provider
      value={{
        contacts,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};
