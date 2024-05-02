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

  test('should support custom class name', () => {
    const { container } = render(
      <Tooltip content="I am a tooltip" className="custom-tooltip">
        Hover me
      </Tooltip>
    );
    expect(container.firstChild).toHaveClass('custom-tooltip');
  });

  test('should show tooltip when mouse over target', async () => {
    render(<Tooltip content="I am a tooltip">Hover me</Tooltip>);
    await user.hover(screen.getByTestId('tooltipTarget'));
    expect(await screen.findByTestId('tooltipContent')).toBeInTheDocument();
  });

  test('should hide tooltip when mouse out target', async () => {
    render(<Tooltip content="I am a tooltip">Hover me</Tooltip>);
    const target = screen.getByTestId('tooltipTarget');
    await user.hover(target);
    expect(await screen.findByTestId('tooltipContent')).toBeInTheDocument();
    await user.unhover(target);
    await waitFor(() => {
      expect(screen.queryByTestId('tooltipContent')).not.toBeInTheDocument();
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
      expect(screen.queryByTestId('tooltipContent')).not.toBeInTheDocument();
    });
  });
});
