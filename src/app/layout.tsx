import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tool-pilot.in"),
  title: {
    default: "ToolPilot — Free Online Calculators & Developer Tools",
    template: "%s | ToolPilot",
  },
  description:
    "Free online calculators and developer tools. EMI, SIP, GST, mortgage calculators, JSON formatter, color palette generator, regex tester, and more.",
  keywords: [
    "online calculator",
    "EMI calculator",
    "SIP calculator",
    "JSON formatter",
    "developer tools",
    "free tools",
    "mortgage calculator",
    "BMI calculator",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "ToolPilot",
    title: "ToolPilot — Free Online Calculators & Developer Tools",
    description:
      "Free online calculators and developer tools. Fast, accurate, no sign-up required.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ToolPilot — Free Online Calculators & Developer Tools",
    description:
      "Free online calculators and developer tools. Fast, accurate, no sign-up required.",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "eEJpL0c585fb3SYWXmn-B6pU5SZRHAsWqrClIoopxlk",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            strategy="afterInteractive"
          />
        )}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <Script id="ga" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID}');`}
          </Script>
        )}
        {process.env.NEXT_PUBLIC_ADSENSE_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="min-h-[calc(100vh-4rem)]">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
