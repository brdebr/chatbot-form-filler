import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { theme_styles } from './style-constants';
import { AppProviders } from './providers/app-provider';
import ThemeSwitch from './components/theme-switch';
import { APP_VERSION_HASH, isProd, metadataObj } from './constants';
import { cn } from '@/lib/utils';

const font = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = metadataObj;

const faviconLink = (favicon: string, size = 80) => (
  <link rel="icon" href={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%22${size}%22>${favicon}</text></svg>`}></link>
)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='dark'>
      {isProd ? faviconLink('🤖') : faviconLink('🚧')}
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
