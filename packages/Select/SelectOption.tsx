import React, { FC, PropsWithChildren, MouseEvent, useMemo } from 'react';
import { Check } from 'react-feather';
import classNames from 'classnames';
import { SelectOptionProps } from './SelectOption.types';
import { RawUITheme } from '../Theme/preset/preset.type';
import { useTheme } from '../Theme/theme-context';
import { useSelectContext } from './select-context';
import { useSelectStyles } from './Select.styles';

const SelectOption: FC<PropsWithChildren<SelectOptionProps>> = ({
  value,
  disabled = false,
  className = '',
  children,
  ...restProps
}) => {
  const theme: RawUITheme = useTheme();
  const {
    multiple,
    selectValue,
    onSelectChange,
    type,
    size,
    disabled: selectDisabled,
  } = useSelectContext();
  const { fontSize, height, paddingLeft } = useSelectStyles({
    type,
    size,
    disabled: selectDisabled,
  });
  const classes = classNames('raw-select-option', className);
  const isDisabled = selectDisabled || disabled;
  const isSelected = useMemo(() => {
    if (Array.isArray(selectValue)) {
      return selectValue.includes(value);
    } else {
      return multiple ? false : selectValue === value;
    }
  }, [multiple, selectValue, value]);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
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
      onClick={handleClick}
    >
      <div className="raw-select-option-content">
        <span className="raw-select-option-text">{children}</span>
        {isSelected && (
          <div className="raw-select-option-check">
            <Check size={16} color={theme.palette.neutral['600']} />
          </div>
        )}
      </div>
      <style jsx>{`
        .raw-select-option {
          box-sizing: border-box;
          display: flex;
          align-items: center;
          width: 100%;
          height: ${height};
          padding: 0 ${paddingLeft};
          font-size: ${fontSize};
          color: ${isDisabled
            ? theme.palette.neutral['500']
            : theme.palette.neutral['600']};
          background-color: ${theme.palette.background};
          border-radius: 6px;
          transition: background-color 0.15s ease;
          cursor: ${isDisabled ? 'not-allowed' : 'pointer'};
          user-select: none;
        }
        .raw-select-option:hover {
          background-color: ${isDisabled
            ? theme.palette.background
            : theme.palette.neutral['200']};
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
