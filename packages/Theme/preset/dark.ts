import { RawUITheme, RawUIThemePalette, RawUIThemeTokens } from './preset.type';

export const palette: RawUIThemePalette = {
  accents1: '#111111',
  accents2: '#333333',
  accents3: '#444444',
  accents4: '#666666',
  accents5: '#888888',
  accents6: '#999999',
  accents7: '#dcdcdc',
  accents8: '#e7e7e7',
  accents9: '#eaeaea',
  accents10: '#fafafa',
  background: '#000000',
  foreground: '#ffffff',
  link: '#3291ff',
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
  error5: '#ee0000',
  error6: '#c50000',
};

export const tokens: RawUIThemeTokens = {
  shadow: {
    sm: '0 0 0 1px #333',
    md: '0 0 0 1px #333',
    lg: '0 0 0 1px #333',
  },
};

export const theme: RawUITheme = {
  type: 'dark',
  palette,
  tokens,
};

export default theme;
