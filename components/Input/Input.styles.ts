import css from 'styled-jsx/css';
import { InputProps } from './Input.types';

export const useInputCSS = (props: InputProps) => {
  return css.resolve`
    .raw-input {
      box-sizing: border-box;
      display: inline-flex;
      height: 40px;
      padding: 0 12px;
      line-height: normal;
      box-shadow: none;
      font-size: 14px;
      background-color: transparent;
      border: 1px solid #eaeaea;
      color: #000;
      outline: none;
      border-radius: 6px;
      width: 100%;
      min-width: 0;
      appearance: none;
      transition: border 0.2s ease 0s, color 0.2s ease 0s;
    }

    .raw-input:focus {
      border-color: #666;
    }
    
    .raw-input::placeholder {
      color: #999;
    }

    .raw-input.raw-disabled-input {
      background-color: #fafafa;
      border-color: #eaeaea;
      cursor: not-allowed;
    }
  `
}