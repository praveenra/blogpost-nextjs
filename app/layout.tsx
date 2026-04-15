import type { Metadata } from 'next';
import './globals.scss';

export const metadata: Metadata = {
  title: 'Blog Platform',
  description: 'A modern blog built with Next.js and React',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
