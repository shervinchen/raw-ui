import React, { Context, createContext, useContext } from 'react';

export interface RawUIContextParams {}

const defaultParams: RawUIContextParams = {};

export const RawUIContent: Context<RawUIContextParams> =
  createContext<RawUIContextParams>(defaultParams);

export const useRawUIContext = (): RawUIContextParams =>
  useContext<RawUIContextParams>(RawUIContent);
