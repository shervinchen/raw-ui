import React, { useState } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Popover from '..';
import { PopoverProps } from '../Popover.types';

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
    const { getByTestId, findByTestId } = render(
      <Popover content="I am a popover">Click me</Popover>
    );
    await user.click(getByTestId('popoverTarget'));
    expect(await findByTestId('popoverContent')).toBeInTheDocument();
  });

  test('should switch whether or not popover is visible when click target', async () => {
    const user = userEvent.setup();
    const { getByTestId, findByTestId } = render(
      <Popover content="I am a popover">Click me</Popover>
    );
    const target = getByTestId('popoverTarget');
    await user.click(target);
    expect(await findByTestId('popoverContent')).toBeInTheDocument();
    await user.click(target);
    await waitFor(() => {
      expect(screen.queryByTestId('popoverContent')).not.toBeInTheDocument();
    });
  });

  test('should hide popover when click outside', async () => {
    const user = userEvent.setup();
    const { getByTestId, findByTestId } = render(
      <Popover content="I am a popover">Click me</Popover>
    );
    await user.click(getByTestId('popoverTarget'));
    expect(await findByTestId('popoverContent')).toBeInTheDocument();
    await user.click(document.body);
    await waitFor(() => {
      expect(screen.queryByTestId('popoverContent')).not.toBeInTheDocument();
    });
  });

  test('should support disabled popover', async () => {
    const user = userEvent.setup();
    const { getByTestId } = render(
      <Popover content="I am a popover" disabled>
        Click me
      </Popover>
    );
    await user.click(getByTestId('popoverTarget'));
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
    const { getByTestId, findByTestId } = render(
      <Component content="I am a controlled popover" onChange={onChange} />
    );
    await user.click(getByTestId('popoverTarget'));
    expect(await findByTestId('popoverContent')).toBeInTheDocument();
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
