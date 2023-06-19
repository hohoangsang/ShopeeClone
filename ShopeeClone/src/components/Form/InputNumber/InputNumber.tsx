import React, { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  classNameInput?: string;
}

export default function InputNumber() {
  return <div>InputNumber</div>;
}
