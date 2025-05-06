import { computePopupRect, getRectSize } from '../computePopupRect';

describe('computePopupRect.test', () => {
  test('should get default value of target rect when target ref is null', () => {
    const { width, height } = getRectSize(undefined);
    expect(width).toBe(0);
    expect(height).toBe(0);
  });

  test('should get default value of target position when target ref is null', () => {
    const { top, bottom, left, right } = computePopupRect(undefined, undefined);
    expect(top).toBe(0);
    expect(bottom).toBe(0);
    expect(left).toBe(0);
    expect(right).toBe(0);
  });
});
