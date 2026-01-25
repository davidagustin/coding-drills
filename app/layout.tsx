import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ProgressProvider } from "@/components/ProgressProvider";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Code Drills - Master Programming Methods",
  description: "Sharpen your coding skills with focused drills across JavaScript, Python, Java, C++, and more. Practice array methods, string manipulation, and essential algorithms.",
  keywords: ["coding", "programming", "drills", "practice", "javascript", "python", "java", "algorithms"],
  authors: [{ name: "Code Drills" }],
  openGraph: {
    title: "Code Drills - Master Programming Methods",
    description: "Sharpen your coding skills with focused drills across multiple programming languages.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#09090b" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ErrorBoundary showDetails={process.env.NODE_ENV === "development"}>
          <ThemeProvider defaultTheme="dark">
            <ProgressProvider>
              {children}
            </ProgressProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
