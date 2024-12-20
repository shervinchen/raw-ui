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
import { hexToRGBA } from '../utils/common';

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
        color: theme.palette.accents7,
        borderColor: theme.palette.accents2,
      },
      outline: {
        backgroundColor: theme.palette.background,
        color: theme.palette.accents7,
        borderColor: theme.palette.accents2,
      },
      ghost: {
        backgroundColor: 'transparent',
        color: theme.palette.accents7,
        borderColor: 'transparent',
      },
      shadow: {
        backgroundColor: theme.palette.background,
        color: theme.palette.accents7,
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
        backgroundColor: theme.palette.success,
        color: theme.palette.background,
        borderColor: theme.palette.success,
      },
      outline: {
        backgroundColor: 'transparent',
        color: theme.palette.success,
        borderColor: theme.palette.success,
      },
      ghost: {
        backgroundColor: 'transparent',
        color: theme.palette.success,
        borderColor: 'transparent',
      },
      shadow: {
        backgroundColor: theme.palette.success,
        color: theme.palette.background,
        borderColor: theme.palette.success,
        boxShadow: theme.tokens.shadow.sm,
      },
    },
    warning: {
      default: {
        backgroundColor: theme.palette.warning,
        color: theme.palette.background,
        borderColor: theme.palette.warning,
      },
      outline: {
        backgroundColor: 'transparent',
        color: theme.palette.warning,
        borderColor: theme.palette.warning,
      },
      ghost: {
        backgroundColor: 'transparent',
        color: theme.palette.warning,
        borderColor: 'transparent',
      },
      shadow: {
        backgroundColor: theme.palette.warning,
        color: theme.palette.background,
        borderColor: theme.palette.warning,
        boxShadow: theme.tokens.shadow.sm,
      },
    },
    error: {
      default: {
        backgroundColor: theme.palette.error,
        color: theme.palette.background,
        borderColor: theme.palette.error,
      },
      outline: {
        backgroundColor: 'transparent',
        color: theme.palette.error,
        borderColor: theme.palette.error,
      },
      ghost: {
        backgroundColor: 'transparent',
        color: theme.palette.error,
        borderColor: 'transparent',
      },
      shadow: {
        backgroundColor: theme.palette.error,
        color: theme.palette.background,
        borderColor: theme.palette.error,
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
        backgroundColor: theme.palette.success,
      },
      outline: {
        backgroundColor: theme.palette.background,
      },
      ghost: {
        backgroundColor: theme.palette.background,
      },
      shadow: {
        backgroundColor: theme.palette.success,
      },
    },
    warning: {
      default: {
        backgroundColor: theme.palette.warning,
      },
      outline: {
        backgroundColor: theme.palette.background,
      },
      ghost: {
        backgroundColor: theme.palette.background,
      },
      shadow: {
        backgroundColor: theme.palette.warning,
      },
    },
    error: {
      default: {
        backgroundColor: theme.palette.error,
      },
      outline: {
        backgroundColor: theme.palette.background,
      },
      ghost: {
        backgroundColor: theme.palette.background,
      },
      shadow: {
        backgroundColor: theme.palette.error,
      },
    },
  };

  const disabledStyles: {
    [key in ButtonVariants]: ButtonBasicStyles;
  } = {
    default: {
      backgroundColor: theme.palette.accents2,
      color: theme.palette.accents5,
      borderColor: theme.palette.accents2,
    },
    outline: {
      backgroundColor: theme.palette.accents1,
      color: theme.palette.accents5,
      borderColor: theme.palette.accents2,
    },
    ghost: {
      color: theme.palette.accents5,
    },
    shadow: {
      backgroundColor: theme.palette.accents2,
      color: theme.palette.accents5,
      borderColor: theme.palette.accents2,
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
        hoverBackgroundColor: theme.palette.accents3,
        hoverColor: theme.palette.accents7,
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
        hoverBackgroundColor: theme.palette.accents3,
      },
      shadow: {
        hoverBoxShadow: theme.tokens.shadow.md,
        hoverTransform: 'translateY(-2px)',
      },
    },
    success: {
      default: {
        hoverColor: theme.palette.success,
        hoverBackgroundColor: theme.palette.background,
      },
      outline: {
        hoverColor: theme.palette.background,
        hoverBackgroundColor: theme.palette.success,
      },
      ghost: {
        hoverBackgroundColor: theme.palette.successLighter,
      },
      shadow: {
        hoverBoxShadow: theme.tokens.shadow.md,
        hoverTransform: 'translateY(-2px)',
      },
    },
    warning: {
      default: {
        hoverColor: theme.palette.warning,
        hoverBackgroundColor: theme.palette.background,
      },
      outline: {
        hoverColor: theme.palette.background,
        hoverBackgroundColor: theme.palette.warning,
      },
      ghost: {
        hoverBackgroundColor: theme.palette.warningLighter,
      },
      shadow: {
        hoverBoxShadow: theme.tokens.shadow.md,
        hoverTransform: 'translateY(-2px)',
      },
    },
    error: {
      default: {
        hoverColor: theme.palette.error,
        hoverBackgroundColor: theme.palette.background,
      },
      outline: {
        hoverColor: theme.palette.background,
        hoverBackgroundColor: theme.palette.error,
      },
      ghost: {
        hoverBackgroundColor: theme.palette.errorLighter,
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
        activeBackgroundColor: theme.palette.accents2,
      },
      outline: {
        activeBackgroundColor: theme.palette.accents2,
      },
      ghost: {
        activeBackgroundColor: theme.palette.accents4,
      },
      shadow: {
        activeBoxShadow: theme.tokens.shadow.sm,
        activeTransform: 'none',
      },
    },
    primary: {
      default: {
        activeBackgroundColor: theme.palette.accents2,
      },
      outline: {
        activeBackgroundColor: theme.palette.accents9,
      },
      ghost: {
        activeBackgroundColor: theme.palette.accents4,
      },
      shadow: {
        activeBoxShadow: theme.tokens.shadow.sm,
        activeTransform: 'none',
      },
    },
    success: {
      default: {
        activeBackgroundColor: theme.palette.successLighter,
      },
      outline: {
        activeBackgroundColor: theme.palette.successLight,
      },
      ghost: {
        activeBackgroundColor: hexToRGBA(theme.palette.success, 0.3),
      },
      shadow: {
        activeBoxShadow: theme.tokens.shadow.sm,
        activeTransform: 'none',
      },
    },
    warning: {
      default: {
        activeBackgroundColor: theme.palette.warningLighter,
      },
      outline: {
        activeBackgroundColor: theme.palette.warningLight,
      },
      ghost: {
        activeBackgroundColor: hexToRGBA(theme.palette.warning, 0.3),
      },
      shadow: {
        activeBoxShadow: theme.tokens.shadow.sm,
        activeTransform: 'none',
      },
    },
    error: {
      default: {
        activeBackgroundColor: theme.palette.errorLighter,
      },
      outline: {
        activeBackgroundColor: theme.palette.errorLight,
      },
      ghost: {
        activeBackgroundColor: hexToRGBA(theme.palette.error, 0.3),
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
