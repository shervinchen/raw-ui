import React, { useState } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Popover from '..';
import { PopoverProps } from '../Popover.types';
import { KeyCode } from '../../utils/constant';
import Modal from '../../Modal';
import Button from '../../Button';
import { Theme } from '../../Theme';

const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

describe('Popover', () => {
  test('should match the snapshot', () => {
    const { asFragment } = render(
      <Popover content="I am a popover">Click me</Popover>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should show popover when default value is true', async () => {
    render(
      <Popover defaultValue content="I am a popover">
        Click me
      </Popover>
    );
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
  });

  test('should support custom class name', async () => {
    render(
      <Popover content="I am a popover" className="custom-popover">
        Click me
      </Popover>
    );
    await user.click(screen.getByTestId('popoverTarget'));
    expect(await screen.findByRole('dialog')).toHaveClass('custom-popover');
  });

  test('should show popover when click target', async () => {
    render(<Popover content="I am a popover">Click me</Popover>);
    await user.click(screen.getByTestId('popoverTarget'));
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
  });

  test('should switch whether or not popover is visible when click target', async () => {
    render(<Popover content="I am a popover">Click me</Popover>);
    const target = screen.getByTestId('popoverTarget');
    await user.click(target);
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    await user.click(target);
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  test('should hide popover when click outside', async () => {
    render(<Popover content="I am a popover">Click me</Popover>);
    await user.click(screen.getByTestId('popoverTarget'));
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    await user.click(document.body);
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  test('should support disabled popover', async () => {
    render(
      <Popover content="I am a popover" disabled>
        Click me
      </Popover>
    );
    await user.click(screen.getByTestId('popoverTarget'));
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  test('should support controlled value', async () => {
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
    await user.click(screen.getByTestId('popoverTarget'));
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  test('should support set parent container element', () => {
    render(
      <div
        id="parentElement"
        style={{
          position: 'relative',
          overflowY: 'auto',
          width: '400px',
          height: '200px',
        }}
      >
        <Popover
          content="I am a popover"
          getPopupContainer={() => document.querySelector('#parentElement')}
        >
          Click me
        </Popover>
      </div>
    );
  });

  test('should close popover when press the Escape key', async () => {
    render(
      <Popover defaultValue content="I am a popover">
        Click me
      </Popover>
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await user.keyboard(`[${KeyCode.Escape}]`);
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  test('should set popup zIndex by closest floating container', () => {
    render(
      <Modal visible>
        <Modal.Header>Modal Title</Modal.Header>
        <Modal.Body>
          <Popover defaultValue content="I am a popover">
            Click me
          </Popover>
        </Modal.Body>
        <Modal.Footer>
          <Button>Cancel</Button>
          <Button type="primary">Confirm</Button>
        </Modal.Footer>
      </Modal>
    );
    const popup = screen.getByTestId('popup');
    expect(popup).toHaveStyle({
      zIndex: Theme.getPresetStaticTheme().zIndex.modal + 1,
    });
  });

  test('should set popup zIndex by closest floating container with popup', () => {
    render(
      <Popover
        defaultValue
        content={
          <Popover defaultValue content="I am a popover">
            Click me
          </Popover>
        }
      >
        Click me
      </Popover>
    );
    const popups = screen.getAllByTestId('popup');
    popups.forEach((popup) => {
      if (popup.innerHTML.indexOf('I am a popover') !== -1) {
        expect(popup).toHaveStyle({
          zIndex: Theme.getPresetStaticTheme().zIndex.popover + 1,
        });
      }
    });
  });
});
