import { cn } from "@/lib/utils";
import { theme_styles } from "../style-constants";

type ChatMessageProps = {
  side: 'left' | 'right';
  message: string;
};

export function ChatMessage({ message, side }: ChatMessageProps) {
  return (
    <div
      className={cn(`
          ${side === 'left' ? 'rounded-bl' : 'rounded-br'}
          ${side === 'left' ? 'bg-blue-300' : 'bg-green-400'}
          w-3/4
          ${side === 'left' ? 'mr-auto' : 'ml-auto'}
          ${theme_styles.default_text_color}
          ${theme_styles.default_text_size}
          p-2
          rounded
          mb-2
      `)}
    >
      {message}
    </div>
  );
}

export function Chat() {
  const messages = ['Hello', 'How are you?', 'I am fine, thank you.'];
  return (
    <div
      className={cn(`
          h-full
          rounded
          ${theme_styles.bg_default}
          mt-3
          p-2
      `)}
    >
      {messages.map((message, index) => (
        <ChatMessage key={index} message={message} side={index % 2 === 0 ? 'left' : 'right'} />
      ))}
    </div>
  );
}
