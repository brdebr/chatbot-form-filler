'use client';
import { theme_styles } from '@/app/style-constants';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from "class-variance-authority"
import React, { ReactNode } from 'react';

const TypographyH1Variants = cva(
  `
    text-lg
    md:text-3xl
    font-semibold
    tracking-tight
    ${theme_styles.default_text_color}
  `,
  {
    variants: {
      variant: {},
      centered: {
        true: 'text-center',
      },
      underlined: {
        true: 'border-b pb-2'
      }
    },
    defaultVariants: {},
  }
);

type TypographyH1Props = {
  className?: string;
  children: ReactNode;
} & VariantProps<typeof TypographyH1Variants>


export function TypographyH1({ className, children, ...rest }: TypographyH1Props) {
  return (
    <h1 className={cn(TypographyH1Variants({ ...rest, className}))}>
      {children}
    </h1>
  );
}
