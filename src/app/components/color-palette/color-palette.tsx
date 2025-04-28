'use client';

import { omit } from 'lodash';
import { Shade } from '@/packages/Theme';
import { palette as defaultPalette } from '@/packages/Theme/preset/default';

const ColorPalette = () => {
  const palette = {
    ...{
      'Black & White': {
        black: defaultPalette.black,
        white: defaultPalette.white,
      },
    },
    ...omit(defaultPalette, ['white', 'black', 'background', 'foreground']),
  };

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] gap-x-2 gap-y-8 lg:grid-cols-1">
      {Object.keys(palette).map((colorKey) => (
        <div className="2xl:contents" key={colorKey}>
          <div className="text-sm font-semibold text-[#333] dark:text-white 2xl:col-end-1 2xl:pt-2.5">
            {colorKey.charAt(0).toUpperCase() + colorKey.slice(1)}
          </div>
          <div className="grid mt-3 grid-cols-1 lg:grid-cols-11 gap-y-3 gap-x-2 lg:mt-2 2xl:mt-0">
            {Object.keys(palette[colorKey]).map((shade: Shade) => (
              <div className="relative flex" key={shade}>
                <div className="flex items-center gap-x-3 w-full lg:block lg:space-y-1.5">
                  <div
                    className={`h-10 w-10 rounded ring-1 ring-inset ring-black/10 dark:ring-white/20 lg:w-full`}
                    style={{
                      backgroundColor: palette[colorKey][shade] as string,
                    }}
                  ></div>
                  <div className="px-0.5">
                    <div className="w-6 font-medium text-xs text-[#333] 2xl:w-full dark:text-white">
                      {shade}
                    </div>
                    <div className="text-[#666] text-xs font-mono lowercase dark:text-[#999] md:text-[0.625rem] lg:text-[0.625rem] 2xl:text-xs">
                      {palette[colorKey][shade] as string}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ColorPalette;
