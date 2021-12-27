import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../lib/auth";
import React from "react";
import { CategoryProvider } from "../lib/category";
import { PriorityProvider } from "../lib/priority";
import { ContactProvider } from "../lib/contact";
import { LogProvider } from "../lib/log";

function MyApp({ Component, pageProps }: AppProps) {
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
