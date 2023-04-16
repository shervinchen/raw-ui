
import React, {
  FC,
  PropsWithChildren,
  useEffect,
  useMemo,
} from "react";
import classNames from "classnames";
import { CheckboxGroupConfig, CheckboxGroupProps, CheckboxGroupValue } from "./CheckboxGroup.types";
import { useControlled } from "../utils/hooks";
import { CheckboxGroupContext } from "./checkbox-group-context";
import { CheckboxValue } from "./Checkbox.types";

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
  const classes = classNames(
    "raw-checkbox-group",
    className,
  );

  const groupChangeHandler = (checkboxValue?: CheckboxValue, checked?: boolean) => {
    const nextGroupValue = checked ? [...internalValue, checkboxValue] : internalValue.filter(value => value !== checkboxValue)
    setInternalValue(nextGroupValue)
    onChange?.(nextGroupValue)
  }

  const checkboxGroupConfig = useMemo<CheckboxGroupConfig>(() => {
    return {
      groupValue: internalValue,
      groupDisabled: disabled,
      inGroup: true,
      onGroupChange: groupChangeHandler
    }
  }, [internalValue, disabled])

  return (
    <CheckboxGroupContext.Provider value={checkboxGroupConfig}>
      <div className={classes} {...restProps}>
        {children}
        <style jsx>{`
          .raw-checkbox-group {
            display: flex;
            flex-direction: ${layout};
            gap: 32px;
          }
        `}</style>
      </div>
    </CheckboxGroupContext.Provider>
  )
}

export default CheckboxGroup;
