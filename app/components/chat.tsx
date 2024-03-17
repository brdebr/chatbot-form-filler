import { cn } from "@/lib/utils";
import { theme_styles } from "../style-constants";
import { Button } from "@/components/ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { useChat } from "ai/react";
import { Message } from "ai";

const mockData = {
  "firstName": "Bryan",
  "lastName": "",
  "email": "",
  "phone": "",
  "birthdate": {
    "day": "",
    "month": "",
    "year": ""
  },
  "nationality": ""
};

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

// const messagesMock: ChatMessageType[] = [
//   { content: 'Hello, How are you?', role: 'user' },
//   { content: 'I am fine, thank you. \n How can I help you?', role: 'assistant' },
//   { content: 'I need help with a form.', role: 'user' },
//   { content: 'Sure, I can help you with that.', role: 'assistant' },
//   { content: '👹 Lorem impsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', role: 'user' },
//   { content: '🧙‍♂️ Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.', role: 'assistant' },
// ]

export const Chat = React.forwardRef<HTMLDivElement, {}>((props, ref) => {
  // const [messages, setMessages] = useState<ChatMessageType[]>([]);
  // const [chatInput, setChatInput] = useState('');
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
              content: JSON.stringify(mockData, null, 2),
            },
          ],
        }
      }
    }
  });

  // const handleChatInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setChatInput(e.target.value);
  // }

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (chatInput.trim() === '') return;

  //   setMessages([...messages, {
  //     content: chatInput,
  //     role: 'user',
  //   }]);
  //   setChatInput('');
  //   inputRef.current?.blur();
  // }
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
        {messages.map((message, index) => (
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
