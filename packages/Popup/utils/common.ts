type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type Side = 'top' | 'right' | 'bottom' | 'left';
export type Axis = 'x' | 'y';
export type Length = 'width' | 'height';
export type Strategy = 'absolute' | 'fixed';
export type Coords = { [key in Axis]: number };
export type Dimensions = { [key in Length]: number };
export type Rect = Prettify<Coords & Dimensions>;
export type SideObject = { [key in Side]: number };
export type ClientRectObject = Prettify<Rect & SideObject>;

export const round = Math.round;
export const createCoords = (v: number) => ({ x: v, y: v });
