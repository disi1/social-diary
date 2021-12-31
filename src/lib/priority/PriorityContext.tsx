import { Priority } from "./priority.types";
import { createContext, FunctionComponent, useEffect, useState } from "react";
import { useAuth } from "../auth";
import { supabase } from "../supabaseClient";
import { updateItemsWithNewItem, updateItemsWithOldItem } from "../utils";

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
        .order("frequency", { ascending: true })
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
        if (payload.eventType === "DELETE") {
          const oldPriority = payload.old;

          setPriorities((oldPriorities) => {
            const newPriorities = updateItemsWithOldItem(
              oldPriorities,
              oldPriority
            );
            newPriorities.sort((a, b) => a.frequency! - b.frequency!);

            return newPriorities;
          });
        } else {
          const newPriority = payload.new as Priority;
          setPriorities((oldPriorities) => {
            const newPriorities = updateItemsWithNewItem(
              oldPriorities,
              newPriority
            );
            newPriorities.sort((a, b) => a.frequency! - b.frequency!);

            return newPriorities;
          });
        }
      })
      .subscribe();

    return () => {
      priorityListener.unsubscribe();
    };
  }, []);

  return (
    <PriorityContext.Provider value={{ priorities }}>
      {children}
    </PriorityContext.Provider>
  );
};
