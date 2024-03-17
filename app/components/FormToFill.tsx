'use client';
import { Card } from "@/components/ui/card";
import { InputWithLabel } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useId } from "react";
import { theme_styles } from "../style-constants";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useFormStore from "../store/form";

const days = Array.from({ length: 31 }, (_, i) => `${i + 1}`);
const months = Array.from({ length: 12 }, (_, i) => `${i + 1}`);
const years = Array.from({ length: 100 }, (_, i) => `${2020 - i}`);

function leftPadZero(num: string) {
  return num.length === 1 ? `0${num}` : num;
}

type DateSelectorProps = {
  name: string;
  values: string[];
  value: string;
  setValue: (value: string) => void;
};

function DateSelector({ value, setValue, name, values }: DateSelectorProps) {
  const accessibilityId = useId();
  return (
    <div className={cn('grid w-full items-center gap-1')}>
      <label className={cn(`
        ${theme_styles.default_text_color}
        font-medium
        tracking-wide
        text-sm
        pl-1
      `)} htmlFor={accessibilityId}>
        {name}
      </label>
      <Select onValueChange={setValue} value={value}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {values.map((value) => (
            <SelectItem key={value} value={value}>
              {leftPadZero(value)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function FormToFill() {
  const { formState, handleDateChange, handleInputChange, highlighted } = useFormStore();

  return (
    <Card className={cn(`
      rounded
      px-5 py-3
      flex flex-col gap-5
      ${theme_styles.default_text_color}
      ${theme_styles.default_text_size}
      ${theme_styles.card_bg_color}
    `)}>
      <div className='flex flex-col sm:flex-row gap-3'>
        <InputWithLabel
          onChange={handleInputChange}
          value={formState.firstName}
          name="firstName"
          aria-label='First name'
          highlight={highlighted === 'firstName'}
          />
        <InputWithLabel
          onChange={handleInputChange}
          value={formState.lastName}
          name="lastName"
          aria-label='Last name'
          highlight={highlighted === 'lastName'}
          />
      </div>
      <div className='flex flex-col sm:flex-row gap-3'>
        <InputWithLabel
          onChange={handleInputChange}
          value={formState.email}
          name="email"
          type='email' aria-label='Email'
          highlight={highlighted === 'email'}
          />
        <InputWithLabel
          onChange={handleInputChange}
          value={formState.phone}
          name="phone"
          type='phone' aria-label='Phone'
          highlight={highlighted === 'phone'}
          />
      </div>
      <div className='flex flex-col md:flex-row md:gap-3 gap-5'>
        <div className="flex gap-3 md:w-1/2">
          <DateSelector
            name="Day"
            values={days}
            value={formState.birthdate.day}
            setValue={(value) => handleDateChange(value, 'day')}
          />
          <DateSelector
            name="Month"
            values={months}
            value={formState.birthdate.month}
            setValue={(value) => handleDateChange(value, 'month')}
          />
          <DateSelector
            name="Year"
            values={years}
            value={formState.birthdate.year}
            setValue={(value) => handleDateChange(value, 'year')}
          />
        </div>
        <div className="flex gap-3 w-full md:w-1/2">
          <InputWithLabel
            onChange={handleInputChange}
            value={formState.nationality}
            name="nationality"
            type='text' className='' aria-label='Nationality'
            />
        </div>
      </div>
      <hr className="my-5 border-2 border-blue-950 dark:border-blue-800 border-opacity-30 dark:border-opacity-40"/>
      <div>
        <div className="text-sm">
          Form state:
        </div>
        <div className={cn("whitespace-pre font-mono p-2 text-opacity-70", theme_styles.default_input_bg, theme_styles.default_text_color)}>{JSON.stringify(formState, null, 2)}</div>
      </div>
    </Card>
  )
}