import React, { ChangeEvent, useState } from 'react';
import { render, renderHook } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Toggle from '..';
import { ToggleProps, ToggleStatus } from '../Toggle.types';
import { useToggleStyles } from '../Toggle.styles';

describe('Toggle', () => {
  test('should match the snapshot', () => {
    const { asFragment } = render(<Toggle />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('should support custom class name', () => {
    const { container } = render(<Toggle className="custom-toggle" />);
    expect(container.firstChild).toHaveClass('custom-toggle');
  });

  test('should trigger event when clicked', async () => {
    const clickHandler = jest.fn();
    const { container } = render(<Toggle onClick={clickHandler} />);
    const toggle = container.firstChild;
    await userEvent.click(toggle as Element);
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });

  test('should support uncontrolled value', () => {
    const { container } = render(<Toggle defaultChecked />);
    const toggleInput = container.querySelector('.raw-toggle-input');
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

    const { container } = render(<Component onChange={onChange} />);
    const toggle = container.firstChild;
    const toggleInput = container.querySelector('.raw-toggle-input');
    expect(toggleInput).not.toBeChecked();
    await userEvent.click(toggle as Element);
    expect(toggleInput).toBeChecked();
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  test('should support disabled', async () => {
    const { container } = render(<Toggle disabled />);
    const toggle = container.firstChild;
    const toggleInput = container.querySelector('.raw-toggle-input');
    expect(toggleInput).toBeDisabled();
    await userEvent.click(toggle as Element);
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
        status: undefined as ToggleStatus,
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
        status: undefined as ToggleStatus,
        disabled: true,
      })
    );

    expect(result1.current.backgroundColor).toBe('#fafafa');
    expect(result2.current.backgroundColor).toBe('#fafafa');
  });
});
