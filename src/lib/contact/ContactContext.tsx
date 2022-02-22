import { Contact } from "./contact.types";
import { createContext, FunctionComponent, useEffect } from "react";
import { useAuth } from "../auth";
import useContacts from "../hooks/contact/useContacts";
import { supabase } from "../supabaseClient";
import { useQueryClient } from "react-query";

export type ContactContextProps = {
  contacts: Contact[];
};

export const ContactContext = createContext<Partial<ContactContextProps>>({});

export const ContactProvider: FunctionComponent = ({ children }) => {
  const queryClient = useQueryClient();

  const { user } = useAuth();

  const { data: contacts } = useContacts(user?.id);

  useEffect(() => {
    const contactListener = supabase
      .from("contact")
      .on("*", (payload) => {
        queryClient.invalidateQueries(["contacts", user?.id]);
      })
      .subscribe();

    return () => {
      contactListener.unsubscribe();
    };
  }, [user?.id]);

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
