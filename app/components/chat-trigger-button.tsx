'use client';
import { Button, buttonVariants } from "@/components/ui/button";
import { ChatBubbleIcon, Cross2Icon } from '@radix-ui/react-icons';
import { cn } from "@/lib/utils";
import { useWasMounted } from "../hooks/utils";
import { LoadingIcon } from "./utils/loading-icon";
import { useState } from "react";
import { TypographyH4 } from "./basic/h4";
import { Chat } from "./chat";
import { motion } from "framer-motion";

const MotionChatBubble = motion(ChatBubbleIcon);

export function ChatTriggerButton(props: {
  onClick?: () => void;
}) {
  const wasMounted = useWasMounted();
  const [isChatOpen, setIsChatOpen] = useState(false);

  const openChat = () => {
    setIsChatOpen(true);
  }

  if (isChatOpen) {
    return (
      <motion.div
        layoutId="chat-container"
        className={cn(`
          rounded-md
          fixed bottom-4 right-4
          h-[550px] lg:h-[650px]
          max-h-[80dvh]
          max-w-[85vw] sm:max-w-[75vw] md:max-w-[65vw] lg:max-w-[45vw]
          min-w-[85vw] sm:min-w-[75vw] md:min-w-[65vw] lg:min-w-[45vw]
          bg-violet-800
          dark:bg-purple-900
          text-white
          p-2
          flex flex-col
        `)}
      >
        <div className={cn(`
          flex justify-between items-center
        `)}>
          <TypographyH4 className="dark ml-1">
            <span className="inline-block mr-3">🤖</span>
            Chat with assistant
          </TypographyH4>
          <Button
            onClick={() => setIsChatOpen(false)}
            variant='outline'
            size='icon'
            className={cn(`
              bg-violet-800 hover:bg-violet-600
              dark:bg-purple-900 dark:hover:bg-purple-700
              text-white hover:text-white
              p-2
            `)}
          >
            <Cross2Icon fontSize={23} />
          </Button>
        </div>
        <Chat />
      </motion.div>
    )
  }

  return (
    <motion.button
      onClick={openChat}
      layoutId="chat-container"
      transition={{
        delay: 0,
      }}
      className={
        cn(
          buttonVariants(
            {
              variant: 'outline',
              size: 'icon',
              className: cn(`
                fixed bottom-4 right-4
                size-14
              bg-violet-800 hover:bg-violet-600
              dark:bg-purple-900 dark:hover:bg-purple-700
              text-white hover:text-white
                p-2
              `)
            }
          )
        )
      }
      >
      {wasMounted ?
      <MotionChatBubble
        className="max-w-[20px] max-h-[20px]"
        initial={{
          opacity: 0,
          scale: 3,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          delay: 0.25,
        }}
        fontSize={23}
      /> : <LoadingIcon/> }
    </motion.button>
  );
}