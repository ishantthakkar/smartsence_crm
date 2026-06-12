import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "SmartSense CRM :: Administrative Panel",
  description: "Administrative Panel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback" />
        <link rel="stylesheet" href="/plugins/fontawesome-free/css/all.min.css" />
        <link rel="stylesheet" href="/css/adminlte.min.css" />
        <link rel="stylesheet" href="/css/custom.css" />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Script src="/plugins/jquery/jquery.min.js" strategy="beforeInteractive" />
        <Script src="/plugins/bootstrap/js/bootstrap.bundle.min.js" strategy="lazyOnload" />
        <Script src="/js/adminlte.min.js" strategy="lazyOnload" />
        <Script src="/js/demo.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
