import Tabs from './Tabs';
import TabsItem from './TabsItem';

export type TabsComponentType = typeof Tabs & {
  Tab: typeof TabsItem;
};

(Tabs as TabsComponentType).Tab = TabsItem;

export default Tabs as TabsComponentType;
