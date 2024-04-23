import React from 'react';
import { render, screen } from '@testing-library/react';
import Tooltip from '..';
import userEvent from '@testing-library/user-event';

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
    const user = userEvent.setup();
    render(<Tooltip content="I am a tooltip">Hover me</Tooltip>);
    const element = document.querySelector('.raw-tooltip');
    await user.hover(element);
    expect(screen.getByText('I am a tooltip')).toBeInTheDocument();
  });

  test('should hide tooltip when mouse out target', async () => {
    const user = userEvent.setup();
    render(<Tooltip content="I am a tooltip">Hover me</Tooltip>);
    const element = document.querySelector('.raw-tooltip');
    await user.hover(element);
    const tooltipContent = screen.getByTestId('tooltipContent');
    expect(tooltipContent).toBeInTheDocument();
    await user.unhover(element);
    expect(tooltipContent).not.toBeInTheDocument();
  });

  test('should support disabled tooltip', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="I am a tooltip" disabled>
        Hover me
      </Tooltip>
    );
    const element = document.querySelector('.raw-tooltip');
    await user.hover(element);
    expect(screen.queryByTestId('tooltipContent')).not.toBeInTheDocument();
  });
});
