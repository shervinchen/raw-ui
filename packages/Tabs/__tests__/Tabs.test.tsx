import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs } from '../..';
import { TabsProps } from '../Tabs.types';

const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

describe('Tabs', () => {
  test('should match the snapshot', () => {
    const { asFragment } = render(
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
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should support custom class name', () => {
    render(
      <Tabs defaultValue="1" className="custom-tabs">
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
    );
    expect(screen.getByTestId('tabs')).toHaveClass('custom-tabs');
  });

  test('should support default value', () => {
    render(
      <Tabs defaultValue="2">
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
    );
    expect(screen.getByText('Tab 2')).toHaveClass('raw-tabs-nav-item-active');
  });

  test('should support controlled value', async () => {
    const onChange = jest.fn();

    const Component = (props: TabsProps) => {
      const [value, setValue] = useState('1');

      return (
        <Tabs
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
            props.onChange?.(newValue);
          }}
        >
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
      );
    };

    render(<Component onChange={onChange} />);
    const tabItemSecond = screen.getByText('Tab 2');
    await user.click(tabItemSecond);
    expect(tabItemSecond).toHaveClass('raw-tabs-nav-item-active');
    expect(onChange).toHaveBeenCalledWith('2');
  });

  test('should not select any tab when no value matched', () => {
    render(
      <Tabs defaultValue="4">
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
    );
    expect(screen.getByText('Tab 1')).not.toHaveClass(
      'raw-tabs-nav-item-active'
    );
    expect(screen.getByText('Tab 2')).not.toHaveClass(
      'raw-tabs-nav-item-active'
    );
    expect(screen.getByText('Tab 3')).not.toHaveClass(
      'raw-tabs-nav-item-active'
    );
  });

  test('should not render any tab when child tabs is empty', () => {
    render(<Tabs defaultValue="1"></Tabs>);
    expect(screen.queryByText('Tab 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Tab 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Tab 3')).not.toBeInTheDocument();
  });

  test('should support all tabs disabled', async () => {
    render(
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
    );
    expect(screen.getByText('Tab 1')).toHaveClass('raw-tabs-nav-item-disabled');
    expect(screen.getByText('Tab 2')).toHaveClass('raw-tabs-nav-item-disabled');
    expect(screen.getByText('Tab 3')).toHaveClass('raw-tabs-nav-item-disabled');
    await user.click(screen.getByText('Tab 2'));
    expect(screen.getByText('Tab 2')).not.toHaveClass(
      'raw-tabs-nav-item-active'
    );
  });

  test('should support tab item disabled', async () => {
    render(
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
    );
    expect(screen.getByText('Tab 2')).toHaveClass('raw-tabs-nav-item-disabled');
    await user.click(screen.getByText('Tab 2'));
    expect(screen.getByText('Tab 2')).not.toHaveClass(
      'raw-tabs-nav-item-active'
    );
  });

  test('should support vertical', () => {
    render(
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
    );

    expect(screen.getByTestId('tabs')).toHaveClass('raw-tabs-vertical');
  });
});
