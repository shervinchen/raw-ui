import { RawUITheme } from './preset/preset.type';
import lightTheme from './preset/default';

const getPresetStaticTheme = (): RawUITheme => {
  return lightTheme;
};

const Theme = {
  getPresetStaticTheme,
};

export default Theme;
