import { HTMLAttributes } from "react";
import { CheckboxValue } from "./Checkbox.types";

export type CheckboxGroupValue = CheckboxValue[]

interface BaseCheckboxGroupProps {
  defaultValue?: CheckboxGroupValue;
  value?: CheckboxGroupValue;
  disabled?: boolean;
  onChange?: (value: CheckboxGroupValue) => void;
  className?: string;
}

type NativeCheckboxGroupProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  keyof BaseCheckboxGroupProps
>;

export type CheckboxGroupProps = BaseCheckboxGroupProps &
  NativeCheckboxGroupProps;

export interface CheckboxGroupConfig {
  groupDisabled: boolean
  groupValue: CheckboxGroupValue
  inGroup: boolean
  onGroupChange?: (checkboxValue: CheckboxValue, checked: boolean) => void
}