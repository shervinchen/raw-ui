import React, { FC } from 'react';
import { Check, Minus } from 'react-feather';
import { CheckboxIconProps } from './Checkbox.types';
import { RawUITheme } from '../Theme/preset/preset.type';
import { useTheme } from '../Theme/theme-context';

const CheckboxIcon: FC<CheckboxIconProps> = ({ checked, indeterminate }) => {
  const theme: RawUITheme = useTheme();

  return (
    <span className="raw-checkbox-inner">
      <div className="raw-checkbox-icon">
        {checked && !indeterminate && (
          <Check size={12} color={theme.palette.background} strokeWidth={3} />
        )}
        {indeterminate && (
          <Minus size={12} color={theme.palette.accents7} strokeWidth={3} />
        )}
      </div>
      <style jsx>{`
        .raw-checkbox-inner {
          position: relative;
          width: 16px;
          height: 16px;
          border: 1px solid
            ${checked && !indeterminate
              ? theme.palette.foreground
              : theme.palette.accents7};
          background-color: ${checked && !indeterminate
            ? theme.palette.foreground
            : 'transparent'};
          border-radius: 3px;
        }
        .raw-checkbox-icon {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          width: 16px;
          height: 16px;
          top: -1px;
          left: -1px;
        }
      `}</style>
    </span>
  );
};

export default CheckboxIcon;
