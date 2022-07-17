import { MouseEventHandler } from 'react';

export interface ButtonProps {
  size?: 'small' | 'normal' | 'large';
  type: 'primary' | 'secondary' | 'error';
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
