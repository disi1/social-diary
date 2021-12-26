import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../lib/auth";
import React from "react";
import { CategoryProvider } from "../lib/category";
import { PriorityProvider } from "../lib/priority";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <CategoryProvider>
        <PriorityProvider>
          <Component {...pageProps} />
        </PriorityProvider>
      </CategoryProvider>
    </AuthProvider>
  );
}

export default MyApp;
