import React, { Context, createContext, useContext } from 'react';

export interface RawUIContextParams {}

const defaultParams = {};

export const RawUIContext: Context<RawUIContextParams> =
  createContext<RawUIContextParams>(defaultParams);

export const useRawUIContext = (): RawUIContextParams =>
  useContext<RawUIContextParams>(RawUIContext);
