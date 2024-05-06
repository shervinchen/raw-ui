import React, { FC, PropsWithChildren, MouseEvent, useMemo } from 'react';
import { Check } from 'react-feather';
import classNames from 'classnames';
import { SelectOptionProps } from './SelectOption.types';
import { RawUITheme } from '../Theme/preset/preset.type';
import { useTheme } from '../Theme/theme-context';
import { useSelectContext } from './select-context';

const SelectOption: FC<PropsWithChildren<SelectOptionProps>> = ({
  value,
  disabled = false,
  className = '',
  children,
  ...restProps
}) => {
  const theme: RawUITheme = useTheme();
  const { multiple, selectValue, onSelectChange, selectDisabled } =
    useSelectContext();
  const classes = classNames('raw-select-option', className);
  const isDisabled = selectDisabled || disabled;
  const isSelected = useMemo(() => {
    if (Array.isArray(selectValue)) {
      return selectValue.includes(value);
    } else {
      return multiple ? false : selectValue === value;
    }
  }, [multiple, selectValue, value]);

  const clickHandler = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (isDisabled) return;
    onSelectChange?.(value);
  };

  return (
    <div
      data-testid="selectOption"
      role="option"
      aria-selected={isSelected}
      aria-disabled={isDisabled}
      className={classes}
      {...restProps}
      onClick={clickHandler}
    >
      <div className="raw-select-option-content">
        <span className="raw-select-option-text">{children}</span>
        {isSelected && (
          <div className="raw-select-option-check">
            <Check size={16} color={theme.palette.accents7} />
          </div>
        )}
      </div>
      <style jsx>{`
        .raw-select-option {
          box-sizing: border-box;
          display: flex;
          align-items: center;
          width: 100%;
          height: 40px;
          padding: 0 12px;
          font-size: 14px;
          color: ${isDisabled
            ? theme.palette.accents6
            : theme.palette.accents7};
          background-color: ${theme.palette.background};
          border-radius: 6px;
          transition: background-color 0.15s ease;
          cursor: ${isDisabled ? 'not-allowed' : 'pointer'};
          user-select: none;
        }
        .raw-select-option:hover {
          background-color: ${isDisabled
            ? theme.palette.background
            : theme.palette.accents2};
        }
        .raw-select-option-content {
          display: flex;
          align-items: center;
          width: 100%;
        }
        .raw-select-option-text {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .raw-select-option-check {
          display: inline-flex;
          align-items: center;
          margin-left: auto;
          flex-shrink: 0;
        }
      `}</style>
    </div>
  );
};

export default SelectOption;
