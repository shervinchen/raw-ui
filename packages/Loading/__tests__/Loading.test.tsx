import React from 'react';
import { render } from '@testing-library/react';
import Loading from '..';
import { LoadingType } from '../Loading.types';

describe('Loading', () => {
  test('should match the snapshot', () => {
    const { asFragment } = render(<Loading />);
    expect(asFragment()).toMatchSnapshot();
  });

  ['dot', 'spin'].forEach((item: LoadingType) => {
    test(`should render ${item} type`, () => {
      const { container } = render(<Loading type={item} />);
      expect(container.firstChild).toHaveClass(`raw-${item}-loading`);
    });
  });

  test('should render text', () => {
    const { container } = render(<Loading>Loading</Loading>);
    expect(container.querySelector('.raw-dot-loading-text')).toBeTruthy();
  });

  test('should support custom size', () => {
    const { container } = render(<Loading size={6} />);
    const loadingDots = container.querySelectorAll(
      '.raw-dot-loading-inner > i'
    );
    loadingDots.forEach((loadingDot) => {
      expect(getComputedStyle(loadingDot).width).toBe('6px');
    });
  });

  test('should support custom color', () => {
    const { container } = render(<Loading color="rgb(0, 0, 0)" />);
    const loadingDots = container.querySelectorAll(
      '.raw-dot-loading-inner > i'
    );
    loadingDots.forEach((loadingDot) => {
      expect(getComputedStyle(loadingDot).backgroundColor).toBe('rgb(0, 0, 0)');
    });
  });
});
