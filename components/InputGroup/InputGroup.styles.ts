import css from 'styled-jsx/css';
import { InputGroupProps } from "./InputGroup.types";
import { useInputStyles } from '../Input/Input.styles';

export const useInputGroupCSS = (props: InputGroupProps) => {
  const { type, size, disabled } = props;
  const { height } = useInputStyles({ type, size, disabled });

  return css.resolve`
    .raw-input-group {
      width: 100%;
      display: inline-flex;
      position: relative;
    }
    .raw-input-group :global(.raw-input-element) {
      left: 0;
    }
    .raw-input-group :global(.raw-input~.raw-input-element) {
      right: 0;
      left: auto;
    }
    .raw-input-group :global(.raw-input:first-child) {
      padding-right: ${height};
    }
    .raw-input-group :global(.raw-input:last-child) {
      padding-left: ${height};
    }
    .raw-input-group :global(.raw-input:not(:first-child):not(:last-child)) {
      padding-left: ${height};
      padding-right: ${height};
    }
  `
}