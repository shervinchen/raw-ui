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

const useButtonStyles = (props: ButtonProps): ButtonStyles => {
  const theme: RawUITheme = useTheme();
  const { size, type, variant, loading, disabled } = props;

  const sizes: {
    [key in ButtonSizes]: ButtonSizeStyles;
  } = {
    sm: {
      fontSize: '12px',
      height: '34px',
      padding: '0 12px',
    },
    md: {
      fontSize: '14px',
      height: '40px',
      padding: '0 16px',
    },
    lg: {
      fontSize: '16px',
      height: '46px',
      padding: '0 20px',
    },
  };

  const styles: {
    [key in ButtonTypes]: {
      [key in ButtonVariants]: ButtonBasicStyles;
    };
  } = {
    default: {
      default: {
        backgroundColor: theme.palette.white,
        color: theme.palette.accents7,
        borderColor: theme.palette.accents2,
      },
      outline: {
        backgroundColor: theme.palette.white,
        color: theme.palette.accents7,
        borderColor: theme.palette.accents2,
      },
      ghost: {
        backgroundColor: 'transparent',
        color: theme.palette.accents7,
        borderColor: 'transparent',
      },
      shadow: {
        backgroundColor: theme.palette.white,
        color: theme.palette.accents7,
        borderColor: theme.palette.white,
        boxShadow: theme.tokens.shadow.sm,
      },
    },
    primary: {
      default: {
        backgroundColor: theme.palette.black,
        color: theme.palette.white,
        borderColor: theme.palette.black,
      },
      outline: {
        backgroundColor: 'transparent',
        color: theme.palette.black,
        borderColor: theme.palette.black,
      },
      ghost: {
        backgroundColor: 'transparent',
        color: theme.palette.black,
        borderColor: 'transparent',
      },
      shadow: {
        backgroundColor: theme.palette.black,
        color: theme.palette.white,
        borderColor: theme.palette.black,
        boxShadow: theme.tokens.shadow.sm,
      },
    },
    success: {
      default: {
        backgroundColor: theme.palette.success5,
        color: theme.palette.white,
        borderColor: theme.palette.success5,
      },
      outline: {
        backgroundColor: 'transparent',
        color: theme.palette.success5,
        borderColor: theme.palette.success5,
      },
      ghost: {
        backgroundColor: 'transparent',
        color: theme.palette.success5,
        borderColor: 'transparent',
      },
      shadow: {
        backgroundColor: theme.palette.success5,
        color: theme.palette.white,
        borderColor: theme.palette.success5,
        boxShadow: theme.tokens.shadow.sm,
      },
    },
    warning: {
      default: {
        backgroundColor: theme.palette.warning5,
        color: theme.palette.white,
        borderColor: theme.palette.warning5,
      },
      outline: {
        backgroundColor: 'transparent',
        color: theme.palette.warning5,
        borderColor: theme.palette.warning5,
      },
      ghost: {
        backgroundColor: 'transparent',
        color: theme.palette.warning5,
        borderColor: 'transparent',
      },
      shadow: {
        backgroundColor: theme.palette.warning5,
        color: theme.palette.white,
        borderColor: theme.palette.warning5,
        boxShadow: theme.tokens.shadow.sm,
      },
    },
    error: {
      default: {
        backgroundColor: theme.palette.error5,
        color: theme.palette.white,
        borderColor: theme.palette.error5,
      },
      outline: {
        backgroundColor: 'transparent',
        color: theme.palette.error5,
        borderColor: theme.palette.error5,
      },
      ghost: {
        backgroundColor: 'transparent',
        color: theme.palette.error5,
        borderColor: 'transparent',
      },
      shadow: {
        backgroundColor: theme.palette.error5,
        color: theme.palette.white,
        borderColor: theme.palette.error5,
        boxShadow: theme.tokens.shadow.sm,
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
      cursor: 'not-allowed',
    },
    outline: {
      backgroundColor: theme.palette.accents1,
      color: theme.palette.accents5,
      borderColor: theme.palette.accents2,
      cursor: 'not-allowed',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: theme.palette.accents5,
      borderColor: 'transparent',
      cursor: 'not-allowed',
    },
    shadow: {
      backgroundColor: theme.palette.accents2,
      color: theme.palette.accents5,
      borderColor: theme.palette.accents2,
      cursor: 'not-allowed',
    },
  };

  const defaultStyles = {
    ...(styles?.[type || 'default']?.[variant || 'default'] ??
      styles['default']['default']),
    ...(sizes[size] || sizes['md']),
  };

  if (disabled) {
    return {
      ...defaultStyles,
      ...(type === 'default'
        ? disabledStyles['outline']
        : disabledStyles[variant] || disabledStyles['default']),
    };
  }

  if (loading) {
    // TODO
  }

  return defaultStyles;
};

const useButtonHoverStyles = (props: ButtonProps): ButtonHoverStyles => {
  const theme: RawUITheme = useTheme();
  const { type, variant, loading, disabled } = props;
  const styles: {
    [key in ButtonTypes]: {
      [key in ButtonVariants]: ButtonHoverStyles;
    };
  } = {
    default: {
      default: {
        hoverColor: theme.palette.black,
        hoverBorderColor: theme.palette.black,
      },
      outline: {
        hoverColor: theme.palette.black,
        hoverBorderColor: theme.palette.black,
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
        hoverColor: theme.palette.black,
        hoverBackgroundColor: theme.palette.white,
      },
      outline: {
        hoverColor: theme.palette.white,
        hoverBackgroundColor: theme.palette.black,
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
        hoverColor: theme.palette.success5,
        hoverBackgroundColor: theme.palette.white,
      },
      outline: {
        hoverColor: theme.palette.white,
        hoverBackgroundColor: theme.palette.success5,
      },
      ghost: {
        hoverBackgroundColor: theme.palette.success2,
      },
      shadow: {
        hoverBoxShadow: theme.tokens.shadow.md,
        hoverTransform: 'translateY(-2px)',
      },
    },
    warning: {
      default: {
        hoverColor: theme.palette.warning5,
        hoverBackgroundColor: theme.palette.white,
      },
      outline: {
        hoverColor: theme.palette.white,
        hoverBackgroundColor: theme.palette.warning5,
      },
      ghost: {
        hoverBackgroundColor: theme.palette.warning2,
      },
      shadow: {
        hoverBoxShadow: theme.tokens.shadow.md,
        hoverTransform: 'translateY(-2px)',
      },
    },
    error: {
      default: {
        hoverColor: theme.palette.error5,
        hoverBackgroundColor: theme.palette.white,
      },
      outline: {
        hoverColor: theme.palette.white,
        hoverBackgroundColor: theme.palette.error5,
      },
      ghost: {
        hoverBackgroundColor: theme.palette.error2,
      },
      shadow: {
        hoverBoxShadow: theme.tokens.shadow.md,
        hoverTransform: 'translateY(-2px)',
      },
    },
  };

  const disabledStyles: {
    [key in ButtonVariants]: ButtonHoverStyles;
  } = {
    default: {
      hoverColor: theme.palette.accents5,
      hoverBorderColor: theme.palette.accents2,
      hoverBackgroundColor: theme.palette.accents2,
    },
    outline: {
      hoverColor: theme.palette.accents5,
      hoverBorderColor: theme.palette.accents2,
      hoverBackgroundColor: theme.palette.accents1,
    },
    ghost: {
      hoverColor: theme.palette.accents5,
      hoverBorderColor: 'transparent',
      hoverBackgroundColor: 'transparent',
    },
    shadow: {
      hoverColor: theme.palette.accents5,
      hoverBorderColor: theme.palette.accents2,
      hoverBackgroundColor: theme.palette.accents2,
      hoverBoxShadow: theme.tokens.shadow.sm,
      hoverTransform: 'none',
    },
  };

  const defaultStyles =
    styles?.[type || 'default']?.[variant || 'default'] ??
    styles['default']['default'];

  if (disabled) {
    return {
      ...defaultStyles,
      ...(type === 'default'
        ? disabledStyles['outline']
        : disabledStyles[variant] || disabledStyles['default']),
    };
  }

  if (loading) {
    // TODO
  }

  return defaultStyles;
};

const useButtonActiveStyles = (props: ButtonProps): ButtonActiveStyles => {
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
        activeBackgroundColor: theme.palette.success1,
      },
      outline: {
        activeBackgroundColor: theme.palette.success4,
      },
      ghost: {
        activeBackgroundColor: theme.palette.success3,
      },
      shadow: {
        activeBoxShadow: theme.tokens.shadow.sm,
        activeTransform: 'none',
      },
    },
    warning: {
      default: {
        activeBackgroundColor: theme.palette.warning1,
      },
      outline: {
        activeBackgroundColor: theme.palette.warning4,
      },
      ghost: {
        activeBackgroundColor: theme.palette.warning3,
      },
      shadow: {
        activeBoxShadow: theme.tokens.shadow.sm,
        activeTransform: 'none',
      },
    },
    error: {
      default: {
        activeBackgroundColor: theme.palette.error1,
      },
      outline: {
        activeBackgroundColor: theme.palette.error4,
      },
      ghost: {
        activeBackgroundColor: theme.palette.error3,
      },
      shadow: {
        activeBoxShadow: theme.tokens.shadow.sm,
        activeTransform: 'none',
      },
    },
  };

  const disabledStyles: {
    [key in ButtonVariants]: ButtonActiveStyles;
  } = {
    default: {
      activeBackgroundColor: theme.palette.accents2,
    },
    outline: {
      activeBackgroundColor: theme.palette.accents1,
    },
    ghost: {
      activeBackgroundColor: 'transparent',
    },
    shadow: {
      activeBackgroundColor: theme.palette.accents2,
    },
  };

  const defaultStyles =
    styles?.[type || 'default']?.[variant || 'default'] ??
    styles['default']['default'];

  if (disabled) {
    return {
      ...defaultStyles,
      ...(type === 'default'
        ? disabledStyles['outline']
        : disabledStyles[variant] || disabledStyles['default']),
    };
  }

  if (loading) {
    // TODO
  }

  return defaultStyles;
};

export const useButtonCSS = (props: ButtonProps) => {
  const {
    fontSize,
    height,
    padding,
    backgroundColor,
    borderColor,
    color,
    boxShadow = 'none',
    cursor = 'pointer',
  } = useButtonStyles(props);

  const {
    hoverBackgroundColor,
    hoverBorderColor,
    hoverColor,
    hoverBoxShadow = 'none',
    hoverTransform = 'none',
  } = useButtonHoverStyles(props);

  const {
    activeBackgroundColor,
    activeBoxShadow = 'none',
    activeTransform = 'none',
  } = useButtonActiveStyles(props);

  return css.resolve`
    .raw-button {
      box-sizing: border-box;
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      vertical-align: middle;
      border: 1px solid;
      border-radius: 6px;
      font-weight: 400;
      font-size: ${fontSize};
      line-height: 1;
      height: ${height};
      padding: ${padding};
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

    .raw-button:hover,
    .raw-button:focus {
      background-color: ${hoverBackgroundColor};
      border-color: ${hoverBorderColor};
      color: ${hoverColor};
      box-shadow: ${hoverBoxShadow};
      transform: ${hoverTransform};
    }

    .raw-button:active {
      background-color: ${activeBackgroundColor};
      box-shadow: ${activeBoxShadow};
      transform: ${activeTransform};
    }
  `;
};
