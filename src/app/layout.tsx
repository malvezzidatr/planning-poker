import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Planning Poker Online - Agile Estimation Tool for Scrum Teams",
  description: "Free Planning Poker online tool for Scrum and Agile teams. Estimate tasks collaboratively with real-time voting and team engagement.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Planning Poker" />
        <meta property="og:description" content="Collaborative agile estimation tool" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://planningpokerapp.com.br/" />
        <meta name="keywords" content="Planning Poker, Agile estimation, Scrum, online planning poker, agile tools" />
        <meta name="author" content="Planning Poker App" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Planning Poker - Agile Estimation Tool" />
        <meta name="twitter:description" content="Estimate tasks collaboratively with your Agile team using Planning Poker online." />
        <meta name="twitter:image" content="https://planningpokerapp.com.br/og-image.png" />
        <link rel="canonical" href="https://planningpokerapp.com.br/" />
        <Script id="ld-json" type="application/ld+json" strategy="afterInteractive">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Planning Poker",
              "url": "https://planningpokerapp.com.br/",
              "description": "Free agile estimation tool for Scrum teams to estimate tasks collaboratively.",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "All"
            }
          `}
        </Script>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-3YJ3ED0TQQ"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3YJ3ED0TQQ');
          `}
        </Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
