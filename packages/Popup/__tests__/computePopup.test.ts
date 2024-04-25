import { computePopupCoordinates, getTargetRect } from '../computePopup';

describe('computePopup.test', () => {
  test('should get default value of target rect when target ref is null', () => {
    const { width, height } = getTargetRect(null);
    expect(width).toBe(0);
    expect(height).toBe(0);
  });

  test('should get default value of popup coordinates when target ref is null', () => {
    const { top, bottom, left, right } = computePopupCoordinates(null, null);
    expect(top).toBe(0);
    expect(bottom).toBe(0);
    expect(left).toBe(0);
    expect(right).toBe(0);
  });
});
