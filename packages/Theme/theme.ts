import { RawUITheme } from './preset/preset.type';
import lightTheme from './preset/default';
import darkTheme from './preset/dark';
import { RawUIUserTheme } from './theme.type';
import { isObject } from '../utils/common';

const mergeTheme = <T extends Record<string, unknown>>(
  source: T,
  target: T
): T => {
  const sourceKeys = Object.keys(source) as Array<keyof T>;
  const result: {
    [key in keyof T]?: unknown;
  } = {};

  for (const key of sourceKeys) {
    const sourceValue = source[key];
    const targetValue = target[key];

    if (isObject(sourceValue) && isObject(targetValue)) {
      result[key] = mergeTheme(sourceValue as Record<string, unknown>, {
        ...(targetValue as Record<string, unknown>),
      });
    } else if (targetValue) {
      result[key] = targetValue;
    } else {
      result[key] = sourceValue;
    }
  }

  return result as T;
};

const getPresetThemes = (): Array<RawUITheme> => {
  return [lightTheme, darkTheme];
};

const getPresetStaticTheme = (): RawUITheme => {
  return lightTheme;
};

const isAvailableThemeType = (type?: string): boolean => {
  if (!type) return false;
  const presetThemes = getPresetThemes();
  const hasType = presetThemes.find((theme) => theme.type === type);
  return !hasType;
};

const hasUserCustomTheme = (themes: Array<RawUITheme> = []): boolean => {
  if (!themes) return false;
  return !!themes.find((themeItem) => {
    if (!themeItem) return false;
    return isAvailableThemeType(themeItem.type);
  });
};

const createFromCustom = (
  baseTheme: RawUITheme,
  customTheme: RawUIUserTheme
): RawUITheme => {
  if (
    !isObject(baseTheme) ||
    !isObject(customTheme) ||
    !isAvailableThemeType(customTheme.type)
  ) {
    throw new Error('Duplicate or unavailable theme type');
  }

  return mergeTheme(baseTheme, customTheme) as RawUITheme;
};

const createFromLight = (custom: RawUIUserTheme) =>
  createFromCustom(lightTheme, custom);
const createFromDark = (custom: RawUIUserTheme) =>
  createFromCustom(darkTheme, custom);

const Theme = {
  getPresetThemes,
  getPresetStaticTheme,
  isAvailableThemeType,
  hasUserCustomTheme,
  createFromLight,
  createFromDark,
  createFromCustom,
};

export default Theme;
