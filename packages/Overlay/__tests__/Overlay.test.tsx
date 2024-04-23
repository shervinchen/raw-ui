import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Overlay from '..';

describe('Overlay', () => {
  test('should match the snapshot', () => {
    const { asFragment } = render(<Overlay visible />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('should trigger click event', async () => {
    const mockClickFn = jest.fn();
    const { getByTestId } = render(<Overlay visible onClick={mockClickFn} />);
    await userEvent.click(getByTestId('overlay'));
    expect(mockClickFn).toHaveBeenCalledTimes(1);
  });
});
