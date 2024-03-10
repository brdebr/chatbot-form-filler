import { cn } from "@/lib/utils";
import { theme_styles } from "../style-constants";
import { Button } from "@/components/ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";

type ChatMessageProps = {
  side: 'left' | 'right';
  message: string;
};

export function ChatMessage({ message, side }: ChatMessageProps) {
  return (
    <div
      className={cn(`
          ${side === 'left' ? 'rounded-bl' : 'rounded-br'}
          ${side === 'left' ? 'bg-blue-200 dark:bg-blue-900': 'bg-green-300 dark:bg-green-800'}
          w-3/4
          ${side === 'left' ? 'mr-auto' : 'ml-auto'}
          ${theme_styles.default_text_color}
          ${theme_styles.default_text_size}
          text-opacity-90 dark:text-opacity-90
          p-2
          rounded
      `)}
    >
      {message}
    </div>
  );
}

export function Chat() {
  const messages = [
    'Hello',
    'How are you?',
    'I am fine, thank you.',
    'How can I help you?',
    'I need help with a form.',
    'Sure, I can help you with that.',
    '👹 Lorem impsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    '🧙‍♂️ Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.',
  ]

  return (
    <div className={cn(`
      h-full
      max-h-full
      overflow-y-auto
      rounded
      ${theme_styles.bg_default}
      mt-2
      p-2
      flex flex-col
      gap-3
  `)}>

      <div
        className={cn(`
            h-[calc(100%-45px)]
            max-h-full
            -mr-1
            px-1
            overflow-y-auto
            rounded
            ${theme_styles.bg_default}
            flex flex-col
            gap-3
        `)}
      >
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} side={index % 2 === 0 ? 'left' : 'right'} />
        ))}
      </div>
      <div className="flex gap-2 items-center absolute bottom-4 left-1/2 -translate-x-1/2 w-[95%]">
        <input type="text" className="border-2 w-full h-6" ></input>
        <Button variant="outline" size="icon" className="bg-blue-500 hover:bg-blue-700">
          <PaperPlaneIcon className="text-white" />
        </Button>
      </div>
    </div>
  );
}
