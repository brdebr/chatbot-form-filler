import { cn } from "@/lib/utils";
import { theme_styles } from "../style-constants";
import { Button } from "@/components/ui/button";
import { PaperPlaneIcon, ReloadIcon, StopIcon } from "@radix-ui/react-icons";
import React, { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { useChat } from "ai/react";
import { Message } from "ai";
import useFormStore from "../store/form";
import { v4 as uuid } from 'uuid';
import { LoadingIcon } from "./utils/loading-icon";

type ChatMessageProps = {
  side: 'left' | 'right';
  message: Message;
};

const rolesMap: Record<Message['role'], string> = {
  user: 'You',
  assistant: 'Assistant',
  system: 'System prompt',
  function: 'Function output',
  data: 'Data',
  tool: 'Tool',
};

export function ChatMessage({ message, side }: ChatMessageProps) {
  const content = message.content ? message.content : (
    <pre>{JSON.stringify(message, null, 2)}</pre>
  );
  return (
    <div
      className={cn(`
          ${side === 'left' ? 'rounded-r mr-auto' : 'rounded-r ml-auto'}
          ${message.role === 'user' ? 'bg-teal-400 bg-opacity-50 dark:bg-teal-800 dark:bg-opacity-70' : ''}
          ${message.role === 'assistant' ? 'bg-blue-400 bg-opacity-40 dark:bg-blue-900 dark:bg-opacity-50' : ''}
          ${message.role === 'system' ? 'bg-gray-400 bg-opacity-50 dark:bg-gray-800 dark:bg-opacity-70 !text-sm whitespace-break-spaces' : ''}
          ${message.role === 'function' ? 'bg-yellow-400 bg-opacity-50 dark:bg-yellow-800 dark:bg-opacity-70 whitespace-pre !text-sm' : ''}
          transition-colors
          w-3/4
          ${theme_styles.default_text_color}
          ${theme_styles.default_text_size}
          text-opacity-90 dark:text-opacity-90
          p-2
      `)}
    >
      <div className="px-1 text-xs mb-2 font-medium tracking-wide border-b border-black border-opacity-5 dark:border-white dark:border-opacity-20 pb-1">
        {rolesMap[message.role]} - {(message.createdAt || new Date()).toLocaleTimeString()}
      </div>
      <div>
        {content}
      </div>
    </div>
  );
}

export type ChatMessageType = {
  content: string;
  role: 'user' | 'assistant';
};

const rolesToShow = ['user', 'assistant'];

export const Chat = React.forwardRef<HTMLDivElement, {debug: boolean}>(({ debug }, ref) => {
  const { formState, highlighted, setHighlighted, setFormFieldTypewriting, setFormField } = useFormStore();

  const { messages, input, handleInputChange, handleSubmit, reload, isLoading, stop } = useChat({
    api: '/api/chatbot',
    initialMessages: [
      {
        id: uuid(),
        createdAt: new Date(Date.now() - 3000),
        role: 'system',
        content: 'You are an assistant in charge of helping the user fill a form.\nAt first you must call the function `get_form_state` to get the current form state.\nYou must ask the user for all the information that is missing to fill the form, until is complete.\nYou must validate that the user provides correct information.If the information is not valid you should inform the user and ask to try again.\nYOU ALWAYS ANSWER IN TEXT FORMAT, NEVER MARKDOWN.'
      },
      {
        id: uuid(),
        createdAt: new Date(Date.now() - 2000),
        role: 'function',
        name: 'get_form_state',
        content: JSON.stringify({
          current_form_state: formState,
          highlighted_field: highlighted
        }, null, 2),
      },
      {
        id: uuid(),
        createdAt: new Date(Date.now() - 1000),
        role: 'assistant',
        content: 'Hello! I am here to help you fill the form. Shall we start?'
      }
    ],
    experimental_onFunctionCall: async (
      chatMessages,
      functionCall,
    ) => {
      if (functionCall.name === 'get_form_state') {
        return {
          messages: [
            ...chatMessages,
            {
              id: uuid(),
              name: 'get_form_state',
              role: 'function',
              content: JSON.stringify({
                highlighted_field: highlighted,
                current_form_state: formState
              }, null, 2),
            },
          ],
        }
      }
      if (functionCall.name === 'highlight_field') {
        const parsedArgs = JSON.parse(functionCall.arguments || '{}');
        if (!parsedArgs.field) {
          return {
            messages: [
              ...chatMessages,
              {
                id: uuid(),
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
              id: uuid(),
              name: 'highlight_field',
              role: 'function',
              content: JSON.stringify({
                highlighted_field: highlighted,
              }, null, 2),
            },
          ],
        }
      }
      if (functionCall.name === 'insert_into_field') {
        const parsedArgs = JSON.parse(functionCall.arguments || '{}');
        if (!parsedArgs.field || !parsedArgs.value) {
          return {
            messages: [
              ...chatMessages,
              {
                id: uuid(),
                name: 'insert_into_field',
                role: 'function',
                content: `Error: No field or value provided.`,
              },
            ],
          }
        }
        setFormField(parsedArgs.field, '');
        const newState = setFormFieldTypewriting(parsedArgs.field, parsedArgs.value);
        return {
          messages: [
            ...chatMessages,
            {
              id: uuid(),
              name: 'insert_into_field',
              role: 'function',
              content: `Inserted value "${parsedArgs.value}" into field "${parsedArgs.field}".\nThe form state is now:\n${JSON.stringify({highlighted_field: newState.formState}, null, 2)}`,
            },
          ],
        }
      }
    }
  });

  const messagesToShow = !debug ? messages.filter((message) => rolesToShow.includes(message.role) && message.content) : messages;

  const inputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!messagesContainerRef.current) {
      return;
    }
    messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
  }, [messagesToShow]);
  const messagesContainerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      setHighlighted('');
    }
  }, [setHighlighted]);

  const inputIsEmpty = !input.trim().length;
  const canReload = inputIsEmpty && !!messages.filter((message) => message.role === 'user').length;

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
        {messagesToShow.map((message, index) => (
          <ChatMessage key={index} message={message} side={message.role === 'user' ? 'right' : 'left'} />
        ))}
      </div>
      <form onSubmit={handleSubmit} className="absolute bottom-5 left-1/2 -translate-x-1/2 w-full">
        <div className="flex gap-3 items-center px-4">
          <Input ref={inputRef} value={input} onChange={handleInputChange} disabled={isLoading} placeholder="Type a message" />
          {!isLoading ? (
            <Button type={canReload ? "submit" : "button"} onClick={() => canReload ? reload() : false} variant="outline" size="icon" className="size-10 min-w-10 min-h-10 bg-blue-500 hover:bg-blue-700 active:bg-blue-800 transition-all duration-500">
              {!canReload ? (
                <PaperPlaneIcon className="text-white translate-x-[1px]" />
              ) : (
                <ReloadIcon className="text-white" />
              )}
            </Button>
          ): (
            <Button type="button" onClick={stop} variant="outline" size="icon" className="size-10 min-w-10 min-h-10 group bg-blue-500 hover:bg-red-800 active:bg-blue-800 transition-all duration-500">
              <LoadingIcon className="text-white group-hover:hidden" />
              <StopIcon className="text-white hidden group-hover:block" />
            </Button>
          )}
        </div>
      </form>
    </div>
  );
});

Chat.displayName = 'Chat';

export const MotionChat = motion(Chat);
