import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { GlobalNavbar } from '@/components/GlobalNavbar';
import { ProgressProvider } from '@/components/ProgressProvider';
import { ThemeProvider } from '@/components/ThemeProvider';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  display: 'swap',
});

/**
 * Viewport configuration - separated from metadata in Next.js 14+
 * This ensures proper viewport settings for mobile devices
 */
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://coding-drills.vercel.app'),
  title: {
    default: 'Code Drills - Master Programming Methods',
    template: '%s | Code Drills',
  },
  description:
    'Sharpen your coding skills with focused drills across JavaScript, Python, Java, C++, and more. Practice array methods, string manipulation, and essential algorithms.',
  keywords: [
    'coding',
    'programming',
    'drills',
    'practice',
    'javascript',
    'python',
    'java',
    'algorithms',
    'typescript',
    'coding practice',
    'learn to code',
  ],
  authors: [{ name: 'Code Drills' }],
  creator: 'Code Drills',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Code Drills - Master Programming Methods',
    description:
      'Sharpen your coding skills with focused drills across multiple programming languages.',
    type: 'website',
    siteName: 'Code Drills',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Code Drills - Master Programming Methods',
    description:
      'Sharpen your coding skills with focused drills across multiple programming languages.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        <ErrorBoundary showDetails={process.env.NODE_ENV === 'development'}>
          <ThemeProvider defaultTheme="dark">
            <ProgressProvider>
              <GlobalNavbar />
              {children}
            </ProgressProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
