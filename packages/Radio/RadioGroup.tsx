import React, { FC, PropsWithChildren, useCallback, useMemo } from 'react';
import classNames from 'classnames';
import { RadioGroupConfig, RadioGroupProps } from './RadioGroup.types';
import { useControlled } from '../utils/hooks';
import { RadioValue } from './Radio.types';
import { RadioGroupContext } from './radio-group-context';

const RadioGroup: FC<PropsWithChildren<RadioGroupProps>> = ({
  value: radioGroupValue,
  defaultValue = '',
  disabled = false,
  className = '',
  layout = 'row',
  onChange,
  children,
  ...restProps
}) => {
  const [internalValue, setInternalValue] = useControlled<RadioValue>({
    defaultValue,
    value: radioGroupValue,
  });
  const classes = classNames('raw-radio-group', className);

  const handleGroupChange = useCallback(
    (radioValue?: RadioValue) => {
      setInternalValue(radioValue);
      onChange?.(radioValue);
    },
    [onChange, setInternalValue]
  );

  const radioGroupConfig = useMemo<RadioGroupConfig>(() => {
    return {
      groupValue: internalValue,
      groupDisabled: disabled,
      inGroup: true,
      onGroupChange: handleGroupChange,
    };
  }, [internalValue, disabled, handleGroupChange]);

  return (
    <RadioGroupContext.Provider value={radioGroupConfig}>
      <div role="radiogroup" className={classes} {...restProps}>
        {children}
        <style jsx>{`
          .raw-radio-group {
            display: inline-flex;
            flex-direction: ${layout};
            gap: 32px;
          }
        `}</style>
      </div>
    </RadioGroupContext.Provider>
  );
};

export default RadioGroup;
