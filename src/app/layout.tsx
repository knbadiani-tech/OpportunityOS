import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import DashboardLayout from '@/components/layout/DashboardLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'OpportunityOS | Founder Opportunity Discovery Engine',
  description: 'Predictive trend radar for the Indian wellness market.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen antialiased selection:bg-primary/30 selection:text-primary`}>
        <DashboardLayout>{children}</DashboardLayout>
      </body>
    </html>
  );
}
