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
    xs: {
      fontSize: '12px',
      height: '24px',
      paddingLeft: '8px',
      paddingRight: '32px',
      iconRight: '8px',
      tagContentVerticalPadding: '2px',
      tagHeight: '18px',
    },
    sm: {
      fontSize: '14px',
      height: '28px',
      paddingLeft: '8px',
      paddingRight: '32px',
      iconRight: '8px',
      tagContentVerticalPadding: '2px',
      tagHeight: '22px',
    },
    md: {
      fontSize: '14px',
      height: '32px',
      paddingLeft: '12px',
      paddingRight: '40px',
      iconRight: '12px',
      tagContentVerticalPadding: '2px',
      tagHeight: '26px',
    },
    lg: {
      fontSize: '14px',
      height: '36px',
      paddingLeft: '12px',
      paddingRight: '40px',
      iconRight: '12px',
      tagContentVerticalPadding: '2px',
      tagHeight: '30px',
    },
    xl: {
      fontSize: '16px',
      height: '40px',
      paddingLeft: '12px',
      paddingRight: '40px',
      iconRight: '12px',
      tagContentVerticalPadding: '2px',
      tagHeight: '34px',
    },
  };

  const styles: {
    [key in SelectTypes]: SelectBasicStyles;
  } = {
    default: {
      color: theme.palette.foreground,
      borderColor: theme.palette.neutral['200'],
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

  const disabledStyles: SelectBasicStyles = {
    backgroundColor: theme.palette.neutral['50'],
    borderColor: theme.palette.neutral['200'],
    color: theme.palette.neutral['500'],
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
      hoverBorderColor: theme.palette.neutral['600'],
    },
    warning: {
      hoverBorderColor: theme.palette.yellow['500'],
    },
    error: {
      hoverBorderColor: theme.palette.red['500'],
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
    paddingLeft,
    paddingRight,
    iconRight,
    tagContentVerticalPadding,
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
      padding-left: ${paddingLeft};
      padding-right: ${paddingRight};
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
      color: ${theme.palette.neutral['400']};
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
      padding-top: ${tagContentVerticalPadding};
      padding-bottom: ${tagContentVerticalPadding};
      margin: -2px;
    }
    .raw-select :global(.raw-select-arrow) {
      display: inline-flex;
      align-items: center;
      position: absolute;
      right: ${iconRight};
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
      color: ${theme.palette.neutral['600']};
    }
    .raw-select :global(.raw-select-clear) {
      display: inline-flex;
      align-items: center;
      position: absolute;
      right: ${iconRight};
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
      color: ${disabled
        ? theme.palette.neutral['600']
        : theme.palette.foreground};
    }
  `;
};
