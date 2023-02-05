import { RawUITheme, RawUIThemePalette, RawUIThemeTokens } from './preset.type';

export const palette: RawUIThemePalette = {
  accents1: '#fafafa',
  accents2: '#eaeaea',
  accents3: '#e7e7e7',
  accents4: '#dcdcdc',
  accents5: '#999',
  accents6: '#888',
  accents7: '#666',
  accents8: '#444',
  accents9: '#333',
  accents10: '#111',
  white: '#fff',
  black: '#000',
  link: '#0070f3',
  success1: '#d3e5ff',
  success2: '#cce2fd',
  success3: '#b3d4fb',
  success4: '#3291ff',
  success5: '#0070f3',
  success6: '#0761d1',
  warning1: '#ffefcf',
  warning2: '#fdedd3',
  warning3: '#fce4bd',
  warning4: '#f7b955',
  warning5: '#f5a623',
  warning6: '#ab570a',
  error1: '#f7d4d6',
  error2: '#fccccc',
  error3: '#fab3b3',
  error4: '#ff1a1a',
  error5: '#e00',
  error6: '#c50000',
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
