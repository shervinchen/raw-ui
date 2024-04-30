import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Overlay from '..';

const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

describe('Overlay', () => {
  test('should match the snapshot', () => {
    const { asFragment } = render(<Overlay visible />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('should trigger click event', async () => {
    const mockClickFn = jest.fn();
    const { getByTestId } = render(<Overlay visible onClick={mockClickFn} />);
    await user.click(getByTestId('overlay'));
    expect(mockClickFn).toHaveBeenCalledTimes(1);
  });

  test('should hide the overlay when visible is undefined', () => {
    const { queryByTestId } = render(<Overlay />);
    expect(queryByTestId('overlay')).not.toBeInTheDocument();
  });
});
