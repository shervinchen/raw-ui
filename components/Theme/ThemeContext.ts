import { Context, createContext } from 'react';

export interface RawUIContextParams {}

const defaultParams = {};

export const RawUIContext: Context<RawUIContextParams> =
  createContext<RawUIContextParams>(defaultParams);
