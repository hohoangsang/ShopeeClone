import React from 'react';
import type { UseFormRegister, RegisterOptions } from 'react-hook-form';

interface InputProps {
  type: React.HTMLInputTypeAttribute;
  name: string;
  placeholder?: string;
  errorMessage?: string;
  register: UseFormRegister<any>;
  rules?: RegisterOptions;
  autoComplete?: string;
}

export default function Input(props: InputProps) {
  const { errorMessage, placeholder, register, rules, type, name, autoComplete } = props;

  return (
    <React.Fragment>
      <input
        type={type}
        className='w-full rounded-sm border border-gray-300 p-3 shadow-sm outline-none focus:border-gray-500'
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...register(name, rules)}
      />

      <div className='mt-1 min-h-[1.25rem] text-red-500'>{errorMessage}</div>
    </React.Fragment>
  );
}
