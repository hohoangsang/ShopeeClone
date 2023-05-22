import React, { InputHTMLAttributes } from 'react';
import type { UseFormRegister, RegisterOptions } from 'react-hook-form';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  register?: UseFormRegister<any>;
  rules?: RegisterOptions;
  classNameInput?: string;
  classNameError?: string;
}

export default function Input(props: InputProps) {
  const {
    errorMessage,
    placeholder,
    register,
    rules,
    type,
    name,
    autoComplete,
    classNameInput = 'w-full rounded-sm border border-gray-300 p-3 shadow-sm outline-none focus:border-gray-500',
    classNameError = 'mt-1 min-h-[1.25rem] text-red-500'
  } = props;

  const registerInput = register && name ? register(name, rules) : {};

  return (
    <React.Fragment>
      <input
        type={type}
        className={classNameInput}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...registerInput}
      />

      <div className={classNameError}>{errorMessage}</div>
    </React.Fragment>
  );
}
