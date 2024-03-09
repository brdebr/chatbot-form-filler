import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { theme_styles } from './style-constants';
import { AppProviders } from './providers/app-provider';
import ThemeSwitch from './components/theme-switch';
import { metadataObj } from './constants';
import { cn } from '@/lib/utils';

const font = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = metadataObj;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='dark'>
      <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2280%22>🤖</text></svg>"></link>
      <body className={font.className}>
        <AppProviders>
          <ThemeSwitch />
          <main className={cn(`
              flex flex-col
              items-center
              min-h-[100dvh]
              ${theme_styles.bg_default}
            `)}
          >
            {children}
          </main>
        </AppProviders>
      </body>
    </html>
  );
}
