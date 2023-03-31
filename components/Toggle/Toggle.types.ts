import { ChangeEvent, InputHTMLAttributes } from "react"

interface BaseToggleProps {
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  className?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

type NativeToggleProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  keyof BaseToggleProps
>;

export type ToggleProps = BaseToggleProps & NativeToggleProps

export interface ToggleStyles {
  borderColor?: string;
  backgroundColor?: string;
}

export type ToggleStatus = 'unChecked' | 'checked'