import React, { useState } from 'react';
import { render, act, screen, waitFor } from '@testing-library/react';
import Popover from '..';
import { PopoverProps } from '../Popover.types';
import userEvent from '@testing-library/user-event';

describe('Popover', () => {
  test('should match the snapshot', () => {
    const { asFragment } = render(
      <Popover content="I am a popover">Click me</Popover>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should support custom class name', () => {
    const { container } = render(
      <Popover content="I am a popover" className="custom-popover">
        Click me
      </Popover>
    );
    expect(container.firstChild).toHaveClass('custom-popover');
  });

  test('should show popover when click target', async () => {
    const user = userEvent.setup();
    render(<Popover content="I am a popover">Click me</Popover>);
    const element = document.querySelector('.raw-popover');
    await user.click(element);
    expect(screen.getByTestId('popoverContent')).toBeInTheDocument();
  });

  test('should switch whether or not popover is visible when click target', async () => {
    const user = userEvent.setup();
    render(<Popover content="I am a popover">Click me</Popover>);
    const element = document.querySelector('.raw-popover');
    await user.click(element);
    expect(screen.getByTestId('popoverContent')).toBeInTheDocument();
    await user.click(element);
    await waitFor(() => {
      expect(screen.queryByTestId('popoverContent')).not.toBeInTheDocument();
    });
  });

  test('should hide popover when click outside', async () => {
    const user = userEvent.setup();
    render(<Popover content="I am a popover">Click me</Popover>);
    const element = document.querySelector('.raw-popover');
    await user.click(element);
    expect(screen.getByTestId('popoverContent')).toBeInTheDocument();
    act(() => {
      document.dispatchEvent(new MouseEvent('click'));
    });
    await waitFor(() => {
      expect(screen.queryByTestId('popoverContent')).not.toBeInTheDocument();
    });
  });

  test('should support disabled popover', async () => {
    const user = userEvent.setup();
    render(
      <Popover content="I am a popover" disabled>
        Click me
      </Popover>
    );
    const element = document.querySelector('.raw-popover');
    await user.click(element);
    await waitFor(() => {
      expect(screen.queryByTestId('popoverContent')).not.toBeInTheDocument();
    });
  });

  test('should support controlled value', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    const Component = (props: PopoverProps) => {
      const [value, setValue] = useState(false);

      return (
        <Popover
          content={props.content}
          value={value}
          onChange={(nextValue) => {
            setValue(nextValue);
            props.onChange?.(nextValue);
          }}
        >
          Click me
        </Popover>
      );
    };

    render(
      <Component content="I am a controlled popover" onChange={onChange} />
    );
    const element = document.querySelector('.raw-popover');
    await user.click(element);
    expect(screen.getByTestId('popoverContent')).toBeInTheDocument();
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
