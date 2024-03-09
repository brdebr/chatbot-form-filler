import { cn } from '@/lib/utils';
import { TypographyH1 } from './components/basic/h1';
import { theme_styles } from './style-constants';

export default function Home() {
  return (
    <div className={cn(`
      container
      px-4 sm:px-0
    `)}>
      <TypographyH1 className='mt-6 mb-8' centered>
        Chatbot Form Filler
      </TypographyH1>
      <div className={cn(`
        text-center
        border rounded
        ${theme_styles.default_text_color}
        ${theme_styles.card_bg_color}
        px-5 py-3
      `)}>
        This is a demo showcasing the use of Vercel AI SDK to fill out a form using a chatbot.
      </div>
    </div>
  );
}
