import css from 'styled-jsx/css';
import { RawUITheme } from '../Theme/preset/preset.type';
import { useTheme } from '../Theme/theme-context';
import {
  ButtonSizes,
  ButtonTypes,
  ButtonVariants,
  ButtonProps,
  ButtonSizeStyles,
  ButtonBasicStyles,
  ButtonStyles,
  ButtonHoverStyles,
  ButtonActiveStyles,
} from './Button.types';

export const useButtonStyles = (props: ButtonProps): ButtonStyles => {
  const theme: RawUITheme = useTheme();
  const { size, type, variant, loading, disabled } = props;

  const sizes: {
    [key in ButtonSizes]: ButtonSizeStyles;
  } = {
    xs: {
      fontSize: '12px',
      height: '24px',
      horizontalPadding: '12px',
    },
    sm: {
      fontSize: '14px',
      height: '28px',
      horizontalPadding: '16px',
    },
    md: {
      fontSize: '14px',
      height: '32px',
      horizontalPadding: '16px',
    },
    lg: {
      fontSize: '14px',
      height: '36px',
      horizontalPadding: '16px',
    },
    xl: {
      fontSize: '16px',
      height: '40px',
      horizontalPadding: '20px',
    },
  };

  const styles: {
    [key in ButtonTypes]: {
      [key in ButtonVariants]: ButtonBasicStyles;
    };
  } = {
    default: {
      default: {
        backgroundColor: theme.palette.background,
        color: theme.palette.neutral['600'],
        borderColor: theme.palette.neutral['200'],
      },
      outline: {
        backgroundColor: theme.palette.background,
        color: theme.palette.neutral['600'],
        borderColor: theme.palette.neutral['200'],
      },
      ghost: {
        backgroundColor: 'transparent',
        color: theme.palette.neutral['600'],
        borderColor: 'transparent',
      },
      shadow: {
        backgroundColor: theme.palette.background,
        color: theme.palette.neutral['600'],
        borderColor: theme.palette.background,
        boxShadow: theme.tokens.shadow.sm,
      },
    },
    primary: {
      default: {
        backgroundColor: theme.palette.foreground,
        color: theme.palette.background,
        borderColor: theme.palette.foreground,
      },
      outline: {
        backgroundColor: 'transparent',
        color: theme.palette.foreground,
        borderColor: theme.palette.foreground,
      },
      ghost: {
        backgroundColor: 'transparent',
        color: theme.palette.foreground,
        borderColor: 'transparent',
      },
      shadow: {
        backgroundColor: theme.palette.foreground,
        color: theme.palette.background,
        borderColor: theme.palette.foreground,
        boxShadow: theme.tokens.shadow.sm,
      },
    },
    success: {
      default: {
        backgroundColor: theme.palette.blue['500'],
        color: theme.palette.background,
        borderColor: theme.palette.blue['500'],
      },
      outline: {
        backgroundColor: 'transparent',
        color: theme.palette.blue['500'],
        borderColor: theme.palette.blue['500'],
      },
      ghost: {
        backgroundColor: 'transparent',
        color: theme.palette.blue['500'],
        borderColor: 'transparent',
      },
      shadow: {
        backgroundColor: theme.palette.blue['500'],
        color: theme.palette.background,
        borderColor: theme.palette.blue['500'],
        boxShadow: theme.tokens.shadow.sm,
      },
    },
    warning: {
      default: {
        backgroundColor: theme.palette.yellow['500'],
        color: theme.palette.background,
        borderColor: theme.palette.yellow['500'],
      },
      outline: {
        backgroundColor: 'transparent',
        color: theme.palette.yellow['500'],
        borderColor: theme.palette.yellow['500'],
      },
      ghost: {
        backgroundColor: 'transparent',
        color: theme.palette.yellow['500'],
        borderColor: 'transparent',
      },
      shadow: {
        backgroundColor: theme.palette.yellow['500'],
        color: theme.palette.background,
        borderColor: theme.palette.yellow['500'],
        boxShadow: theme.tokens.shadow.sm,
      },
    },
    error: {
      default: {
        backgroundColor: theme.palette.red['500'],
        color: theme.palette.background,
        borderColor: theme.palette.red['500'],
      },
      outline: {
        backgroundColor: 'transparent',
        color: theme.palette.red['500'],
        borderColor: theme.palette.red['500'],
      },
      ghost: {
        backgroundColor: 'transparent',
        color: theme.palette.red['500'],
        borderColor: 'transparent',
      },
      shadow: {
        backgroundColor: theme.palette.red['500'],
        color: theme.palette.background,
        borderColor: theme.palette.red['500'],
        boxShadow: theme.tokens.shadow.sm,
      },
    },
  };

  const loadingStyles: {
    [key in ButtonTypes]: {
      [key in ButtonVariants]: ButtonBasicStyles;
    };
  } = {
    default: {
      default: {
        backgroundColor: theme.palette.background,
      },
      outline: {
        backgroundColor: theme.palette.background,
      },
      ghost: {
        backgroundColor: theme.palette.background,
      },
      shadow: {
        backgroundColor: theme.palette.background,
      },
    },
    primary: {
      default: {
        backgroundColor: theme.palette.foreground,
      },
      outline: {
        backgroundColor: theme.palette.background,
      },
      ghost: {
        backgroundColor: theme.palette.background,
      },
      shadow: {
        backgroundColor: theme.palette.foreground,
      },
    },
    success: {
      default: {
        backgroundColor: theme.palette.blue['500'],
      },
      outline: {
        backgroundColor: theme.palette.background,
      },
      ghost: {
        backgroundColor: theme.palette.background,
      },
      shadow: {
        backgroundColor: theme.palette.blue['500'],
      },
    },
    warning: {
      default: {
        backgroundColor: theme.palette.yellow['500'],
      },
      outline: {
        backgroundColor: theme.palette.background,
      },
      ghost: {
        backgroundColor: theme.palette.background,
      },
      shadow: {
        backgroundColor: theme.palette.yellow['500'],
      },
    },
    error: {
      default: {
        backgroundColor: theme.palette.red['500'],
      },
      outline: {
        backgroundColor: theme.palette.background,
      },
      ghost: {
        backgroundColor: theme.palette.background,
      },
      shadow: {
        backgroundColor: theme.palette.red['500'],
      },
    },
  };

  const disabledStyles: {
    [key in ButtonVariants]: ButtonBasicStyles;
  } = {
    default: {
      backgroundColor: theme.palette.neutral['200'],
      color: theme.palette.neutral['400'],
      borderColor: theme.palette.neutral['200'],
    },
    outline: {
      backgroundColor: theme.palette.neutral['50'],
      color: theme.palette.neutral['400'],
      borderColor: theme.palette.neutral['200'],
    },
    ghost: {
      color: theme.palette.neutral['400'],
    },
    shadow: {
      backgroundColor: theme.palette.neutral['200'],
      color: theme.palette.neutral['400'],
      borderColor: theme.palette.neutral['200'],
    },
  };

  const defaultStyles = {
    ...(styles?.[type || 'default']?.[variant || 'default'] ??
      styles['default']['default']),
    ...(sizes?.[size || 'md'] ?? sizes['md']),
  };

  return {
    ...defaultStyles,
    ...(loading
      ? {
          ...(loadingStyles?.[type || 'default']?.[variant || 'default'] ??
            loadingStyles['default']['default']),
          cursor: 'default',
        }
      : {}),
    ...(disabled
      ? {
          ...(type === 'default'
            ? disabledStyles['outline']
            : disabledStyles?.[variant || 'default'] ??
              disabledStyles['default']),
          cursor: 'not-allowed',
        }
      : {}),
  };
};

export const useButtonHoverStyles = (props: ButtonProps): ButtonHoverStyles => {
  const theme: RawUITheme = useTheme();
  const { type, variant, loading, disabled } = props;
  const styles: {
    [key in ButtonTypes]: {
      [key in ButtonVariants]: ButtonHoverStyles;
    };
  } = {
    default: {
      default: {
        hoverColor: theme.palette.foreground,
        hoverBorderColor: theme.palette.foreground,
      },
      outline: {
        hoverColor: theme.palette.foreground,
        hoverBorderColor: theme.palette.foreground,
      },
      ghost: {
        hoverBackgroundColor: theme.palette.neutral['200'],
        hoverColor: theme.palette.neutral['600'],
      },
      shadow: {
        hoverBoxShadow: theme.tokens.shadow.md,
        hoverTransform: 'translateY(-2px)',
      },
    },
    primary: {
      default: {
        hoverColor: theme.palette.foreground,
        hoverBackgroundColor: theme.palette.background,
      },
      outline: {
        hoverColor: theme.palette.background,
        hoverBackgroundColor: theme.palette.foreground,
      },
      ghost: {
        hoverBackgroundColor: theme.palette.neutral['200'],
      },
      shadow: {
        hoverBoxShadow: theme.tokens.shadow.md,
        hoverTransform: 'translateY(-2px)',
      },
    },
    success: {
      default: {
        hoverColor: theme.palette.blue['500'],
        hoverBackgroundColor: theme.palette.background,
      },
      outline: {
        hoverColor: theme.palette.background,
        hoverBackgroundColor: theme.palette.blue['500'],
      },
      ghost: {
        hoverBackgroundColor: theme.palette.blue['100'],
      },
      shadow: {
        hoverBoxShadow: theme.tokens.shadow.md,
        hoverTransform: 'translateY(-2px)',
      },
    },
    warning: {
      default: {
        hoverColor: theme.palette.yellow['500'],
        hoverBackgroundColor: theme.palette.background,
      },
      outline: {
        hoverColor: theme.palette.background,
        hoverBackgroundColor: theme.palette.yellow['500'],
      },
      ghost: {
        hoverBackgroundColor: theme.palette.yellow['100'],
      },
      shadow: {
        hoverBoxShadow: theme.tokens.shadow.md,
        hoverTransform: 'translateY(-2px)',
      },
    },
    error: {
      default: {
        hoverColor: theme.palette.red['500'],
        hoverBackgroundColor: theme.palette.background,
      },
      outline: {
        hoverColor: theme.palette.background,
        hoverBackgroundColor: theme.palette.red['500'],
      },
      ghost: {
        hoverBackgroundColor: theme.palette.red['100'],
      },
      shadow: {
        hoverBoxShadow: theme.tokens.shadow.md,
        hoverTransform: 'translateY(-2px)',
      },
    },
  };

  const defaultStyles =
    styles?.[type || 'default']?.[variant || 'default'] ??
    styles['default']['default'];

  return loading || disabled ? {} : defaultStyles;
};

export const useButtonActiveStyles = (
  props: ButtonProps
): ButtonActiveStyles => {
  const theme: RawUITheme = useTheme();
  const { type, variant, loading, disabled } = props;
  const styles: {
    [key in ButtonTypes]: {
      [key in ButtonVariants]: ButtonActiveStyles;
    };
  } = {
    default: {
      default: {
        activeBackgroundColor: theme.palette.neutral['200'],
      },
      outline: {
        activeBackgroundColor: theme.palette.neutral['200'],
      },
      ghost: {
        activeBackgroundColor: theme.palette.neutral['300'],
      },
      shadow: {
        activeBoxShadow: theme.tokens.shadow.sm,
        activeTransform: 'none',
      },
    },
    primary: {
      default: {
        activeBackgroundColor: theme.palette.neutral['200'],
      },
      outline: {
        activeBackgroundColor: theme.palette.neutral['800'],
      },
      ghost: {
        activeBackgroundColor: theme.palette.neutral['300'],
      },
      shadow: {
        activeBoxShadow: theme.tokens.shadow.sm,
        activeTransform: 'none',
      },
    },
    success: {
      default: {
        activeBackgroundColor: theme.palette.blue['200'],
      },
      outline: {
        activeBackgroundColor: theme.palette.blue['400'],
      },
      ghost: {
        activeBackgroundColor: theme.palette.blue['200'],
      },
      shadow: {
        activeBoxShadow: theme.tokens.shadow.sm,
        activeTransform: 'none',
      },
    },
    warning: {
      default: {
        activeBackgroundColor: theme.palette.yellow['200'],
      },
      outline: {
        activeBackgroundColor: theme.palette.yellow['400'],
      },
      ghost: {
        activeBackgroundColor: theme.palette.yellow['200'],
      },
      shadow: {
        activeBoxShadow: theme.tokens.shadow.sm,
        activeTransform: 'none',
      },
    },
    error: {
      default: {
        activeBackgroundColor: theme.palette.red['200'],
      },
      outline: {
        activeBackgroundColor: theme.palette.red['400'],
      },
      ghost: {
        activeBackgroundColor: theme.palette.red['200'],
      },
      shadow: {
        activeBoxShadow: theme.tokens.shadow.sm,
        activeTransform: 'none',
      },
    },
  };

  const defaultStyles =
    styles?.[type || 'default']?.[variant || 'default'] ??
    styles['default']['default'];

  return loading || disabled ? {} : defaultStyles;
};

export const useButtonCSS = (props: ButtonProps) => {
  const {
    fontSize,
    height,
    horizontalPadding,
    backgroundColor,
    borderColor,
    color,
    boxShadow = 'none',
    cursor = 'pointer',
  } = useButtonStyles(props);

  const {
    hoverBackgroundColor = backgroundColor,
    hoverBorderColor = borderColor,
    hoverColor = color,
    hoverBoxShadow = 'none',
    hoverTransform = 'none',
  } = useButtonHoverStyles(props);

  const {
    activeBackgroundColor = backgroundColor,
    activeBoxShadow = 'none',
    activeTransform = 'none',
  } = useButtonActiveStyles(props);

  return css.resolve`
    .raw-button:not(.raw-loading-button):not(.raw-disabled-button):hover,
    .raw-button:not(.raw-loading-button):not(.raw-disabled-button):focus {
      background-color: ${hoverBackgroundColor};
      border-color: ${hoverBorderColor};
      color: ${hoverColor};
      box-shadow: ${hoverBoxShadow};
      transform: ${hoverTransform};
    }

    .raw-button:not(.raw-loading-button):not(.raw-disabled-button):active {
      background-color: ${activeBackgroundColor};
      box-shadow: ${activeBoxShadow};
      transform: ${activeTransform};
    }

    .raw-button {
      box-sizing: border-box;
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      vertical-align: middle;
      border: 1px solid;
      border-radius: 6px;
      font-weight: 400;
      font-size: ${fontSize};
      line-height: 1;
      height: ${height};
      padding: 0 ${horizontalPadding};
      background-color: ${backgroundColor};
      border-color: ${borderColor};
      color: ${color};
      box-shadow: ${boxShadow};
      cursor: ${cursor};
      transition-property: border-color, background, color, transform,
        box-shadow;
      transition-duration: 0.2s;
      transition-timing-function: ease;
      text-transform: capitalize;
      white-space: nowrap;
      appearance: none;
      outline: none;
      user-select: none;
    }

    .raw-button.raw-childless-button {
      width: ${height};
      height: ${height};
      padding: 0;
    }

    .raw-button :global(.raw-button-content) {
      position: relative;
      z-index: 1;
    }
  `;
};
