import { Log } from "./log.types";
import { createContext, FunctionComponent, useEffect, useState } from "react";
import { useAuth } from "../auth";
import { supabase } from "../supabaseClient";

export type LogContextProps = {
  logs: Log[];
};

export const LogContext = createContext<Partial<LogContextProps>>({});

export const LogProvider: FunctionComponent = ({ children }) => {
  const [logs, setLogs] = useState<Log[]>([]);

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      supabase
        .from("log")
        .select("*")
        .eq("user_id", user.id)
        .order("id", { ascending: true })
        .then(({ data, error }) => {
          if (!error) {
            setLogs(data as Log[]);
          }
        });
    }
  }, [user]);

  useEffect(() => {
    const logListener = supabase
      .from("log")
      .on("*", (payload) => {
        const newLog = payload.new as Log;
        setLogs((oldLogs) => {
          const newLogs = oldLogs ? [...oldLogs, newLog] : [newLog];

          newLogs.sort((a, b) => a.id! - b.id!);

          return newLogs;
        });
      })
      .subscribe();

    return () => {
      logListener.unsubscribe();
    };
  }, []);

  return <LogContext.Provider value={{ logs }}>{children}</LogContext.Provider>;
};
