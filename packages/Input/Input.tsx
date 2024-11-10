import React, {
  forwardRef,
  ChangeEvent,
  FocusEvent,
  useImperativeHandle,
  useRef,
  ComponentPropsWithRef,
} from 'react';
import classNames from 'classnames';
import { InputProps } from './Input.types';
import { useInputCSS } from './Input.styles';
import { useControlled } from '../utils/hooks';
import { InputGroupConfig } from './InputGroup.types';
import { useInputGroupContext } from './input-group-context';

const mergeInputGroupProps = (
  inputProps: InputProps,
  config: InputGroupConfig
): InputProps => {
  if (!config.isInputGroup) return inputProps;
  return {
    ...inputProps,
    size: config.size,
    type: config.type,
    readOnly: config.readOnly,
    disabled: config.disabled,
  };
};

const Input = forwardRef(
  (inputProps: InputProps, ref: ComponentPropsWithRef<'input'>['ref']) => {
    const inputGroupConfig = useInputGroupContext();
    const {
      type = 'default',
      size = 'md',
      width = '100%',
      htmlType = 'text',
      placeholder = '',
      defaultValue = '',
      disabled = false,
      readOnly = false,
      className = '',
      autoComplete = 'off',
      value,
      onChange,
      onBlur,
      onFocus,
      ...restProps
    } = mergeInputGroupProps(inputProps, inputGroupConfig);
    const inputRef = useRef<HTMLInputElement>(null);
    const [internalValue, setInternalValue] = useControlled<string>({
      defaultValue,
      value,
    });
    const { className: resolveClassName, styles } = useInputCSS({
      type,
      size,
      width,
      disabled,
    });
    const classes = classNames(
      'raw-input',
      disabled && 'raw-disabled-input',
      className,
      resolveClassName
    );

    const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
      onFocus?.(event);
    };

    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
      onBlur?.(event);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setInternalValue(event.target.value);
      onChange?.(event);
    };

    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    return (
      <>
        <input
          ref={inputRef}
          type={htmlType}
          className={classes}
          value={internalValue}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          autoComplete={autoComplete}
          {...restProps}
        />
        {styles}
      </>
    );
  }
);

Input.displayName = 'RawInput';

export default Input;
