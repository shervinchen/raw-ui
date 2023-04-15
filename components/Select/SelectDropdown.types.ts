import { HTMLAttributes } from "react";

interface BaseSelectDropdownProps {
  visible: boolean
  className?: string
}

type NativeSelectDropdownProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  keyof BaseSelectDropdownProps
>;

export type SelectDropdownProps = BaseSelectDropdownProps & NativeSelectDropdownProps;