import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tooltip from '..';
import Modal from '../../Modal';
import Button from '../../Button';
import { Theme } from '../../Theme';

const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

describe('Tooltip', () => {
  test('should match the snapshot', () => {
    const { asFragment } = render(
      <Tooltip content="I am a tooltip">Hover me</Tooltip>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should support custom class name', async () => {
    render(
      <Tooltip content="I am a tooltip" className="custom-tooltip">
        Hover me
      </Tooltip>
    );
    await user.hover(screen.getByTestId('tooltipTarget'));
    expect(await screen.findByRole('tooltip')).toHaveClass('custom-tooltip');
  });

  test('should show tooltip when mouse over target', async () => {
    render(<Tooltip content="I am a tooltip">Hover me</Tooltip>);
    await user.hover(screen.getByTestId('tooltipTarget'));
    expect(await screen.findByRole('tooltip')).toBeInTheDocument();
  });

  test('should hide tooltip when mouse out target', async () => {
    render(<Tooltip content="I am a tooltip">Hover me</Tooltip>);
    const target = screen.getByTestId('tooltipTarget');
    await user.hover(target);
    expect(await screen.findByRole('tooltip')).toBeInTheDocument();
    await user.unhover(target);
    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });

  test('should support disabled tooltip', async () => {
    render(
      <Tooltip content="I am a tooltip" disabled>
        Hover me
      </Tooltip>
    );
    await user.hover(screen.getByTestId('tooltipTarget'));
    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });

  test('should set popup zIndex by closest floating container', async () => {
    render(
      <Modal visible>
        <Modal.Header>Modal Title</Modal.Header>
        <Modal.Body>
          <Tooltip content="I am a tooltip">Hover me</Tooltip>
        </Modal.Body>
        <Modal.Footer>
          <Button>Cancel</Button>
          <Button type="primary">Confirm</Button>
        </Modal.Footer>
      </Modal>
    );
    await user.hover(screen.getByTestId('tooltipTarget'));
    const popup = screen.getByTestId('popup');
    expect(popup).toHaveStyle({
      zIndex: Theme.getPresetStaticTheme().zIndex.modal + 1,
    });
  });
});
