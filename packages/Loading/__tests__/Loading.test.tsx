import React from 'react';
import { render, screen } from '@testing-library/react';
import Loading from '..';
import { LoadingType } from '../Loading.types';

describe('Loading', () => {
  test('should match the snapshot', () => {
    const { asFragment } = render(<Loading />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('should support custom class name', () => {
    render(<Loading className="custom-loading" />);
    expect(screen.getByTestId('dotLoading')).toHaveClass('custom-loading');
  });

  ['dot', 'spin'].forEach((item: LoadingType) => {
    test(`should render ${item} type`, () => {
      render(<Loading type={item} />);
      expect(screen.getByTestId(`${item}Loading`)).toHaveClass(
        `raw-${item}-loading`
      );
    });
  });

  test('should render text with dot type', () => {
    render(<Loading>Loading</Loading>);
    expect(screen.getByText('Loading')).toBeTruthy();
  });

  test('should render text with spin type', () => {
    render(<Loading type="spin">Loading</Loading>);
    expect(screen.getByText('Loading')).toBeTruthy();
  });
});
