

const theme_styles = /*ui*/ {
  bg_default: `
  bg-zinc-50 dark:bg-slate-900
    transition-colors duration-700
  ` as const,
  card_bg_color: `
    bg-white dark:bg-slate-950
    transition-colors duration-500
  ` as const,
  default_text_color: `
    text-black dark:text-white
    transition-colors duration-[450ms]
  ` as const,
  default_text_size: `
    text-sm sm:text-base
  ` as const,
}

export { theme_styles }