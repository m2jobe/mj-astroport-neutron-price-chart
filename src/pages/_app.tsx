// This file is used to initialize pages. It wraps every page component in our application.
// We can use it to include global CSS styles, set up context providers, or initialize components that should persist across navigation.

import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
