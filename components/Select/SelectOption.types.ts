import { HTMLAttributes } from "react";

interface BaseSelectOptionProps {
  value?: string | number;
  disabled?: boolean;
  className?: string;
}

type NativeSelectOptionProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  keyof BaseSelectOptionProps
>;

export type SelectOptionProps = BaseSelectOptionProps & NativeSelectOptionProps;
