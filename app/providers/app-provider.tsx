import { DarkModeProvider } from "./dark-mode-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <DarkModeProvider>
      {children}
    </DarkModeProvider>
  );
}