

const theme_styles = /*ui*/ {
  bg_default: `
  bg-zinc-50 dark:bg-slate-900
    transition-colors duration-700
  `,
  card_bg_color: `
    bg-white dark:bg-zinc-400
    transition-colors duration-500
  `,
  default_text_color: `
    text-black dark:text-white
    transition-colors duration-[450ms]
  `,
  header: `
    text-3xl
    font-bold
    text-center
  `,
  switch_theme_button_bg: `
    transition duration-300
    text-white dark:text-black

    bg-stone-100 hover:bg-stone-300
    dark:bg-zinc-400 dark:hover:bg-stone-300
    active:bg-slate-500 dark:active:bg-zinc-400

    border
    border-stone-300 dark:border-zinc-300

    ring-offset-1
    focus:dark:ring-1 focus:dark:ring-stone-400
    focus:ring-2 focus:ring-sky-800
  `,
}

export { theme_styles }