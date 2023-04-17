import { HTMLAttributes } from "react";
import { InputComponent, InputSizes, InputTypes } from "./Input.types";
import { InputAddonType } from "./InputAddon";
import { InputElementType } from "./InputElement";

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

export type InputGroupChild = InputAddonType | InputElementType | InputComponent

export interface InputGroupConfig {
  size?: InputSizes;
  type?: InputTypes;
  readOnly?: boolean;
  disabled?: boolean;
  isInputGroup: boolean;
}
