import type { Metadata } from 'next';
import { Geist, Geist_Mono, Codystar, Outfit } from 'next/font/google';
import './globals.css';
import QueryProvider from '@/components/QueryProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const codyStar = Codystar({
  variable: '--font-codystar',
  subsets: ['latin'],
  weight: '300',
});

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = {
  title: 'Happy 30s babe ❤️',
  description: '30 petites et moyennes surprises à ouvrir au fil de tes envies',
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon.ico',
    apple: '/favicon/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${codyStar.variable} ${outfit.variable}`}
        suppressHydrationWarning
      >
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
