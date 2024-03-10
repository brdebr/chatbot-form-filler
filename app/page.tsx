import { cn } from '@/lib/utils';
import { TypographyH1 } from './components/basic/h1';
import { theme_styles } from './style-constants';
import { Card } from '@/components/ui/card';
import { ChatTriggerButton } from './components/chat-trigger-button';

export default function Home() {
  return (
    <div className={cn(`
      container
      max-w-5xl
      px-2 sm:px4 md:px-6
    `)}>
      <ChatTriggerButton />
      <TypographyH1
        className={cn(`
          mt-6
          mb-4 md:mb-6
        `)}
        centered
        underlined
      >
        Chatbot Form Filler
      </TypographyH1>
      <Card className={`
        rounded
        px-5 py-3
        text-center
        ${theme_styles.default_text_color}
        ${theme_styles.default_text_size}
        ${theme_styles.card_bg_color}
      `}>
        This is a demo showcasing the use of Vercel AI SDK to fill out a form using a chatbot.
      </Card>
    </div>
  );
}
