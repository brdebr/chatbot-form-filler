import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { theme_styles } from './style-constants';
import { AppProviders } from './providers/app-provider';
import ThemeSwitch from './components/theme-switch';
import { metadataObj } from './constants';
import { cn } from '@/lib/utils';
import { FaviconLinkTag } from './components/utils/favicon-link-tag';
import { APP_VERSION_HASH } from './hooks/functions';

export const metadata: Metadata = metadataObj;

const font = Montserrat({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='dark'>
      <FaviconLinkTag />
      <body className={font.className}>
        <AppProviders>
          <main className={cn(`
              flex flex-col
              items-center
              min-h-[100dvh]
              ${theme_styles.bg_default}
              `)}
              data-meta-app-version={APP_VERSION_HASH}
          >
            <ThemeSwitch />
            {children}
          </main>
        </AppProviders>
      </body>
    </html>
  );
}
