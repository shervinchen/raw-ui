import { ComponentPropsWithoutRef, CSSProperties } from 'react';
import { Merge } from '../utils';

export enum BreakPoints {
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
  xxl = 'xxl',
}
export type BreakPoint = keyof typeof BreakPoints;

export type ResponsiveValue<T> = T | { [key in BreakPoint]?: T };

export type Gutter = [ResponsiveValue<number>, ResponsiveValue<number>];

export enum Aligns {
  normal = 'normal',
  top = 'top',
  center = 'center',
  bottom = 'bottom',
}
export enum Justifies {
  normal = 'normal',
  start = 'start',
  center = 'center',
  end = 'end',
  'space-between' = 'space-between',
  'space-around' = 'space-around',
  'space-evenly' = 'space-evenly',
}

export type Align = keyof typeof Aligns;
export type Justify = keyof typeof Justifies;

export interface BaseGridProps {
  gutter?: Gutter;
  align?: ResponsiveValue<Align>;
  justify?: ResponsiveValue<Justify>;
  className?: string;
}

export interface BaseGridColProps {
  offset?: ResponsiveValue<number>;
  order?: ResponsiveValue<number>;
  span?: ResponsiveValue<number>;
  className?: string;
  style?: CSSProperties;
}

export type GridProps = Merge<ComponentPropsWithoutRef<'div'>, BaseGridProps>;
export type GridColProps = Merge<
  ComponentPropsWithoutRef<'div'>,
  BaseGridColProps
>;

export interface ColSpanStyle {
  display: string;
  flex: string;
  maxWidth: string;
}

export interface ColOffsetStyle {
  marginInlineStart: number | string;
}

export interface ColOrderStyle {
  order: number;
}

export interface ColStyle {
  span: ColSpanStyle;
  offset: ColOffsetStyle;
  order: ColOrderStyle;
}

export type ColSpanResponsiveStyle = {
  [key in BreakPoint]: ColSpanStyle;
};

export type ColOffsetResponsiveStyle = {
  [key in BreakPoint]: ColOffsetStyle;
};

export type ColOrderResponsiveStyle = {
  [key in BreakPoint]: ColOrderStyle;
};

export type ColResponsiveStyle = {
  [key in BreakPoint]: ColSpanStyle | ColOffsetStyle | ColOrderStyle;
};

export type GutterResponsiveStyle = {
  [key in BreakPoint]: number;
};

export interface GridConfig {
  horizontalGutterResponsiveStyle: GutterResponsiveStyle;
}

export type AlignResponsiveStyle = {
  [key in BreakPoint]: Align;
};

export type JustifyResponsiveStyle = {
  [key in BreakPoint]: Justify;
};
