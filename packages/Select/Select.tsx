import React, {
  forwardRef,
  MouseEvent,
  useMemo,
  useState,
  useRef,
  useImperativeHandle,
  ReactElement,
  useCallback,
  useId,
  ComponentPropsWithRef,
} from 'react';
import { ChevronDown, ChevronUp, X } from 'react-feather';
import classNames from 'classnames';
import { useClickAway } from 'react-use';
import {
  SelectConfig,
  SelectOptionValue,
  SelectProps,
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

const Select = forwardRef(
  (
    {
      defaultValue,
      value,
      width = '100%',
      type = 'default',
      size = 'md',
      disabled = false,
      multiple = false,
      clearable = false,
      placeholder = 'Select option',
      className = '',
      dropdownClassName = '',
      dropdownHeight = 'none',
      getPopupContainer,
      onChange,
      children,
      ...restProps
    }: SelectProps,
    ref: ComponentPropsWithRef<'div'>['ref']
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
    const [selectEnter, setSelectEnter] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const { className: resolveClassName, styles } = useSelectCSS({
      width,
      type,
      size,
      disabled,
    });
    const selectClasses = classNames(
      'raw-select',
      (selectFocus || dropdownVisible) && 'raw-select-active',
      multiple && 'multiple',
      className,
      resolveClassName
    );

    const selectClearVisible = useMemo(() => {
      const hasValue = Array.isArray(internalValue)
        ? (internalValue as SelectOptionValue[]).length > 0
        : internalValue !== undefined && internalValue !== '';
      return !disabled && hasValue && clearable;
    }, [internalValue, disabled, clearable]);

    const handleClick = (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      if (disabled) return;
      setDropdownVisible(!dropdownVisible);
    };

    const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
    };

    const handleChange = useCallback(
      (optionValue?: SelectOptionValue) => {
        if (!multiple) {
          setDropdownVisible(false);
        }
        const newValue = getNewInternalValue(
          multiple,
          internalValue,
          optionValue
        );
        setInternalValue(newValue);
        onChange?.(newValue);
      },
      [internalValue, multiple, onChange, setInternalValue]
    );

    const handleFocus = () => setSelectFocus(true);

    const handleBlur = () => setSelectFocus(false);

    const handleMouseEnter = () => {
      setSelectEnter(true);
    };

    const handleMouseLeave = () => {
      setSelectEnter(false);
    };

    const handleSelectClearClick = (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      setInternalValue(undefined);
      onChange?.(undefined);
    };

    const selectConfig = useMemo<SelectConfig>(() => {
      return {
        multiple,
        selectValue: internalValue,
        onSelectChange: handleChange,
        selectRef,
        dropdownHeight,
        getPopupContainer,
        type,
        size,
        disabled,
        selectId,
      };
    }, [
      multiple,
      internalValue,
      handleChange,
      selectRef,
      dropdownHeight,
      getPopupContainer,
      type,
      size,
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

    useImperativeHandle(ref, () => inputRef.current);

    const SelectContent = (): ReactElement => {
      const selectedOptions = getValidChildren(children).filter((option) => {
        if (Array.isArray(internalValue)) {
          return internalValue.includes(option.props.value);
        } else {
          return internalValue === option.props.value;
        }
      });

      const isEmptyValue = Array.isArray(internalValue)
        ? internalValue.length === 0
        : internalValue === undefined || internalValue === '';

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
                  handleChange(option.props.value);
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
          onClick={handleClick}
          onMouseDown={handleMouseDown}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          {...restProps}
        >
          <div className="raw-select-inner">
            <SelectContent />
            <SelectInput
              ref={inputRef}
              visible={dropdownVisible}
              onBlur={handleBlur}
              onFocus={handleFocus}
            />
          </div>
          {selectEnter && selectClearVisible ? (
            <div
              data-testid="selectClear"
              className="raw-select-clear"
              onClick={handleSelectClearClick}
            >
              <X size={16} />
            </div>
          ) : (
            <div className="raw-select-arrow">
              {dropdownVisible ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </div>
          )}
          {styles}
        </div>
        <SelectDropdown
          ref={dropdownRef}
          visible={dropdownVisible}
          className={dropdownClassName}
        >
          {children}
        </SelectDropdown>
      </SelectContext.Provider>
    );
  }
);

Select.displayName = 'RawSelect';

export default Select;
