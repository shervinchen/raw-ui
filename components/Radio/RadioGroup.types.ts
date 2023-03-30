import { HTMLAttributes } from "react";
import { RadioValue } from "./Radio.types";

interface BaseRadioGroupProps {
  defaultValue?: RadioValue;
  value?: RadioValue;
  disabled?: boolean;
  layout?: 'row' | 'column'
  onChange?: (value: RadioValue) => void;
  className?: string;
}

type NativeRadioGroupProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  keyof BaseRadioGroupProps
>;

export type RadioGroupProps = BaseRadioGroupProps & NativeRadioGroupProps;

export interface RadioGroupConfig {
  groupDisabled: boolean
  groupValue: RadioValue
  inGroup: boolean
  onGroupChange?: (checkboxValue: RadioValue) => void
}