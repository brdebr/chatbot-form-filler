'use client';
import { theme_styles } from '@/app/style-constants';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from "class-variance-authority"
import React, { ReactNode } from 'react';

const TypographyH4Variants = cva(
  `
    text-lg
    md:text-lg
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
        true: ''
      }
    },
    defaultVariants: {},
  }
);

type TypographyH4Props = {
  className?: string;
  children: ReactNode;
} & VariantProps<typeof TypographyH4Variants>


export function TypographyH4({ className, children, ...rest }: TypographyH4Props) {
  
  return (
    <h4 className={cn(TypographyH4Variants({ ...rest, className}))}>
      <span className={cn(TypographyH4Variants({underlined: rest.underlined}))}>
        {children}
      </span>
    </h4>
  );
}
