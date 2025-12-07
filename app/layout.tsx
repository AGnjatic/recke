import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RECKE - LinkedIn Puzzle Tracker | Track Zip & Queens Scores",
  description: "The ultimate score tracking app for LinkedIn puzzle games. Compete with colleagues in Zip and Queens, visualize trends, and climb the leaderboards. Free and secure.",
  keywords: ["LinkedIn", "Puzzle", "Tracker", "Zip", "Queens", "Score", "Leaderboard", "Competition", "Games"],
  authors: [{ name: "RECKE" }],
  creator: "RECKE",
  publisher: "RECKE",
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  
  // Open Graph (LinkedIn, Facebook, etc.)
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'RECKE - LinkedIn Puzzle Tracker',
    description: 'Track your LinkedIn puzzle scores with colleagues. Compete in Zip & Queens, visualize trends, and see who\'s the ultimate puzzle champion!',
    siteName: 'RECKE',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'RECKE - LinkedIn Puzzle Tracker',
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'RECKE - LinkedIn Puzzle Tracker',
    description: 'Track your LinkedIn puzzle scores with colleagues. Compete in Zip & Queens!',
    images: ['/og-image.png'],
  },

  // Icons
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180' },
    ],
  },

  // Additional
  manifest: '/manifest.json',
  robots: {
    index: true,
    follow: true,
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
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
