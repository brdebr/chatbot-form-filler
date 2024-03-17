

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
    text-sm lg:text-base
  ` as const,
  default_input_border: `
    border
    border-slate-200
    dark:border-slate-800
    outline-none
  ` as const,
  default_input_bg: `
    bg-slate-50 dark:bg-slate-800
  ` as const,
}

export { theme_styles }