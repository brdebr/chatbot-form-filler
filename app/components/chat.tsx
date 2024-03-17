import { cn } from "@/lib/utils";
import { theme_styles } from "../style-constants";
import { Button } from "@/components/ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { useChat } from "ai/react";
import { Message } from "ai";
import useFormStore from "../store/form";

type ChatMessageProps = {
  side: 'left' | 'right';
  message: Message;
};

export const useTypewriter = (text: string, setDisplayText: (value: React.SetStateAction<string>) => void, speed = 50) => {
  useEffect(() => {
    setDisplayText('');
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText((prevText) => prevText + text.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, speed);

    return () => {
      clearInterval(typingInterval);
    };
  }, [text, speed, setDisplayText]);
}


export function ChatMessage({ message, side }: ChatMessageProps) {
  return (
    <div
      className={cn(`
          ${side === 'left' ? 'rounded-bl' : 'rounded-br'}
          ${side === 'left' ? 'bg-blue-400 bg-opacity-40 dark:bg-blue-900 dark:bg-opacity-50': 'bg-teal-400 bg-opacity-50 dark:bg-teal-800 dark:bg-opacity-70'}
          transition-colors
          w-3/4
          whitespace-pre-line
          ${side === 'left' ? 'mr-auto' : 'ml-auto'}
          ${theme_styles.default_text_color}
          ${theme_styles.default_text_size}
          text-opacity-90 dark:text-opacity-90
          p-2
          rounded
      `)}
    >{message.content}</div>
  );
}

export type ChatMessageType = {
  content: string;
  role: 'user' | 'assistant';
};

const rolesToShow = ['user', 'assistant'];

export const Chat = React.forwardRef<HTMLDivElement, {}>((props, ref) => {
  const { formState, highlighted, setHighlighted } = useFormStore();
  const [inputIsDisabled, setInputIsDisabled] = useState(false);

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chatbot',
    experimental_onFunctionCall: async (
      chatMessages,
      functionCall,
    ) => {
      if (functionCall.name === 'get_form_state') {
        return {
          messages: [
            ...chatMessages,
            {
              id: crypto.randomUUID(),
              name: 'get_form_state',
              role: 'function',
              content: JSON.stringify(formState, null, 2),
            },
          ],
        }
      }
      if (functionCall.name === 'highlight_field') {
        console.log('highlight_field', functionCall.arguments);
        const parsedArgs = JSON.parse(functionCall.arguments || '{}');
        if (!parsedArgs.field) {
          return {
            messages: [
              ...chatMessages,
              {
                id: crypto.randomUUID(),
                name: 'highlight_field',
                role: 'function',
                content: `Error: No field provided.`,
              },
            ],
          }
        }
        setHighlighted(parsedArgs.field);
        return {
          messages: [
            ...chatMessages,
            {
              id: crypto.randomUUID(),
              name: 'highlight_field',
              role: 'function',
              content: `Highlighted field: ${parsedArgs.field}`,
            },
          ],
        }
      }
    }
  });

  const inputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!messagesContainerRef.current) {
      return;
    }
    messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
  }, [messages]);
  const messagesContainerRef = React.useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className={cn(`
        h-full
        max-h-full
        overflow-y-auto
        rounded
        ${theme_styles.bg_default}
        mt-2
        p-2
        pt-3
        flex flex-col
        gap-3
    `)}>
      <div
        ref={messagesContainerRef}
        className={cn(`
          h-[calc(100%-60px)]
          max-h-full
          -mr-1
          px-1
          pb-2
          overflow-y-scroll
          rounded
          ${theme_styles.bg_default}
          flex flex-col
          gap-3
        `)}>
        {messages.filter(el => rolesToShow.includes(el.role)).map((message, index) => (
          <ChatMessage key={index} message={message} side={message.role === 'user' ? 'right' : 'left'} />
        ))}
      </div>
      <form onSubmit={handleSubmit} className="absolute bottom-5 left-1/2 -translate-x-1/2 w-full">
        <div className="flex gap-3 items-center px-4">
          <Input ref={inputRef} value={input} onChange={handleInputChange} disabled={inputIsDisabled} placeholder="Type a message" />
          <Button type="submit" variant="outline" size="icon" disabled={!input.trim().length} className="size-10 min-w-10 min-h-10 bg-blue-500 hover:bg-blue-700 active:bg-blue-800 transition-all duration-500">
            <PaperPlaneIcon className="text-white translate-x-[1px]" />
          </Button>
        </div>
      </form>
    </div>
  );
});

Chat.displayName = 'Chat';

export const MotionChat = motion(Chat);
