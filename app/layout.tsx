import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { theme_styles } from './style-constants';
import { AppProviders } from './providers/app-provider';
import ThemeSwitch from './components/theme-switch';
import { metadataObj } from './constants';

const font = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = metadataObj;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='dark'>
      <body className={font.className}>
        <AppProviders>
          <ThemeSwitch />
          <main className={`
            flex flex-col
            items-center
            justify-between
            min-h-[100dvh]
            ${theme_styles.default_text_color}
            ${theme_styles.bg_default}
            `}
          >
            {children}
          </main>
        </AppProviders>
      </body>
    </html>
  );
}
