import css from "styled-jsx/css";
import { RawUITheme } from "../Theme/preset/preset.type";
import { useTheme } from "../Theme/theme-context";
import { ToggleStatus, ToggleStyles } from "./Toggle.types";

const useToggleStyles = ({ status, disabled }): ToggleStyles => {
  const theme: RawUITheme = useTheme();

  const styles: {
    [key in ToggleStatus]: ToggleStyles;
  } = {
    unChecked: {
      backgroundColor: theme.palette.accents2,
      borderColor: theme.palette.accents2,
    },
    checked: {
      backgroundColor: theme.palette.black,
      borderColor: theme.palette.black,
    },
  };

  const defaultStyles = styles[status];
  const disabledStyles = {
    unChecked: {
      backgroundColor: theme.palette.accents1,
      borderColor: theme.palette.accents2,
    },
    checked: {
      backgroundColor: theme.palette.accents6,
      borderColor: theme.palette.accents6,
    },
  };

  return {
    ...defaultStyles,
    ...(disabled ? disabledStyles[status] : {}),
  };
};

export const useToggleCSS = ({ checked, disabled }) => {
  const theme: RawUITheme = useTheme();
  const { backgroundColor, borderColor } = useToggleStyles({
    status: checked ? "checked" : "unChecked",
    disabled,
  });

  return css.resolve`
    .raw-toggle {
      position: relative;
      display: inline-flex;
      cursor: ${disabled ? "not-allowed" : "pointer"};
    }
    .raw-toggle :global(.raw-toggle-input) {
      position: absolute;
      opacity: 0;
      outline: none;
      width: 0;
      height: 0;
      margin: 0;
      padding: 0;
      z-index: -1;
      font-size: 0;
      background-color: transparent;
      overflow: hidden;
      visibility: hidden;
    }
    .raw-toggle :global(.raw-toggle-inner) {
      box-sizing: border-box;
      width: 28px;
      height: 14px;
      border-radius: 14px;
      position: relative;
      transition: background 150ms cubic-bezier(0, 0, 0.2, 1);
      transition-property: background, border-color;
      background-color: ${backgroundColor};
      border: 1px solid ${borderColor};
    }
    .raw-toggle :global(.raw-toggle-inner .raw-toggle-thumb) {
      position: absolute;
      width: 12px;
      height: 12px;
      top: 50%;
      left: 0;
      box-shadow: 0 1px 2px 0 rgb(0 0 0 / 20%), 0 1px 3px 0 rgb(0 0 0 / 10%);
      transition: transform 150ms cubic-bezier(0, 0, 0.2, 1);
      border-radius: 50%;
      background-color: ${disabled
        ? theme.palette.accents2
        : theme.palette.white};
      transform: ${checked ? "translate(14px, -50%)" : "translate(0, -50%)"};
    }
  `;
};
