'use client';
import { Card } from "@/components/ui/card";
import { InputWithLabel } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useCallback, useState } from "react";
import { theme_styles } from "../style-constants";

export function FormToFill() {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthdate:
      new Date().toISOString().split
      ('T')[
        0
      ],
    nationality: '',
  });

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  }, [formState]);

  return (
    <Card className={cn(`
      rounded
      px-5 py-3
      flex flex-col gap-3
      ${theme_styles.default_text_color}
      ${theme_styles.default_text_size}
      ${theme_styles.card_bg_color}
    `)}>
      <div className='flex gap-3 mt-2'>
        <InputWithLabel onChange={handleInputChange} value={formState.firstName} name="firstName" aria-label='First name' />
        <InputWithLabel onChange={handleInputChange} value={formState.lastName} name="lastName" aria-label='Last name' />
      </div>
      <div className='flex gap-3 mt-2'>
        <InputWithLabel onChange={handleInputChange} value={formState.email} name="email" type='email' aria-label='Email' />
        <InputWithLabel onChange={handleInputChange} value={formState.phone} name="phone" type='phone' aria-label='Phone' />
      </div>
      <div className='flex gap-3 mt-2'>
        <InputWithLabel onChange={handleInputChange} value={formState.birthdate} name="birthdate" type='date' className='' aria-label='Birthdate' />
        <InputWithLabel onChange={handleInputChange} value={formState.nationality} name="nationality" type='text' className=' max-w-lg' aria-label='Nationality' />
      </div>
      <div className="whitespace-pre-wrap">{JSON.stringify(formState, null, 2)}</div>
    </Card>
  )
}