import React, { FC, PropsWithChildren } from 'react';

import { RawUIContext } from './ThemeContext';
import BaseStyle from '../BaseStyle';

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const initialValue = {};
  return (
    <RawUIContext.Provider value={initialValue}>
      <BaseStyle />
      {children}
    </RawUIContext.Provider>
  );
};

export default ThemeProvider;
