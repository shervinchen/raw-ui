import css from 'styled-jsx/css';
import { RawUITheme } from '../Theme/preset/preset.type';
import { useTheme } from '../Theme/theme-context';
import {
  InputBasicStyles,
  InputFocusStyles,
  InputProps,
  InputSizeStyles,
  InputSizes,
  InputStyles,
  InputTypes,
} from './Input.types';

export const useInputStyles = ({
  type,
  size,
  disabled,
}: InputProps): InputStyles => {
  const theme: RawUITheme = useTheme();
  const sizes: {
    [key in InputSizes]: InputSizeStyles;
  } = {
    xs: {
      fontSize: '12px',
      height: '24px',
      horizontalPadding: '8px',
    },
    sm: {
      fontSize: '14px',
      height: '28px',
      horizontalPadding: '8px',
    },
    md: {
      fontSize: '14px',
      height: '32px',
      horizontalPadding: '12px',
    },
    lg: {
      fontSize: '14px',
      height: '36px',
      horizontalPadding: '12px',
    },
    xl: {
      fontSize: '16px',
      height: '40px',
      horizontalPadding: '12px',
    },
  };
  const styles: {
    [key in InputTypes]: InputBasicStyles;
  } = {
    default: {
      color: theme.palette.foreground,
      borderColor: theme.palette.neutral['200'],
    },
    primary: {
      color: theme.palette.foreground,
      borderColor: theme.palette.foreground,
    },
    warning: {
      color: theme.palette.foreground,
      borderColor: theme.palette.yellow['500'],
    },
    error: {
      color: theme.palette.foreground,
      borderColor: theme.palette.red['500'],
    },
  };
  const defaultStyles = {
    ...(styles?.[type || 'default'] ?? styles['default']),
    ...(sizes?.[size || 'md'] ?? sizes['md']),
  };
  const disabledStyles: InputBasicStyles = {
    backgroundColor: theme.palette.neutral['50'],
    borderColor: theme.palette.neutral['200'],
    color: theme.palette.neutral['600'],
    cursor: 'not-allowed',
  };

  return {
    ...defaultStyles,
    ...(disabled ? disabledStyles : {}),
  };
};

export const useInputFocusStyles = ({
  type,
  disabled,
}: InputProps): InputFocusStyles => {
  const theme: RawUITheme = useTheme();
  const styles: {
    [key in InputTypes]: InputFocusStyles;
  } = {
    default: {
      focusBorderColor: theme.palette.neutral['600'],
    },
    primary: {
      focusBorderColor: theme.palette.foreground,
    },
    warning: {
      focusBorderColor: theme.palette.yellow['500'],
    },
    error: {
      focusBorderColor: theme.palette.red['500'],
    },
  };
  const defaultStyles = {
    ...(styles?.[type || 'default'] ?? styles['default']),
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
    backgroundColor = 'transparent',
    cursor = 'text',
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
      color: ${theme.palette.neutral['400']};
    }
  `;
};
