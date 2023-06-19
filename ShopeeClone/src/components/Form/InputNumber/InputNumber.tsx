import React, { InputHTMLAttributes } from 'react';

interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  classNameInput?: string;
  classNameError?: string;
}

const InputNumber = React.forwardRef<HTMLInputElement, InputNumberProps>(function InputNumber(
  props: InputNumberProps,
  ref
) {
  const {
    errorMessage,
    classNameInput = 'w-full rounded-sm border border-gray-300 p-3 shadow-sm outline-none focus:border-gray-500',
    classNameError = 'mt-1 min-h-[1.25rem] text-red-500',
    className,
    onChange,
    ...rest
  } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (/^\d+$/.test(value) || value === '') {
      if (onChange) onChange(event);
    }
  };

  return (
    <React.Fragment>
      <div className={className}>
        <input className={classNameInput} {...rest} ref={ref} onChange={handleChange} />

        <div className={classNameError}>{errorMessage}</div>
      </div>
    </React.Fragment>
  );
});

export default InputNumber;
