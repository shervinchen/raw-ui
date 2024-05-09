import React, {
  forwardRef,
  PropsWithChildren,
  MouseEvent,
  useMemo,
  useState,
  useRef,
  useImperativeHandle,
  ReactElement,
  useCallback,
  useId,
} from 'react';
import { ChevronDown } from 'react-feather';
import classNames from 'classnames';
import { useClickAway } from 'react-use';
import {
  SelectConfig,
  SelectOptionValue,
  SelectProps,
  SelectRef,
  SelectValue,
} from './Select.types';
import { useControlled } from '../utils/hooks';
import { getValidChildren } from '../utils/common';
import { SelectContext } from './select-context';
import SelectDropdown from './SelectDropdown';
import SelectInput from './SelectInput';
import SelectTag from './SelectTag';
import { useSelectCSS } from './Select.styles';

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
      width = '100%',
      type = 'default',
      // size = "md",
      disabled = false,
      multiple = false,
      // clearable = false,
      placeholder = 'Select option',
      className = '',
      dropdownClassName = '',
      dropdownHeight = 'none',
      getPopupContainer,
      onChange,
      children,
      ...restProps
    },
    ref
  ) => {
    const selectId = `raw-select-dropdown-${useId()}`;
    const selectRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [internalValue, setInternalValue] = useControlled<SelectValue>({
      defaultValue: getInternalValue(multiple, defaultValue),
      value: getInternalValue(multiple, value),
    });
    const [selectFocus, setSelectFocus] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const { className: resolveClassName, styles } = useSelectCSS({
      width,
      type,
      disabled,
      dropdownVisible,
    });
    const selectClasses = classNames(
      'raw-select',
      (selectFocus || dropdownVisible) && 'raw-select-active',
      multiple && 'multiple',
      className,
      resolveClassName
    );

    const clickHandler = (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      if (disabled) return;
      setDropdownVisible(!dropdownVisible);
    };

    const mouseDownHandler = (event: MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
    };

    const changeHandler = useCallback(
      (optionValue?: SelectOptionValue) => {
        if (!multiple) {
          setDropdownVisible(false);
        }
        const newInternalValue = getNewInternalValue(
          multiple,
          internalValue,
          optionValue
        );
        setInternalValue(newInternalValue);
        onChange?.(newInternalValue);
      },
      [internalValue, multiple, onChange, setInternalValue]
    );

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
        selectId,
      };
    }, [
      multiple,
      internalValue,
      changeHandler,
      dropdownHeight,
      getPopupContainer,
      disabled,
      selectId,
    ]);

    useClickAway(
      selectRef,
      () => {
        setDropdownVisible(false);
      },
      ['mousedown']
    );

    useImperativeHandle(
      ref,
      () => ({
        focus: () => inputRef.current?.focus(),
        blur: () => inputRef.current?.blur(),
      }),
      [inputRef]
    );

    const SelectContent = (): ReactElement => {
      if (internalValue === undefined) {
        return <span className="raw-select-placeholder">{placeholder}</span>;
      }

      const selectedOptions = getValidChildren(children).filter((option) => {
        if (Array.isArray(internalValue)) {
          return internalValue.includes(option.props.value);
        } else {
          return internalValue === option.props.value;
        }
      });

      const isEmptyValue =
        (!Array.isArray(internalValue) && internalValue === '') ||
        (Array.isArray(internalValue) && internalValue.length === 0);

      if (selectedOptions.length === 0) {
        if (isEmptyValue) {
          return <span className="raw-select-placeholder">{placeholder}</span>;
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
                key={option.props.value as SelectOptionValue}
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
          data-testid="selectContainer"
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
          {styles}
        </div>
      </SelectContext.Provider>
    );
  }
);

Select.displayName = 'RawSelect';

export default Select;
