import { RawUIThemePalette } from '@/packages/Theme';

export type ColorMap = {
  [key in keyof RawUIThemePalette]?: string;
};

type Colors = {
  [key: string]: ColorMap;
};

const normalColor: ColorMap = {
  background: 'Background',
  accents1: 'Accent 1',
  accents2: 'Accent 2',
  accents3: 'Accent 3',
  accents4: 'Accent 4',
  accents5: 'Accent 5',
  accents6: 'Accent 6',
  accents7: 'Accent 7',
  accents8: 'Accent 8',
  accents9: 'Accent 9',
  accents10: 'Accent 10',
  foreground: 'Foreground',
};

const successColor: ColorMap = {
  success1: 'Success 1',
  success2: 'Success 2',
  success3: 'Success 3',
  success4: 'Success 4',
  success5: 'Success 5',
  success6: 'Success 6',
};

const warningColor: ColorMap = {
  warning1: 'Warning 1',
  warning2: 'Warning 2',
  warning3: 'Warning 3',
  warning4: 'Warning 4',
  warning5: 'Warning 5',
  warning6: 'Warning 6',
};

const errorColor: ColorMap = {
  error1: 'Error 1',
  error2: 'Error 2',
  error3: 'Error 3',
  error4: 'Error 4',
  error5: 'Error 5',
  error6: 'Error 6',
};

export const colors: Colors = {
  normal: normalColor,
  success: successColor,
  warning: warningColor,
  error: errorColor,
};
