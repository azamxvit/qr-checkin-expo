import React from "react";

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="theme-color" content="#000000" />
        <title>KasipQR</title>
        <style
          dangerouslySetInnerHTML={{
            __html: `
          html, body { height: 100%; margin: 0; padding: 0; background-color: #000000; }
          #root { height: 100%; }
        `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
