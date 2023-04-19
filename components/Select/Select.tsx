import React, {
  forwardRef,
  Ref,
  PropsWithChildren,
  MouseEvent,
  useMemo,
  useState,
  useRef,
  useImperativeHandle,
  ReactElement,
} from "react";
import { ChevronDown } from "react-feather";
import classNames from "classnames";
import {
  SelectConfig,
  SelectOptionValue,
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
import SelectTag from "./SelectTag";

const getInternalValue = (multiple: boolean, value: SelectValue) => {
  if (Array.isArray(value)) {
    return multiple ? value : undefined;
  } else {
    return multiple ? undefined : value;
  }
};

const getNewInternalValue = (
  multiple: boolean,
  prevValue: SelectValue,
  nextValue: SelectOptionValue
) => {
  if (multiple) {
    if (Array.isArray(prevValue)) {
      const isExist = prevValue.includes(nextValue);
      return isExist
        ? prevValue.filter((item) => item !== nextValue)
        : [...prevValue, nextValue];
    } else {
      return [nextValue];
    }
  } else {
    return nextValue;
  }
};

const sortSelectedOptions = (
  selectedValue: SelectOptionValue[],
  selectedOption: ReactElement[]
): ReactElement[] => {
  return selectedOption.sort(
    (a, b) =>
      selectedValue.indexOf(a.props.value) -
      selectedValue.indexOf(b.props.value)
  );
};

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
      onChange,
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
      defaultValue: getInternalValue(multiple, defaultValue),
      value: getInternalValue(multiple, value),
    });
    const [selectFocus, setSelectFocus] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const selectClasses = classNames(
      "raw-select",
      (selectFocus || dropdownVisible) && "active",
      multiple && "multiple",
      className
    );

    const clickHandler = (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      event.nativeEvent.stopImmediatePropagation();
      event.preventDefault();
      if (disabled) return;
      setDropdownVisible(!dropdownVisible);
    };

    const mouseDownHandler = (event: MouseEvent<HTMLDivElement>) => {
      if (dropdownVisible) {
        event.preventDefault();
      }
    };

    const changeHandler = (optionValue?: SelectOptionValue) => {
      const newInternalValue = getNewInternalValue(
        multiple,
        internalValue,
        optionValue
      );
      setInternalValue(newInternalValue);
      onChange?.(newInternalValue);
      if (!multiple) {
        setDropdownVisible(false);
      }
    };

    const focusHandler = () => setSelectFocus(true);

    const blurHandler = () => setSelectFocus(false);

    const selectConfig = useMemo<SelectConfig>(() => {
      return {
        multiple,
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

    const SelectContent = (): ReactElement => {
      if (internalValue === undefined)
        return <span className="raw-select-placeholder">Select option</span>;

      const selectedOptions = getValidChildren(children).filter((option) => {
        if (Array.isArray(internalValue)) {
          return multiple ? internalValue.includes(option.props.value) : false;
        } else {
          return multiple ? false : internalValue === option.props.value;
        }
      });

      const isEmptyValue =
        (!Array.isArray(internalValue) && internalValue === "") ||
        (Array.isArray(internalValue) && internalValue.length === 0);

      if (selectedOptions.length === 0) {
        if (isEmptyValue) {
          return <span className="raw-select-placeholder">Select option</span>;
        } else {
          return <span className="raw-select-content"></span>;
        }
      }

      if (multiple) {
        return (
          <div className="raw-select-tag-content">
            {sortSelectedOptions(
              internalValue as SelectOptionValue[],
              selectedOptions
            ).map((option) => (
              <SelectTag
                key={option.props.value}
                disabled={disabled}
                onDeleteTag={() => {
                  changeHandler(option.props.value);
                }}
              >
                {option.props.children}
              </SelectTag>
            ))}
          </div>
        );
      } else {
        return (
          <span className="raw-select-content">
            {selectedOptions[0].props.children}
          </span>
        );
      }
    };

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
            <SelectContent />
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
            .raw-select.multiple {
              height: auto;
              min-height: 40px;
            }
            .raw-select-inner {
              display: inline-flex;
              width: 100%;
            }
            .raw-select :global(.raw-select-placeholder) {
              max-width: 100%;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              font-size: 14px;
              color: ${theme.palette.accents5};
            }
            .raw-select :global(.raw-select-content) {
              max-width: 100%;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              font-size: 14px;
              color: ${disabled ? theme.palette.accents6 : theme.palette.black};
            }
            .raw-select :global(.raw-select-tag-content) {
              display: flex;
              flex-wrap: wrap;
              padding-top: 4px;
              padding-bottom: 4px;
              margin: -2px;
            }
            .raw-select-arrow {
              display: inline-flex;
              align-items: center;
              position: absolute;
              right: 12px;
              top: 50%;
              transform: translateY(-50%)
                rotate(${dropdownVisible ? "180" : "0"}deg);
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
