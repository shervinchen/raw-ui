import { CSSProperties, HTMLAttributes } from 'react';

interface BaseGridProps {
  gutter?: [number, number];
  align?: 'top' | 'center' | 'bottom';
  justify?:
    | 'start'
    | 'center'
    | 'end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  className?: string;
  style?: CSSProperties;
}

interface BaseGridColProps {
  offset?: number;
  order?: number;
  span?: number;
  className?: string;
  style?: CSSProperties;
}

type NativeGridProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  keyof BaseGridProps
>;

type NativeGridColProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  keyof BaseGridColProps
>;

export type GridProps = BaseGridProps & NativeGridProps;
export type GridColProps = BaseGridColProps & NativeGridColProps;

export interface GridConfig {
  horizontalGutter: number;
}
