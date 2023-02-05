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
  white: string;
  black: string;
  link: string;
  success1: string;
  success2: string;
  success3: string;
  success4: string;
  success5: string;
  success6: string;
  warning1: string;
  warning2: string;
  warning3: string;
  warning4: string;
  warning5: string;
  warning6: string;
  error1: string;
  error2: string;
  error3: string;
  error4: string;
  error5: string;
  error6: string;
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
