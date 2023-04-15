import React, {
  forwardRef,
  Ref,
  PropsWithChildren,
  MouseEvent,
  useMemo,
  useState,
  useRef,
  useImperativeHandle,
} from "react";
import { ChevronDown } from "react-feather";
import classNames from "classnames";
import {
  SelectConfig,
  SelectProps,
  SelectRef,
  SelectValue,
} from "./Select.types";
import { useClickAway, useControlled } from "../utils/hooks";
import { RawUITheme } from "../Theme/preset/preset.type";
import { useTheme } from "../Theme/theme-context";
import { getValidChildren } from "../utils/common";
import { SelectContext } from "./select-context";
import SelectDropdown from "./SelectDropdown";
import SelectInput from "./SelectInput";

const Select = forwardRef<SelectRef, PropsWithChildren<SelectProps>>(
  (
    {
      defaultValue,
      value,
      width = "100%",
      size = "md",
      disabled = false,
      multiple = false,
      clearable = false,
      placeholder = "",
      className = "",
      dropdownClassName = "",
      dropdownHeight = "none",
      getPopupContainer,
      children,
      ...restProps
    },
    ref
  ) => {
    const theme: RawUITheme = useTheme();
    const selectRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [internalValue, setInternalValue] = useControlled<SelectValue>({
      defaultValue,
      value,
    });
    const [selectFocus, setSelectFocus] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const selectClasses = classNames(
      "raw-select",
      (selectFocus || dropdownVisible) && "active",
      className
    );

    const selectedContent = useMemo(() => {
      const selectedOption = getValidChildren(children).find(
        (option) => option.props.value === internalValue
      );
      if (internalValue === undefined) {
        return undefined;
      } else {
        return selectedOption !== undefined
          ? selectedOption.props.children
          : "";
      }
    }, [internalValue]);

    const clickHandler = (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      event.nativeEvent.stopImmediatePropagation();
      event.preventDefault();
      if (disabled) return;
      setDropdownVisible(!dropdownVisible);
    };

    const mouseDownHandler = (event: MouseEvent<HTMLDivElement>) => {
      if (dropdownVisible) {
        event.preventDefault()
      }
    }

    const changeHandler = (optionValue) => {
      setInternalValue(optionValue);
      if (!multiple) {
        setDropdownVisible(false);
      }
    };

    const focusHandler = () => setSelectFocus(true);

    const blurHandler = () => setSelectFocus(false);

    const selectConfig = useMemo<SelectConfig>(() => {
      return {
        selectValue: internalValue,
        onSelectChange: changeHandler,
        selectRef,
        dropdownHeight,
        getPopupContainer,
        selectDisabled: disabled,
      };
    }, [internalValue, selectRef, disabled]);

    useClickAway(
      selectRef,
      () => {
        if (dropdownVisible) {
          setDropdownVisible(false);
        }
      },
      ["click"]
    );

    useImperativeHandle(
      ref,
      () => ({
        focus: () => inputRef.current?.focus(),
        blur: () => inputRef.current?.blur(),
        scrollTo: (options) => dropdownRef.current?.scrollTo(options),
      }),
      [inputRef, dropdownRef]
    );

    return (
      <SelectContext.Provider value={selectConfig}>
        <div
          className={selectClasses}
          ref={selectRef}
          onClick={clickHandler}
          onMouseDown={mouseDownHandler}
          {...restProps}
        >
          <div className="raw-select-inner">
            {selectedContent !== undefined ? (
              <span className="raw-select-content">{selectedContent}</span>
            ) : (
              <span className="raw-select-placeholder">Select option</span>
            )}
            <SelectInput
              ref={inputRef}
              visible={dropdownVisible}
              onBlur={blurHandler}
              onFocus={focusHandler}
            />
          </div>
          <div className="raw-select-arrow">
            <ChevronDown size={16} />
          </div>
          <SelectDropdown
            ref={dropdownRef}
            visible={dropdownVisible}
            className={dropdownClassName}
          >
            {children}
          </SelectDropdown>
          <style jsx>{`
            .raw-select {
              box-sizing: border-box;
              display: inline-flex;
              position: relative;
              align-items: center;
              width: ${width};
              height: 40px;
              padding-left: 12px;
              padding-right: 40px;
              border: 1px solid ${theme.palette.accents2};
              border-radius: 6px;
              background-color: ${disabled
                ? theme.palette.accents1
                : theme.palette.white};
              transition: border-color 0.15s ease, color 0.15s ease,
                box-shadow 0.15s ease;
              cursor: ${disabled ? "not-allowed" : "pointer"};
              user-select: none;
            }
            .raw-select-inner {
              display: inline-flex;
              width: 100%;
              font-size: 14px;
              line-height: 40px;
            }
            .raw-select-placeholder {
              max-width: 100%;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              color: ${theme.palette.accents5}
            }
            .raw-select-content {
              max-width: 100%;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              color: ${disabled ? theme.palette.accents6 : theme.palette.black };
            }
            .raw-select-arrow {
              display: inline-flex;
              align-items: center;
              position: absolute;
              right: 12px;
              top: 50%;
              transform: translateY(-50%) rotate(${dropdownVisible ? '180' : '0'}deg);
              pointer-events: none;
              transition: transform 0.15s ease;
              color: ${theme.palette.accents7};
            }
            .raw-select.active,
            .raw-select:hover {
              border-color: ${disabled
                ? theme.palette.accents2
                : theme.palette.black};
            }
            .raw-select.active .raw-select-arrow,
            .raw-select:hover .raw-select-arrow {
              color: ${disabled ? theme.palette.accents7 : theme.palette.black};
            }
          `}</style>
        </div>
      </SelectContext.Provider>
    );
  }
);

export default Select;
