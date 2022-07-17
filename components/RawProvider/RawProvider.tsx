import React, { FC, PropsWithChildren } from 'react';

import { RawUIContext } from '../utils/useRawUIContext';
import BaseStyle from '../BaseStyle';

const RawProvider: FC<PropsWithChildren> = ({ children }) => {
  const initialValue = {};
  return (
    <RawUIContext.Provider value={initialValue}>
      <BaseStyle />
      {children}
    </RawUIContext.Provider>
  );
};

export default RawProvider;
