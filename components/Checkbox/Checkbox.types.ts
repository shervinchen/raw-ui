import { ChangeEvent, InputHTMLAttributes } from "react"

export type CheckboxValue = string | number

interface BaseCheckboxProps {
  checked?: boolean
  defaultChecked?: boolean
  value?: CheckboxValue
  disabled?: boolean
  indeterminate?: boolean
  className?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

type NativeCheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  keyof BaseCheckboxProps
>;

export type CheckboxProps = BaseCheckboxProps & NativeCheckboxProps;

export interface CheckboxIconProps {
  checked?: boolean
  indeterminate?: boolean
}