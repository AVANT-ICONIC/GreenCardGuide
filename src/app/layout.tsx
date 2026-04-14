import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Consular Prep',
  description:
    'Bilingual, source-backed immigrant visa interview preparation for Ciudad Juarez family-based cases.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
