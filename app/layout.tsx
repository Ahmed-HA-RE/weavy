import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { APP_NAME, APP_URL } from '@/lib/constants/app';

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: `${APP_NAME} is a social platform for sharing posts, real-time conversations, and connecting with others through a fast, clean, and intuitive experience.`,
  openGraph: {
    title: APP_NAME,
    description: `${APP_NAME} is a social platform for sharing posts, real-time conversations, and connecting with others through a fast, clean, and intuitive experience.`,
    url: APP_URL,
    type: 'website',
    siteName: APP_NAME,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
