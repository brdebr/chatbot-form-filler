'use client'
import { useDarkMode } from "@/lib/useDarkMode";
import { theme_styles } from "../style-constants";
import { useWasMounted } from "@/lib/utils";

const ThemeSwitch = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const wasMounted = useWasMounted();
  const content = wasMounted ? (
    isDarkMode ? '🌑' : '☀️'
  ) : '';

  return (
    <button
      onClick={toggleDarkMode}
      tabIndex={0}
      className={`
        fixed top-4 right-4
        size-10
        p-2
        ${wasMounted ? 'opacity-100' : 'opacity-0'}
        ${theme_styles.switch_theme_button_bg}
        rounded
      `}
      aria-label="Toggle theme"
    >
      {content}
    </button>
  );
};

export default ThemeSwitch;
