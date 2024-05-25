import css from 'styled-jsx/css';
import { useTheme } from '../Theme';
import {
  SelectBasicStyles,
  SelectHoverStyles,
  SelectProps,
  SelectSizes,
  SelectSizeStyles,
  SelectStyles,
  SelectTypes,
} from './Select.types';

export const useSelectStyles = ({
  type,
  size,
  disabled,
}: SelectProps): SelectStyles => {
  const theme = useTheme();

  const sizes: {
    [key in SelectSizes]: SelectSizeStyles;
  } = {
    sm: {
      fontSize: '14px',
      height: '32px',
    },
    md: {
      fontSize: '14px',
      height: '40px',
    },
    lg: {
      fontSize: '16px',
      height: '48px',
    },
  };

  const styles: {
    [key in SelectTypes]: SelectBasicStyles;
  } = {
    default: {
      color: theme.palette.foreground,
      borderColor: theme.palette.accents2,
    },
    warning: {
      color: theme.palette.foreground,
      borderColor: theme.palette.warning5,
    },
    error: {
      color: theme.palette.foreground,
      borderColor: theme.palette.error5,
    },
  };

  const defaultStyles = {
    ...(styles?.[type || 'default'] ?? styles['default']),
    ...(sizes?.[size || 'md'] ?? sizes['md']),
  };

  const disabledStyles: SelectBasicStyles = {
    backgroundColor: theme.palette.accents1,
    borderColor: theme.palette.accents2,
    color: theme.palette.accents6,
    cursor: 'not-allowed',
  };

  return {
    ...defaultStyles,
    ...(disabled ? disabledStyles : {}),
  };
};

export const useSelectHoverStyles = ({
  type,
  disabled,
}: SelectProps): SelectHoverStyles => {
  const theme = useTheme();

  const styles: {
    [key in SelectTypes]: SelectHoverStyles;
  } = {
    default: {
      hoverBorderColor: theme.palette.accents7,
    },
    warning: {
      hoverBorderColor: theme.palette.warning5,
    },
    error: {
      hoverBorderColor: theme.palette.error5,
    },
  };

  const defaultStyles = {
    ...(styles?.[type || 'default'] ?? styles['default']),
  };

  return disabled ? {} : defaultStyles;
};

export const useSelectCSS = ({ width, type, size, disabled }: SelectProps) => {
  const theme = useTheme();
  const {
    fontSize,
    height,
    color,
    borderColor,
    backgroundColor = theme.palette.background,
    cursor = 'pointer',
  } = useSelectStyles({ type, size, disabled });
  const { hoverBorderColor = borderColor } = useSelectHoverStyles({
    type,
    disabled,
  });

  return css.resolve`
    .raw-select {
      box-sizing: border-box;
      display: inline-flex;
      position: relative;
      align-items: center;
      width: ${width};
      height: ${height};
      padding-left: 12px;
      padding-right: 40px;
      border: 1px solid ${borderColor};
      border-radius: 6px;
      background-color: ${backgroundColor};
      transition: border-color 0.15s ease, color 0.15s ease;
      cursor: ${cursor};
      user-select: none;
    }
    .raw-select.multiple {
      height: auto;
      min-height: ${height};
    }
    .raw-select :global(.raw-select-inner) {
      display: inline-flex;
      width: 100%;
    }
    .raw-select :global(.raw-select-placeholder) {
      max-width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: ${fontSize};
      color: ${theme.palette.accents5};
    }
    .raw-select :global(.raw-select-content) {
      max-width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: ${fontSize};
      color: ${color};
    }
    .raw-select :global(.raw-select-tag-content) {
      display: flex;
      flex-wrap: wrap;
      padding-top: 4px;
      padding-bottom: 4px;
      margin: -2px;
    }
    .raw-select :global(.raw-select-arrow) {
      display: inline-flex;
      align-items: center;
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
      color: ${theme.palette.accents7};
    }
    .raw-select :global(.raw-select-clear) {
      display: inline-flex;
      align-items: center;
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: ${theme.palette.foreground};
    }
    .raw-select.raw-select-active,
    .raw-select:hover {
      border-color: ${hoverBorderColor};
    }
    .raw-select.raw-select-active :global(.raw-select-arrow),
    .raw-select:hover :global(.raw-select-arrow) {
      color: ${disabled ? theme.palette.accents7 : theme.palette.foreground};
    }
  `;
};
