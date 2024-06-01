import { createContext, useContext } from 'react';
import { GridConfig } from './Grid.types';

const defaultContext: GridConfig = {
  horizontalGutter: 0,
};

export const GridContext = createContext<GridConfig>(defaultContext);

export const useGridContext = (): GridConfig =>
  useContext<GridConfig>(GridContext);
