import { act } from 'react';
import { TextEncoder, TextDecoder } from 'util';
import '@testing-library/jest-dom';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

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

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));
