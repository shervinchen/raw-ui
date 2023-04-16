import { HTMLAttributes } from "react";

export interface BaseSelectDropdownProps {
  visible: boolean
  className?: string
}

type NativeSelectDropdownProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  keyof BaseSelectDropdownProps
>;

export type SelectDropdownProps = BaseSelectDropdownProps & NativeSelectDropdownProps;