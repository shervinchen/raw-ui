import React, { ChangeEvent, useState } from 'react';
import { render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Toggle from '..';
import { ToggleProps, ToggleStatus } from '../Toggle.types';
import { useToggleStyles } from '../Toggle.styles';

const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

describe('Toggle', () => {
  test('should match the snapshot', () => {
    const { asFragment } = render(<Toggle />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('should support custom class name', () => {
    render(<Toggle className="custom-toggle" />);
    expect(screen.getByTestId('toggleLabel')).toHaveClass('custom-toggle');
  });

  test('should trigger event when clicked', async () => {
    const handleClick = jest.fn();
    render(<Toggle onClick={handleClick} />);
    const toggle = screen.getByTestId('toggleLabel');
    await user.click(toggle);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('should support uncontrolled value', () => {
    render(<Toggle defaultChecked />);
    const toggleInput = screen.getByRole('switch');
    expect(toggleInput).toBeChecked();
  });

  test('should support controlled value', async () => {
    const onChange = jest.fn();

    const Component = (props: ToggleProps) => {
      const [checked, setChecked] = useState(false);

      return (
        <Toggle
          checked={checked}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setChecked(event.target.checked);
            props.onChange?.(event);
          }}
        />
      );
    };

    render(<Component onChange={onChange} />);
    const toggle = screen.getByTestId('toggleLabel');
    const toggleInput = screen.getByRole('switch');
    expect(toggleInput).not.toBeChecked();
    await user.click(toggle);
    expect(toggleInput).toBeChecked();
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  test('should support disabled', async () => {
    render(<Toggle disabled />);
    const toggle = screen.getByTestId('toggleLabel');
    const toggleInput = screen.getByRole('switch');
    expect(toggleInput).toBeDisabled();
    await user.click(toggle);
    expect(toggleInput).not.toBeChecked();
  });

  test('should get default style when status is unknown or falsy', () => {
    const { result: result1 } = renderHook(() =>
      useToggleStyles({
        status: 'unknown' as ToggleStatus,
        disabled: false,
      })
    );

    const { result: result2 } = renderHook(() =>
      useToggleStyles({
        status: undefined as unknown as ToggleStatus,
        disabled: false,
      })
    );

    expect(result1.current.backgroundColor).toBe('#eaeaea');
    expect(result2.current.backgroundColor).toBe('#eaeaea');
  });

  test('should get default disabled style when status is unknown or falsy', () => {
    const { result: result1 } = renderHook(() =>
      useToggleStyles({
        status: 'unknown' as ToggleStatus,
        disabled: true,
      })
    );

    const { result: result2 } = renderHook(() =>
      useToggleStyles({
        status: undefined as unknown as ToggleStatus,
        disabled: true,
      })
    );

    expect(result1.current.backgroundColor).toBe('#fafafa');
    expect(result2.current.backgroundColor).toBe('#fafafa');
  });
});
