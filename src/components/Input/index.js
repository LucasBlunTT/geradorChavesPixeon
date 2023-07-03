import React from 'react';
import { InputStyle } from './styles';

export function Input({ id, label, type, ...props }) {
  return (
    <InputStyle>
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} {...props} />
    </InputStyle>
  );
}
