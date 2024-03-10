'use client';
import { useDarkMode } from "@/lib/useDarkMode";
import { Button } from "@/components/ui/button"
import { MoonIcon, SunIcon, UpdateIcon } from "@radix-ui/react-icons";
import { useWasMounted } from "../hooks/utils";
import { cn } from "@/lib/utils";
import { LoadingIcon } from "./utils/loading-icon";

const ThemeSwitch = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const wasMounted = useWasMounted();
  const moonIcon = (
    <MoonIcon className="text-white" />
  )
  const sunIcon = (
    <SunIcon />
  )
  const loadingIcon = (
    <LoadingIcon />
  )
  const content = wasMounted ? (
    isDarkMode ? moonIcon : sunIcon
  ) : loadingIcon;

  return (
    <Button
      onClick={toggleDarkMode}
      variant="outline" size="icon"
      disabled={!wasMounted}
      className={cn(`
        fixed top-4 right-4
        size-10
        p-2
      `)}
      aria-label="Toggle theme"
    >
      {content}
    </Button>
  );
};

export default ThemeSwitch;
