import React, { FC, PropsWithChildren, MouseEvent } from "react";
import classNames from "classnames";
import { SelectOptionProps } from "./SelectOption.types";
import { RawUITheme } from "../Theme/preset/preset.type";
import { useTheme } from "../Theme/theme-context";
import { useSelectContext } from "./select-context";

const SelectOption: FC<PropsWithChildren<SelectOptionProps>> = ({
  value,
  disabled = false,
  className = "",
  children,
  ...restProps
}) => {
  const theme: RawUITheme = useTheme();
  const { selectValue, onSelectChange, selectDisabled } = useSelectContext();
  const classes = classNames("raw-select-option", className);
  const isDisabled = selectDisabled || disabled
  const isSelected = selectValue === value;

  const clickHandler = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    event.preventDefault();
    if (isDisabled) return;
    onSelectChange?.(value);
  };

  return (
    <div className={classes} {...restProps} onClick={clickHandler}>
      <span className="raw-select-option-content">{children}</span>
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
            : isSelected
            ? theme.palette.black
            : theme.palette.accents7};
          background-color: ${isDisabled
            ? theme.palette.accents1
            : isSelected
            ? theme.palette.accents2
            : theme.palette.white};
          transition: background-color 0.15s ease;
          cursor: ${isDisabled ? "not-allowed" : "pointer"};
          user-select: none;
        }
        .raw-select-option-content {
          max-width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .raw-select-option:hover {
          background-color: ${isDisabled
            ? theme.palette.accents1
            : isSelected
            ? theme.palette.accents2
            : theme.palette.accents1};
          color: ${isDisabled
            ? theme.palette.accents6
            : isSelected
            ? theme.palette.black
            : theme.palette.accents9};
        }
      `}</style>
    </div>
  );
};

export default SelectOption;
