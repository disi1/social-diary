import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../lib/auth";
import React from "react";
import { CategoryProvider } from "../lib/category";
import { PriorityProvider } from "../lib/priority";
import { ContactProvider } from "../lib/contact";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ContactProvider>
        <CategoryProvider>
          <PriorityProvider>
            <Component {...pageProps} />
          </PriorityProvider>
        </CategoryProvider>
      </ContactProvider>
    </AuthProvider>
  );
}

export default MyApp;
