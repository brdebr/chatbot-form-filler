import { Button } from "@/components/ui/button";
import { ChatBubbleIcon } from '@radix-ui/react-icons';
import { cn } from "@/lib/utils";

export function ChatTriggerButton(props: {
  onClick?: () => void;
}) {
  return (
    <Button
      onClick={props.onClick}
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
      <ChatBubbleIcon fontSize={23} />
    </Button>
  );
}