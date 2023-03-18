import { HTMLAttributes } from "react";
import { InputSizes, InputTypes } from "./Input.types";

interface BaseInputGroupProps {
  className?: string;
  size?: InputSizes;
  type?: InputTypes;
  readOnly?: boolean;
  disabled?: boolean;
}

type NativeInputGroupProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  keyof BaseInputGroupProps
>;

export type InputGroupProps = BaseInputGroupProps & NativeInputGroupProps;

export interface InputGroupConfig {
  size?: InputSizes;
  type?: InputTypes;
  readOnly?: boolean;
  disabled?: boolean;
  isInputGroup: boolean;
}
