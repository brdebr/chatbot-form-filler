'use client';
import { Button } from "@/components/ui/button";
import { ChatBubbleIcon, Cross2Icon } from '@radix-ui/react-icons';
import { cn } from "@/lib/utils";
import { useWasMounted } from "../hooks/utils";
import { LoadingIcon } from "./utils/loading-icon";
import { useState } from "react";
import { TypographyH4 } from "./basic/h4";
import { theme_styles } from "../style-constants";
import { Chat } from "./chat";

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
      <div className={cn(`
        rounded-md
        fixed bottom-4 right-4
        max-h-[80dvh] max-w-[80dvw]
        w-[450px] h-[550px]
        bg-violet-800
        dark:bg-purple-900
        text-white
        p-2
        flex flex-col
      `)}>
        <div className={cn(`
          flex justify-between items-center
          pl-3
        `)}>
          <TypographyH4 className="dark">
            Chat with the bot
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
      </div>
    )
  }

  return (
    <Button
      onClick={openChat}
      variant='outline'
      size='icon'
      className={cn(`
        fixed bottom-4 right-4
        size-14
        bg-violet-800 hover:bg-violet-600
        dark:bg-purple-900 dark:hover:bg-purple-700
        text-white hover:text-white
        p-2
      `)}>
      {wasMounted ? <ChatBubbleIcon fontSize={23} /> : <LoadingIcon/> }
    </Button>
  );
}