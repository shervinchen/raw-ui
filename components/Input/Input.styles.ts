import css from "styled-jsx/css";
import { RawUITheme } from "../Theme/preset/preset.type";
import { useTheme } from "../Theme/theme-context";
import {
  InputBasicStyles,
  InputFocusStyles,
  InputProps,
  InputSizeStyles,
  InputSizes,
  InputStyles,
  InputTypes,
} from "./Input.types";

export const useInputStyles = ({ type, size, disabled }: InputProps): InputStyles => {
  const theme: RawUITheme = useTheme();
  const sizes: {
    [key in InputSizes]: InputSizeStyles
  } = {
    sm: {
      fontSize: '14px',
      height: '32px',
      horizontalPadding: '12px',
    },
    md: {
      fontSize: '14px',
      height: '40px',
      horizontalPadding: '12px',
    },
    lg: {
      fontSize: '16px',
      height: '48px',
      horizontalPadding: '12px',
    }
  };
  const styles: {
    [key in InputTypes]: InputBasicStyles;
  } = {
    default: {
      color: theme.palette.black,
      borderColor: theme.palette.accents2,
    },
    primary: {
      color: theme.palette.black,
      borderColor: theme.palette.black,
    },
    success: {
      color: theme.palette.black,
      borderColor: theme.palette.success5,
    },
    warning: {
      color: theme.palette.black,
      borderColor: theme.palette.warning5,
    },
    error: {
      color: theme.palette.black,
      borderColor: theme.palette.error5,
    },
  };
  const defaultStyles = {
    ...(styles?.[type || "default"] ?? styles["default"]),
    ...(sizes?.[size || 'md'] ?? sizes['md']),
  };
  const disabledStyles: InputBasicStyles = {
    backgroundColor: theme.palette.accents1,
    borderColor: theme.palette.accents2,
    color: theme.palette.accents7,
    cursor: "not-allowed",
  };

  return {
    ...defaultStyles,
    ...(disabled ? disabledStyles : {}),
  };
};

const useInputFocusStyles = ({ type, disabled }: InputProps): InputFocusStyles => {
  const theme: RawUITheme = useTheme();
  const styles: {
    [key in InputTypes]: InputFocusStyles;
  } = {
    default: {
      focusBorderColor: theme.palette.accents7,
    },
    primary: {
      focusBorderColor: theme.palette.black,
    },
    success: {
      focusBorderColor: theme.palette.success5,
    },
    warning: {
      focusBorderColor: theme.palette.warning5,
    },
    error: {
      focusBorderColor: theme.palette.error5,
    },
  };
  const defaultStyles = {
    ...(styles?.[type || "default"] ?? styles["default"]),
  };

  return disabled ? {} : defaultStyles;
};

export const useInputCSS = ({ type, size, width, disabled }: InputProps) => {
  const theme: RawUITheme = useTheme();
  const {
    fontSize,
    height,
    horizontalPadding,
    color,
    borderColor,
    backgroundColor = "transparent",
    cursor = "text",
  } = useInputStyles({ type, size, disabled });
  const { focusBorderColor = borderColor } = useInputFocusStyles({
    type,
    disabled,
  });

  return css.resolve`
    .raw-input {
      box-sizing: border-box;
      display: inline-flex;
      height: ${height};
      padding: 0 ${horizontalPadding};
      line-height: normal;
      box-shadow: none;
      font-size: ${fontSize};
      background-color: ${backgroundColor};
      border: 1px solid ${borderColor};
      color: ${color};
      outline: none;
      border-radius: 6px;
      width: ${width};
      min-width: 0;
      appearance: none;
      transition: border 0.2s ease 0s, color 0.2s ease 0s;
      cursor: ${cursor};
    }

    .raw-input:not(.raw-disabled-input):focus {
      border-color: ${focusBorderColor};
    }

    .raw-input::placeholder {
      color: ${theme.palette.accents5};
    }
  `;
};
