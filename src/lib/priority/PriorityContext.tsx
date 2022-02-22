import { Priority } from "./priority.types";
import { createContext, FunctionComponent, useEffect } from "react";
import { useAuth } from "../auth";
import usePriorities from "../hooks/priority/usePriorities";
import { supabase } from "../supabaseClient";
import { useQueryClient } from "react-query";

export type PriorityContextProps = {
  priorities: Priority[];
};

export const PriorityContext = createContext<Partial<PriorityContextProps>>({});

export const PriorityProvider: FunctionComponent = ({ children }) => {
  const queryClient = useQueryClient();

  const { user } = useAuth();

  const { data: priorities } = usePriorities(user?.id);

  useEffect(() => {
    const contactListener = supabase
      .from("priority")
      .on("*", (payload) => {
        queryClient.invalidateQueries(["priorities", user?.id]);
      })
      .subscribe();

    return () => {
      contactListener.unsubscribe();
    };
  }, [user?.id]);

  return (
    <PriorityContext.Provider value={{ priorities }}>
      {children}
    </PriorityContext.Provider>
  );
};
