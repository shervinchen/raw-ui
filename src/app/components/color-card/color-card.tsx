'use client';

import { RawUIThemePalette, useTheme } from '@/packages/Theme';
import { colors } from './colors';

const getColor = (type: string) => {
  return colors[type];
};

const getTextColor = (backgroundColor: string) => {
  const color = backgroundColor.replace(/\s/g, '');
  const rgbMatch = color.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);

  if (rgbMatch) {
    const red = parseInt(rgbMatch[1], 16);
    const green = parseInt(rgbMatch[2], 16);
    const blue = parseInt(rgbMatch[3], 16);
    const brightness = (red * 299 + green * 587 + blue * 114) / 1000;
    return brightness > 128 ? '#000000' : '#ffffff';
  }

  return '#000000';
};

const ColorCard = ({ type }) => {
  const theme = useTheme();
  const currentColorMap = getColor(type);
  const colorKeys = Object.keys(currentColorMap) as Array<
    keyof RawUIThemePalette
  >;

  return (
    <div>
      {colorKeys.map((colorKey) => {
        return (
          <div className="color-card-wrapper" key={colorKey}>
            <span className="w-1/3 font-bold text-lg">
              {currentColorMap[colorKey]}
            </span>
            <span className="w-1/3 text-center">theme.palette.{colorKey}</span>
            <span className="w-1/3 text-right">{theme.palette[colorKey]}</span>
            <style jsx>
              {`
                .color-card-wrapper {
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  padding: 16px;
                  height: 64px;
                  color: ${getTextColor(theme.palette[colorKey])};
                  background-color: ${theme.palette[colorKey]};
                }
              `}
            </style>
          </div>
        );
      })}
    </div>
  );
};

export default ColorCard;
