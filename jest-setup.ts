import '@testing-library/jest-dom';
import { act } from '@testing-library/react';

beforeEach(() => {
  jest.useFakeTimers();
  let time = 0;
  jest.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
    setTimeout(() => {
      time += 100;
      callback(time);
    });
    return time;
  });
});

afterEach(() => {
  (window.requestAnimationFrame as jest.Mock).mockRestore();
  act(() => {
    jest.runOnlyPendingTimers();
  });
  jest.useRealTimers();
});
