import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import QueryProvider from '@/components/providers/QueryProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'StayFinder — Premium Hotel Search',
    template: '%s | StayFinder',
  },
  description:
    'Discover luxury hotels, boutique resorts, and unique accommodations worldwide. Search over 500,000 properties with real-time pricing powered by Google Hotels data.',
  keywords: ['hotel search', 'luxury hotels', 'book hotel', 'hotel deals', 'travel accommodation'],
  authors: [{ name: 'StayFinder' }],
  creator: 'StayFinder',
  metadataBase: new URL('https://stayfinder.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://stayfinder.app',
    title: 'StayFinder — Premium Hotel Search',
    description: 'Discover luxury hotels and unique stays worldwide with real-time pricing.',
    siteName: 'StayFinder',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StayFinder — Premium Hotel Search',
    description: 'Discover luxury hotels and unique stays worldwide with real-time pricing.',
  },
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen antialiased font-sans overflow-x-hidden">
        <QueryProvider>
          <Navbar />
          {children}
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
