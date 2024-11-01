export interface RawUIThemePalette {
  accents1: string;
  accents2: string;
  accents3: string;
  accents4: string;
  accents5: string;
  accents6: string;
  accents7: string;
  accents8: string;
  accents9: string;
  accents10: string;
  background: string;
  foreground: string;
  link: string;
  successLighter: string;
  successLight: string;
  success: string;
  successDark: string;
  warningLighter: string;
  warningLight: string;
  warning: string;
  warningDark: string;
  errorLighter: string;
  errorLight: string;
  error: string;
  errorDark: string;
}

export interface RawUIThemeTokens {
  shadow: {
    sm: string;
    md: string;
    lg: string;
  };
}

export interface RawUITheme {
  type: string;
  palette: RawUIThemePalette;
  tokens: RawUIThemeTokens;
}
