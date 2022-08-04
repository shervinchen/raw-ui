import css from 'styled-jsx/css';
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

const getButtonStyles = (props: ButtonProps): ButtonStyles => {
  const { size, type, variant, loading, disabled } = props;

  const sizes: {
    [key in ButtonSizes]: ButtonSizeStyles;
  } = {
    sm: {
      fontSize: '12px',
      lineHeight: '16px',
      height: '34px',
      padding: '8px 12px',
    },
    md: {
      fontSize: '14px',
      lineHeight: '20px',
      height: '40px',
      padding: '8px 16px',
    },
    lg: {
      fontSize: '16px',
      lineHeight: '24px',
      height: '46px',
      padding: '10px 20px',
    },
  };

  const styles: {
    [key in ButtonTypes]: {
      [key in ButtonVariants]: ButtonBasicStyles;
    };
  } = {
    default: {
      default: {
        backgroundColor: '#fff',
        color: '#666',
        borderColor: '#eaeaea',
      },
      outline: {
        backgroundColor: '#fff',
        color: '#666',
        borderColor: '#eaeaea',
      },
      ghost: {
        backgroundColor: 'transparent',
        color: '#666',
        borderColor: 'transparent',
      },
      shadow: {
        backgroundColor: '#fff',
        color: '#666',
        borderColor: '#fff',
        boxShadow: '0 5px 10px rgba(0, 0, 0, 0.12)',
      },
    },
    primary: {
      default: {
        backgroundColor: '#000',
        color: '#fff',
        borderColor: '#000',
      },
      outline: {
        backgroundColor: 'transparent',
        color: '#000',
        borderColor: '#000',
      },
      ghost: {
        backgroundColor: 'transparent',
        color: '#000',
        borderColor: 'transparent',
      },
      shadow: {
        backgroundColor: '#000',
        color: '#fff',
        borderColor: '#000',
        boxShadow: '0 5px 10px rgba(0, 0, 0, 0.12)',
      },
    },
    success: {
      default: {
        backgroundColor: '#0070f3',
        color: '#fff',
        borderColor: '#0070f3',
      },
      outline: {
        backgroundColor: 'transparent',
        color: '#0070f3',
        borderColor: '#0070f3',
      },
      ghost: {
        backgroundColor: 'transparent',
        color: '#0070f3',
        borderColor: 'transparent',
      },
      shadow: {
        backgroundColor: '#0070f3',
        color: '#fff',
        borderColor: '#0070f3',
        boxShadow: '0 5px 10px rgba(0, 0, 0, 0.12)',
      },
    },
    warning: {
      default: {
        backgroundColor: '#f5a623',
        color: '#fff',
        borderColor: '#f5a623',
      },
      outline: {
        backgroundColor: 'transparent',
        color: '#f5a623',
        borderColor: '#f5a623',
      },
      ghost: {
        backgroundColor: 'transparent',
        color: '#f5a623',
        borderColor: 'transparent',
      },
      shadow: {
        backgroundColor: '#f5a623',
        color: '#fff',
        borderColor: '#f5a623',
        boxShadow: '0 5px 10px rgba(0, 0, 0, 0.12)',
      },
    },
    error: {
      default: {
        backgroundColor: '#e00',
        color: '#fff',
        borderColor: '#e00',
      },
      outline: {
        backgroundColor: 'transparent',
        color: '#e00',
        borderColor: '#e00',
      },
      ghost: {
        backgroundColor: 'transparent',
        color: '#e00',
        borderColor: 'transparent',
      },
      shadow: {
        backgroundColor: '#e00',
        color: '#fff',
        borderColor: '#e00',
        boxShadow: '0 5px 10px rgba(0, 0, 0, 0.12)',
      },
    },
  };

  const disabledStyles: {
    [key in ButtonVariants]: ButtonBasicStyles;
  } = {
    default: {
      backgroundColor: '#eaeaea',
      color: '#999',
      borderColor: '#eaeaea',
      cursor: 'not-allowed',
    },
    outline: {
      backgroundColor: '#fafafa',
      color: '#999',
      borderColor: '#eaeaea',
      cursor: 'not-allowed',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'rgba(153, 153, 153, 0.6)',
      borderColor: 'transparent',
      cursor: 'not-allowed',
    },
    shadow: {
      backgroundColor: '#eaeaea',
      color: '#999',
      borderColor: '#eaeaea',
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

const getButtonHoverStyles = (props: ButtonProps): ButtonHoverStyles => {
  const { type, variant, loading, disabled } = props;
  const styles: {
    [key in ButtonTypes]: {
      [key in ButtonVariants]: ButtonHoverStyles;
    };
  } = {
    default: {
      default: {
        hoverColor: '#000',
        hoverBorderColor: '#000',
      },
      outline: {
        hoverColor: '#000',
        hoverBorderColor: '#000',
      },
      ghost: {
        hoverBackgroundColor: '#e7e7e7',
        hoverColor: '#666',
      },
      shadow: {
        hoverBoxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
        hoverTransform: 'translateY(-2px)',
      },
    },
    primary: {
      default: {
        hoverColor: '#000',
        hoverBackgroundColor: '#fff',
      },
      outline: {
        hoverColor: '#fff',
        hoverBackgroundColor: '#000',
      },
      ghost: {
        hoverBackgroundColor: '#e7e7e7',
      },
      shadow: {
        hoverBoxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
        hoverTransform: 'translateY(-2px)',
      },
    },
    success: {
      default: {
        hoverColor: '#0070f3',
        hoverBackgroundColor: '#fff',
      },
      outline: {
        hoverColor: '#fff',
        hoverBackgroundColor: '#0070f3',
      },
      ghost: {
        hoverBackgroundColor: '#cce2fd',
      },
      shadow: {
        hoverBoxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
        hoverTransform: 'translateY(-2px)',
      },
    },
    warning: {
      default: {
        hoverColor: '#f5a623',
        hoverBackgroundColor: '#fff',
      },
      outline: {
        hoverColor: '#fff',
        hoverBackgroundColor: '#f5a623',
      },
      ghost: {
        hoverBackgroundColor: '#fdedd3',
      },
      shadow: {
        hoverBoxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
        hoverTransform: 'translateY(-2px)',
      },
    },
    error: {
      default: {
        hoverColor: '#e00',
        hoverBackgroundColor: '#fff',
      },
      outline: {
        hoverColor: '#fff',
        hoverBackgroundColor: '#e00',
      },
      ghost: {
        hoverBackgroundColor: '#fccccc',
      },
      shadow: {
        hoverBoxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
        hoverTransform: 'translateY(-2px)',
      },
    },
  };

  const disabledStyles: {
    [key in ButtonVariants]: ButtonHoverStyles;
  } = {
    default: {
      hoverColor: '#999',
      hoverBorderColor: '#eaeaea',
      hoverBackgroundColor: '#eaeaea',
    },
    outline: {
      hoverColor: '#999',
      hoverBorderColor: '#eaeaea',
      hoverBackgroundColor: '#fafafa',
    },
    ghost: {
      hoverColor: 'rgba(153, 153, 153, 0.6)',
      hoverBorderColor: 'transparent',
      hoverBackgroundColor: 'transparent',
    },
    shadow: {
      hoverColor: '#999',
      hoverBorderColor: '#eaeaea',
      hoverBackgroundColor: '#eaeaea',
      hoverBoxShadow: '0 5px 10px rgba(0, 0, 0, 0.12)',
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

const getButtonActiveStyles = (props: ButtonProps): ButtonActiveStyles => {
  const { type, variant, loading, disabled } = props;
  const styles: {
    [key in ButtonTypes]: {
      [key in ButtonVariants]: ButtonActiveStyles;
    };
  } = {
    default: {
      default: {
        activeBackgroundColor: '#eaeaea',
      },
      outline: {
        activeBackgroundColor: '#eaeaea',
      },
      ghost: {
        activeBackgroundColor: '#dcdcdc',
      },
      shadow: {
        activeBoxShadow: '0 5px 10px rgba(0, 0, 0, 0.12)',
        activeTransform: 'none',
      },
    },
    primary: {
      default: {
        activeBackgroundColor: '#eaeaea',
      },
      outline: {
        activeBackgroundColor: '#333',
      },
      ghost: {
        activeBackgroundColor: '#dcdcdc',
      },
      shadow: {
        activeBoxShadow: '0 5px 10px rgba(0, 0, 0, 0.12)',
        activeTransform: 'none',
      },
    },
    success: {
      default: {
        activeBackgroundColor: '#d3e5ff',
      },
      outline: {
        activeBackgroundColor: '#3291ff',
      },
      ghost: {
        activeBackgroundColor: '#b3d4fb',
      },
      shadow: {
        activeBoxShadow: '0 5px 10px rgba(0, 0, 0, 0.12)',
        activeTransform: 'none',
      },
    },
    warning: {
      default: {
        activeBackgroundColor: '#ffefcf',
      },
      outline: {
        activeBackgroundColor: '#f7b955',
      },
      ghost: {
        activeBackgroundColor: '#fce4bd',
      },
      shadow: {
        activeBoxShadow: '0 5px 10px rgba(0, 0, 0, 0.12)',
        activeTransform: 'none',
      },
    },
    error: {
      default: {
        activeBackgroundColor: '#f7d4d6',
      },
      outline: {
        activeBackgroundColor: '#ff1a1a',
      },
      ghost: {
        activeBackgroundColor: '#fab3b3',
      },
      shadow: {
        activeBoxShadow: '0 5px 10px rgba(0, 0, 0, 0.12)',
        activeTransform: 'none',
      },
    },
  };

  const disabledStyles: {
    [key in ButtonVariants]: ButtonActiveStyles;
  } = {
    default: {
      activeBackgroundColor: '#eaeaea',
    },
    outline: {
      activeBackgroundColor: '#fafafa',
    },
    ghost: {
      activeBackgroundColor: 'transparent',
    },
    shadow: {
      activeBackgroundColor: '#eaeaea',
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

export const getButtonCSS = (props: ButtonProps) => {
  const {
    fontSize,
    lineHeight,
    height,
    padding,
    backgroundColor,
    borderColor,
    color,
    boxShadow = 'none',
    cursor = 'pointer',
  } = getButtonStyles(props);

  const {
    hoverBackgroundColor,
    hoverBorderColor,
    hoverColor,
    hoverBoxShadow = 'none',
    hoverTransform = 'none',
  } = getButtonHoverStyles(props);

  const {
    activeBackgroundColor,
    activeBoxShadow = 'none',
    activeTransform = 'none',
  } = getButtonActiveStyles(props);

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
      line-height: ${lineHeight};
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
