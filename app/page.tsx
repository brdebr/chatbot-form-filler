import { theme_styles } from './style-constants';

export default function Home() {
  return (
    <div className={`
      container
      px-4 sm:px-0
    `}>
      <h1
        className={`
          ${theme_styles.header}
          ${theme_styles.default_text_color}
          mt-6
          mb-8
        `}
      >
        Chatbot Form Filler
      </h1>
      <div className={`
        text-center
        border rounded
        ${theme_styles.default_text_color}
        ${theme_styles.card_bg_color}
        px-5 py-3
      `}>
        This is a demo showcasing the use of Vercel AI SDK to fill out a form using a chatbot.
      </div>
    </div>
  );
}
