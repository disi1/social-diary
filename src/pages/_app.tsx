import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../lib/auth";
import React, {useEffect} from "react";
import { CategoryProvider } from "../lib/category";
import { PriorityProvider } from "../lib/priority";
import { ContactProvider } from "../lib/contact";
import { LogProvider } from "../lib/log";
import {supabase} from "../lib";
import {AuthChangeEvent, Session} from "@supabase/gotrue-js";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      updateSupabaseCookie(event, session);
    });

    return () => {
      authListener?.unsubscribe();
    };
  });

  async function updateSupabaseCookie(event: AuthChangeEvent, session: Session | null) {
    await fetch('/api/auth', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify({ event, session }),
    });
  }

  return (
    <AuthProvider>
      <ContactProvider>
        <CategoryProvider>
          <PriorityProvider>
            <LogProvider>
              <Component {...pageProps} />
            </LogProvider>
          </PriorityProvider>
        </CategoryProvider>
      </ContactProvider>
    </AuthProvider>
  );
}

export default MyApp;
