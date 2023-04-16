import { ChangeEvent, InputHTMLAttributes } from "react"

export type RadioValue = string | number | undefined

export interface BaseRadioProps {
  checked?: boolean
  defaultChecked?: boolean
  value?: RadioValue
  disabled?: boolean
  className?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

type NativeRadioProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  keyof BaseRadioProps
>;

export type RadioProps = BaseRadioProps & NativeRadioProps
