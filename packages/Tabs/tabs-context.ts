import { createContext, useContext } from 'react';
import { TabsConfig } from './Tabs.types';

const defaultContext: TabsConfig = {};

export const TabsContext = createContext<TabsConfig>(defaultContext);

export const useTabsContext = (): TabsConfig =>
  useContext<TabsConfig>(TabsContext);
