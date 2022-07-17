import React, { FC } from 'react';

import { ButtonProps } from './Button.types';

const Button: FC<ButtonProps> = ({
  size = 'normal',
  type = 'primary',
  text,
  onClick,
}) => {
  return (
    <button
      type="button"
      className={`raw-button raw-button-${size} raw-button-${type}`}
      onClick={onClick}
    >
      {text}
      <style jsx>{`
        .raw-button {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          cursor: pointer;
          min-width: 32px;
          min-height: 32px;
          background-color: aliceblue;
        }

        .raw-button-primary {
          background-color: aqua;
        }

        .raw-button-secondary {
          background-color: burlywood;
        }

        .raw-button-error {
          background-color: red;
        }
      `}</style>
    </button>
  );
};

export default Button;
