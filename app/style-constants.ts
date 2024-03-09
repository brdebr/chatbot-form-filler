

const theme_styles = /*ui*/ {
  bg_default: `
  bg-zinc-50 dark:bg-slate-900
    transition-colors duration-700
  `,
  default_text_color: `
    text-black dark:text-white
    transition-colors duration-1000
  `,
  header: `
    text-3xl
    font-bold
    text-center
  `,
  switch_theme_button_bg: `
    transition duration-700
    text-white dark:text-black
    bg-slate-400 hover:bg-slate-300
    dark:bg-zinc-300 dark:hover:bg-white
    active:bg-slate-500 dark:active:bg-zinc-400
    ring-offset-1
    focus:dark:ring-1 focus:dark:ring-sky-400
    focus:ring-1 focus:ring-sky-800
  `,
}

export { theme_styles }