import React, { createContext, useContext } from 'react';
import { ButtonGroupConfig } from './ButtonGroup.types';

const defaultContext: ButtonGroupConfig = {
  size: 'md',
  type: 'default',
  variant: 'default',
  disabled: false,
  isButtonGroup: false,
};

export const ButtonGroupContext =
  createContext<ButtonGroupConfig>(defaultContext);

export const useButtonGroupContext = (): ButtonGroupConfig =>
  useContext<ButtonGroupConfig>(ButtonGroupContext);
