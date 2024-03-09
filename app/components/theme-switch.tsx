'use client';
import { useDarkMode } from "@/lib/useDarkMode";
import { theme_styles } from "../style-constants";
import { useWasMounted } from "@/lib/utils";
import { Button } from "@/components/ui/button"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

const ThemeSwitch = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const wasMounted = useWasMounted();
  const moonIcon = (
    <MoonIcon className="text-white" />
  )
  const sunIcon = (
    <SunIcon />
  )
  const content = wasMounted ? (
    isDarkMode ? moonIcon : sunIcon
  ) : '';

  return (
    <Button
      onClick={toggleDarkMode}
      variant="outline" size="icon"
      className={`
        fixed top-4 right-4
        size-10
        p-2
        ${wasMounted ? 'opacity-100' : 'opacity-0'}
      `}
      aria-label="Toggle theme"
    >
      {content}
    </Button>
  );
};

export default ThemeSwitch;
