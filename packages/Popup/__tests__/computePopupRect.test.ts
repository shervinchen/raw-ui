import { RefObject } from 'react';
import { computePopupRect, getRectSize } from '../computePopupRect';
import { getRectRelativeToOffsetParent } from '../utils/getRectRelativeToOffsetParent';

jest.mock('../utils/getRectRelativeToOffsetParent', () => ({
  getRectRelativeToOffsetParent: jest.fn(),
}));

const mockedGetRectRelativeToOffsetParent = jest.mocked(
  getRectRelativeToOffsetParent,
);

const createRef = <T extends HTMLElement>(current: T | null) =>
  ({ current }) as RefObject<T | null>;

describe('getRectSize', () => {
  test('should return zero sizes when the ref is empty', () => {
    expect(getRectSize(createRef(null))).toEqual({ width: 0, height: 0 });
  });

  test('should return the rect sizes', () => {
    const element = document.createElement('div');
    jest.spyOn(element, 'getBoundingClientRect').mockReturnValue({
      width: 120,
      height: 80,
      right: 120,
      bottom: 80,
    } as DOMRect);

    expect(getRectSize(createRef(element))).toEqual({
      width: 120,
      height: 80,
    });
  });

  test('should derive sizes from rect edges when width or height is zero', () => {
    const element = document.createElement('div');
    jest.spyOn(element, 'getBoundingClientRect').mockReturnValue({
      width: 0,
      height: 0,
      left: 10,
      top: 20,
      right: 130,
      bottom: 100,
    } as DOMRect);

    expect(getRectSize(createRef(element))).toEqual({
      width: 120,
      height: 80,
    });
  });
});

describe('computePopupRect', () => {
  test('should return zero rect when the target ref is empty', () => {
    const popup = document.createElement('div');

    expect(
      computePopupRect('absolute', createRef(null), createRef(popup)),
    ).toEqual({
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    });
  });

  test('should return zero rect when the popup ref is empty', () => {
    const target = document.createElement('div');

    expect(
      computePopupRect('absolute', createRef(target), createRef(null)),
    ).toEqual({
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    });
  });

  test('should return the rect relative to the offset parent', () => {
    const target = document.createElement('div');
    const popup = document.createElement('div');
    mockedGetRectRelativeToOffsetParent.mockReturnValue({
      x: 10,
      y: 20,
      width: 120,
      height: 80,
    });

    expect(
      computePopupRect('absolute', createRef(target), createRef(popup)),
    ).toEqual({
      top: 20,
      bottom: 100,
      left: 10,
      right: 130,
    });
  });
});
