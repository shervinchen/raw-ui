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
  successLighter: 'Success Lighter',
  successLight: 'Success Light',
  success: 'Success',
  successDark: 'Success Dark',
};

const warningColor: ColorMap = {
  warningLighter: 'Warning Lighter',
  warningLight: 'Warning Light',
  warning: 'Warning',
  warningDark: 'Warning Dark',
};

const errorColor: ColorMap = {
  errorLighter: 'Error Lighter',
  errorLight: 'Error Light',
  error: 'Error',
  errorDark: 'Error Dark',
};

const cyanColor: ColorMap = {
  cyanLighter: 'Cyan Lighter',
  cyanLight: 'Cyan Light',
  cyan: 'Cyan',
  cyanDark: 'Cyan Dark',
};

const violetColor: ColorMap = {
  violetLighter: 'Violet Lighter',
  violetLight: 'Violet Light',
  violet: 'Violet',
  violetDark: 'Violet Dark',
};

const highlightColor: ColorMap = {
  highlightPurple: 'Highlight Purple',
  highlightMagenta: 'Highlight Magenta',
  highlightPink: 'Highlight Pink',
  highlightYellow: 'Highlight Yellow',
};

export const colors: Colors = {
  normal: normalColor,
  success: successColor,
  warning: warningColor,
  error: errorColor,
  cyan: cyanColor,
  violet: violetColor,
  highlight: highlightColor,
};
