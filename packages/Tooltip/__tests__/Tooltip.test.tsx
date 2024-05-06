import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Tooltip from '..';
import userEvent from '@testing-library/user-event';

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
});
