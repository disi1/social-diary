import { createContext, FunctionComponent, useEffect } from "react";
import { useState } from "react";
import { supabase } from "..";
import { SupabaseAuthPayload } from "./auth.types";
import { User } from "@supabase/supabase-js";
import { ROUTE_AUTH, ROUTE_HOME } from "../../config";
import Router from "next/router";

export type AuthContextProps = {
  user: User;
  signUp: (payload: SupabaseAuthPayload) => void;
  signIn: (payload: SupabaseAuthPayload) => void;
  signOut: () => void;
  loggedIn: boolean;
  loading: boolean;
  userLoading: boolean;
};

export const AuthContext = createContext<Partial<AuthContextProps>>({});

export const AuthProvider: FunctionComponent = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [userLoading, setUserLoading] = useState(true);
  const [loggedIn, setLoggedin] = useState(false);

  useEffect(() => {
    const user = supabase.auth.user();

    if (user) {
      setUser(user);
      setUserLoading(false);
      setLoggedin(true);
      Router.push(ROUTE_HOME);
    } else {
      setUserLoading(false);
    }

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const user = session?.user! ?? null;
        setUserLoading(false);
        if (user) {
          setUser(user);
          setLoggedin(true);
          Router.push(ROUTE_HOME);
        } else {
          setUser(undefined);
          Router.push(ROUTE_AUTH);
        }
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  // sing-out the user
  const signOut = async () => await supabase.auth.signOut();

  // sign-up a user with provided details
  const signUp = async (payload: SupabaseAuthPayload) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp(payload);
      if (error) {
        alert(error.message);
      } else {
        alert(
          "Signup successful. Please check your inbox for a confirmation email!"
        );
      }
    } catch (error: any) {
      console.error(error.error_description || error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (payload: SupabaseAuthPayload) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn(payload);
      if (error) {
        alert(error.message);
      }
    } catch (error: any) {
      console.error(error.error_description || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signUp,
        signIn,
        signOut,
        loggedIn,
        loading,
        userLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
