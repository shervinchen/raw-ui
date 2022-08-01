import { HTMLAttributes } from 'react';

interface BaseLoadingProps {
  type?: 'dot' | 'spin';
  color?: string;
  className?: string;
  size?: number;
}

type NativeLoadingProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  keyof BaseLoadingProps
>;

export type LoadingProps = BaseLoadingProps & NativeLoadingProps;
