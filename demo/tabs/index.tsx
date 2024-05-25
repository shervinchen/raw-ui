import Unit from '../Unit';
import { Tabs } from '@/packages';

export function DemoTabsDefault() {
  return (
    <Unit layout="row">
      <Tabs defaultValue="1">
        <Tabs.Tab label="Tab 1" value="1">
          Content of Tab Pane 1
        </Tabs.Tab>
        <Tabs.Tab label="Tab 2" value="2">
          Content of Tab Pane 2
        </Tabs.Tab>
        <Tabs.Tab label="Tab 3" value="3">
          Content of Tab Pane 3
        </Tabs.Tab>
      </Tabs>
    </Unit>
  );
}

export function DemoTabsDisabled() {
  return (
    <Unit layout="col">
      <Tabs defaultValue="1" disabled>
        <Tabs.Tab label="Tab 1" value="1">
          Content of Tab Pane 1
        </Tabs.Tab>
        <Tabs.Tab label="Tab 2" value="2">
          Content of Tab Pane 2
        </Tabs.Tab>
        <Tabs.Tab label="Tab 3" value="3">
          Content of Tab Pane 3
        </Tabs.Tab>
      </Tabs>
      <Tabs defaultValue="1">
        <Tabs.Tab label="Tab 1" value="1">
          Content of Tab Pane 1
        </Tabs.Tab>
        <Tabs.Tab label="Tab 2" value="2" disabled>
          Content of Tab Pane 2
        </Tabs.Tab>
        <Tabs.Tab label="Tab 3" value="3">
          Content of Tab Pane 3
        </Tabs.Tab>
      </Tabs>
    </Unit>
  );
}

export function DemoTabsVertical() {
  return (
    <Unit layout="row">
      <Tabs defaultValue="1" vertical>
        <Tabs.Tab label="Tab 1" value="1">
          Content of Tab Pane 1
        </Tabs.Tab>
        <Tabs.Tab label="Tab 2" value="2">
          Content of Tab Pane 2
        </Tabs.Tab>
        <Tabs.Tab label="Tab 3" value="3">
          Content of Tab Pane 3
        </Tabs.Tab>
      </Tabs>
    </Unit>
  );
}
