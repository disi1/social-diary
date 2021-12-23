import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../lib/auth";
import React from "react";
import { CategoryProvider } from "../lib/category";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <CategoryProvider>
        <Component {...pageProps} />
      </CategoryProvider>
    </AuthProvider>
  );
}

export default MyApp;
