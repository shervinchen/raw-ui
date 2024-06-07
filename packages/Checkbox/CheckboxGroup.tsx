import React, { FC, PropsWithChildren, useCallback, useMemo } from 'react';
import classNames from 'classnames';
import {
  CheckboxGroupConfig,
  CheckboxGroupProps,
  CheckboxGroupValue,
} from './CheckboxGroup.types';
import { useControlled } from '../utils/hooks';
import { CheckboxGroupContext } from './checkbox-group-context';
import { CheckboxValue } from './Checkbox.types';

const CheckboxGroup: FC<PropsWithChildren<CheckboxGroupProps>> = ({
  value: checkboxGroupValue,
  defaultValue = [],
  disabled = false,
  className = '',
  layout = 'row',
  onChange,
  children,
  ...restProps
}) => {
  const [internalValue, setInternalValue] = useControlled<CheckboxGroupValue>({
    defaultValue,
    value: checkboxGroupValue,
  });
  const classes = classNames('raw-checkbox-group', className);

  const handleGroupChange = useCallback(
    (checkboxValue?: CheckboxValue, checked?: boolean) => {
      const nextGroupValue = checked
        ? [...internalValue, checkboxValue]
        : internalValue.filter((value) => value !== checkboxValue);
      setInternalValue(nextGroupValue);
      onChange?.(nextGroupValue);
    },
    [internalValue, onChange, setInternalValue]
  );

  const checkboxGroupConfig = useMemo<CheckboxGroupConfig>(() => {
    return {
      groupValue: internalValue,
      groupDisabled: disabled,
      inGroup: true,
      onGroupChange: handleGroupChange,
    };
  }, [internalValue, disabled, handleGroupChange]);

  return (
    <CheckboxGroupContext.Provider value={checkboxGroupConfig}>
      <div
        role="group"
        className={classes}
        {...restProps}
        data-testid="checkboxGroup"
      >
        {children}
        <style jsx>{`
          .raw-checkbox-group {
            display: inline-flex;
            flex-direction: ${layout};
            gap: 32px;
          }
        `}</style>
      </div>
    </CheckboxGroupContext.Provider>
  );
};

export default CheckboxGroup;
