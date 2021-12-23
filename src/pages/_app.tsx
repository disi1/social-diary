import '../styles/globals.css';
import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app';
import { AuthProvider } from '../lib/auth';
import React from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
