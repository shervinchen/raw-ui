import { createContext, useContext } from 'react';
import { GridConfig } from './Grid.types';

const defaultContext: GridConfig = {
  horizontalGutterResponsiveStyle: {
    sm: 0,
    xs: 0,
    md: 0,
    lg: 0,
    xl: 0,
    xxl: 0,
  },
};

export const GridContext = createContext<GridConfig>(defaultContext);

export const useGridContext = (): GridConfig =>
  useContext<GridConfig>(GridContext);
