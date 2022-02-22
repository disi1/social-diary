import { Log } from "./log.types";
import { createContext, FunctionComponent, useEffect } from "react";
import { useAuth } from "../auth";
import useLogs from "../hooks/log/useLogs";
import { useQueryClient } from "react-query";
import { supabase } from "../supabaseClient";

export type LogContextProps = {
  logs: Log[];
};

export const LogContext = createContext<Partial<LogContextProps>>({});

export const LogProvider: FunctionComponent = ({ children }) => {
  const queryClient = useQueryClient();

  const { user } = useAuth();

  const { data: logs } = useLogs(user?.id);

  useEffect(() => {
    const logListener = supabase
      .from("log")
      .on("*", (payload) => {
        queryClient.invalidateQueries(["logs", user?.id]);
        queryClient.invalidateQueries(["contacts", user?.id]);
      })
      .subscribe();

    return () => {
      logListener.unsubscribe();
    };
  }, [user?.id]);

  return <LogContext.Provider value={{ logs }}>{children}</LogContext.Provider>;
};
