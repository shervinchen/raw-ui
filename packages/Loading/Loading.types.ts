import { HTMLAttributes } from 'react';

export type LoadingType = 'dot' | 'spin';

export interface BaseLoadingProps {
  type?: LoadingType;
  color?: string;
  className?: string;
  size?: number;
}

type NativeLoadingProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  keyof BaseLoadingProps
>;

export type LoadingProps = BaseLoadingProps & NativeLoadingProps;
