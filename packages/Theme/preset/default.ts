import { RawUITheme, RawUIThemePalette, RawUIThemeTokens } from './preset.type';

export const palette: RawUIThemePalette = {
  accents1: '#fafafa',
  accents2: '#eaeaea',
  accents3: '#e7e7e7',
  accents4: '#dcdcdc',
  accents5: '#999999',
  accents6: '#888888',
  accents7: '#666666',
  accents8: '#444444',
  accents9: '#333333',
  accents10: '#111111',
  background: '#ffffff',
  foreground: '#000000',
  link: '#0070f3',
  successLighter: '#d3e5ff',
  successLight: '#3291ff',
  success: '#0070f3',
  successDark: '#0761d1',
  warningLighter: '#ffefcf',
  warningLight: '#f7b955',
  warning: '#f5a623',
  warningDark: '#ab570a',
  errorLighter: '#f7d4d6',
  errorLight: '#ff1a1a',
  error: '#ee0000',
  errorDark: '#c50000',
};

export const tokens: RawUIThemeTokens = {
  shadow: {
    sm: '0 5px 10px rgba(0, 0, 0, 0.12)',
    md: '0 8px 30px rgba(0, 0, 0, 0.12)',
    lg: '0 30px 60px rgba(0, 0, 0, 0.12)',
  },
};

export const theme: RawUITheme = {
  type: 'light',
  palette,
  tokens,
};

export default theme;
