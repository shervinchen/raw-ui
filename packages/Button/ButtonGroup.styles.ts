import css from 'styled-jsx/css';
import { useButtonHoverStyles, useButtonStyles } from './Button.styles';
import { ButtonGroupProps } from './ButtonGroup.types';

export const useButtonGroupCSS = (props: ButtonGroupProps) => {
  const { type, size, variant, disabled } = props;

  const { borderColor } = useButtonStyles({
    type,
    size,
    variant,
    disabled,
  });

  const { hoverBorderColor } = useButtonHoverStyles({
    type,
    size,
    variant,
    disabled,
  });

  return css.resolve`
    .raw-button-group {
      display: inline-flex;
      background-color: transparent;
      border-radius: 6px;
      overflow: hidden;
    }
    .raw-button-group :global(.raw-button) {
      border: none;
      backface-visibility: hidden;
      transform: translate3d(0, 0, 0);
    }
    .raw-button-group :global(.raw-button::before),
    .raw-button-group :global(.raw-button::after) {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      content: '';
      border-radius: inherit;
      transition: border-color 0.2s ease;
      pointer-events: none;
    }
    .raw-button-group :global(.raw-button::before) {
      border: 1px solid ${borderColor};
      z-index: 3;
    }
    .raw-button-group :global(.raw-button::after) {
      border: 1px solid transparent;
      z-index: 3;
    }
    .raw-button-group
      :global(.raw-button:not(.raw-disabled-button):hover::after),
    .raw-button-group
      :global(.raw-button:not(.raw-disabled-button):focus::after) {
      border: 1px solid ${hoverBorderColor};
    }
    .horizontal :global(.raw-button:not(:first-child)) {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    .horizontal :global(.raw-button:not(:last-child)) {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    .horizontal :global(.raw-button:not(:first-child)::before) {
      border-left-width: 0;
    }
    .horizontal :global(.raw-button:not(:first-child)::after) {
      left: -1px;
    }
    .vertical {
      flex-direction: column;
    }
    .vertical :global(.raw-button:not(:first-child)) {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
    .vertical :global(.raw-button:not(:last-child)) {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
    .vertical :global(.raw-button:not(:first-child)::before) {
      border-top-width: 0;
    }
    .vertical :global(.raw-button:not(:first-child)::after) {
      top: -1px;
    }
  `;
};
