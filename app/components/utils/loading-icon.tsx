import { cn } from '@/lib/utils';
import { UpdateIcon } from '@radix-ui/react-icons';
import React from 'react';

export function LoadingIcon({className}: {className?: string}) {
  return (
    <UpdateIcon className={cn("text-white animate-spin", className)} />
  );
}