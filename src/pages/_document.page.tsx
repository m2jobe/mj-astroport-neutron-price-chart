// This file is used to customize the HTML document served by our application.
// We can use it to add custom meta tags, stylesheets, or scripts that should be included on every page.

import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
