import { Priority } from "./priority.types";
import { createContext, FunctionComponent, useEffect, useState } from "react";
import { useAuth } from "../auth";
import { supabase } from "../supabaseClient";

export type PriorityContextProps = {
  priorities: Priority[];
};

export const PriorityContext = createContext<Partial<PriorityContextProps>>({});

export const PriorityProvider: FunctionComponent = ({ children }) => {
  const [priorities, setPriorities] = useState<Priority[]>([]);

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      supabase
        .from("priority")
        .select("*")
        .eq("user_id", user?.id)
        .order("id", { ascending: false })
        .then(({ data, error }) => {
          if (!error) {
            setPriorities(data as Priority[]);
          }
        });
    }
  }, [user]);

  useEffect(() => {
    const priorityListener = supabase
      .from("priority")
      .on("*", (payload) => {
        const newPriority = payload.new as Priority;
        setPriorities((oldPriorities) => {
          const newPriorities = oldPriorities
            ? [...oldPriorities, newPriority]
            : [newPriority];
          newPriorities.sort((a, b) => b.id! - a.id!);
          return newPriorities;
        });
      })
      .subscribe();

    return () => {
      priorityListener.unsubscribe();
    };
  }, []);

  return (
    <PriorityContext.Provider value={{ priorities }}>
      {priorities}
    </PriorityContext.Provider>
  );
};
