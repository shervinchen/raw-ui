import React, { createContext, useContext } from 'react';
import { InputGroupConfig } from './InputGroup.types';

const defaultContext: InputGroupConfig = {
  size: 'md',
  type: 'default',
  readOnly: false,
  disabled: false,
  isInputGroup: false,
};

export const InputGroupContext =
  createContext<InputGroupConfig>(defaultContext);

export const useInputGroupContext = (): InputGroupConfig =>
  useContext<InputGroupConfig>(InputGroupContext);
