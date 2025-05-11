import { createContext, useContext } from 'react';
import { SelectConfig } from './Select.types';

const defaultContext: SelectConfig = {
  selectId: '',
  selectTargetRef: { current: null },
  selectTarget: null,
  multiple: false,
  disabled: false,
  strategy: 'absolute',
};

export const SelectContext = createContext<SelectConfig>(defaultContext);

export const useSelectContext = (): SelectConfig =>
  useContext<SelectConfig>(SelectContext);
