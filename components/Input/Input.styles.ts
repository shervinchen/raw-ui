import css from 'styled-jsx/css';
import { InputProps } from './Input.types';

export const useInputCSS = (props: InputProps) => {
  return css.resolve`
    .raw-input {}
  `
}