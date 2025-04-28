import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import { Button, RawUIProvider, useTheme, Theme, RawUITheme } from '../..';
import userEvent from '@testing-library/user-event';
import { RawUIUserTheme } from '../theme.type';

const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

describe('Theme', () => {
  test('should support switch themes', async () => {
    const TestContent = () => {
      const theme = useTheme();

      return (
        <p data-testid="text" style={{ color: theme.palette.foreground }}>
          text
        </p>
      );
    };

    const TestApp = () => {
      const [themeType, setThemeType] = useState('light');

      const switchThemes = () => {
        setThemeType((lastValue) => (lastValue === 'dark' ? 'light' : 'dark'));
      };

      return (
        <RawUIProvider themeType={themeType}>
          <Button data-testid="button" onClick={switchThemes} />
          <TestContent />
        </RawUIProvider>
      );
    };

    render(<TestApp />);
    const button = screen.getByTestId('button');
    const text = screen.getByTestId('text');
    expect(text.style.color).toBe('rgb(0, 0, 0)');
    await user.click(button);
    expect(text.style.color).toBe('rgb(255, 255, 255)');
  });

  test('should support create theme from light', () => {
    const myTheme = Theme.createFromLight({
      type: 'myTheme',
      palette: {
        neutral: {
          50: '#ffffff',
        },
      },
    });

    const TestContent = () => {
      const theme = useTheme();

      return (
        <p data-testid="text" style={{ color: theme.palette.neutral['50'] }}>
          text
        </p>
      );
    };

    const TestApp = () => {
      return (
        <RawUIProvider themeType="myTheme" themes={[myTheme]}>
          <TestContent />
        </RawUIProvider>
      );
    };

    render(<TestApp />);
    const text = screen.getByTestId('text');
    expect(text.style.color).toBe('rgb(255, 255, 255)');
  });

  test('should support create theme from dark', () => {
    const myTheme = Theme.createFromDark({
      type: 'myTheme',
      palette: {
        neutral: {
          50: '#000000',
        },
      },
    });

    const TestContent = () => {
      const theme = useTheme();

      return (
        <p data-testid="text" style={{ color: theme.palette.neutral['50'] }}>
          text
        </p>
      );
    };

    const TestApp = () => {
      return (
        <RawUIProvider themeType="myTheme" themes={[myTheme]}>
          <TestContent />
        </RawUIProvider>
      );
    };

    render(<TestApp />);
    const text = screen.getByTestId('text');
    expect(text.style.color).toBe('rgb(0, 0, 0)');
  });

  test('should support create theme from custom', () => {
    const myTheme = Theme.createFromCustom(Theme.getPresetStaticTheme(), {
      type: 'myTheme',
      palette: {
        neutral: {
          50: '#ffffff',
        },
      },
    });

    const TestContent = () => {
      const theme = useTheme();

      return (
        <p data-testid="text" style={{ color: theme.palette.neutral['50'] }}>
          text
        </p>
      );
    };

    const TestApp = () => {
      return (
        <RawUIProvider themeType="myTheme" themes={[myTheme]}>
          <TestContent />
        </RawUIProvider>
      );
    };

    render(<TestApp />);
    const text = screen.getByTestId('text');
    expect(text.style.color).toBe('rgb(255, 255, 255)');
  });

  test('should not support duplicate or unavailable theme', () => {
    expect(() => {
      Theme.createFromCustom(Theme.getPresetStaticTheme(), {
        type: 'light',
        palette: {
          neutral: {
            50: '#ffffff',
          },
        },
      });
    }).toThrow('Duplicate or unavailable theme type');
    expect(() => {
      Theme.createFromCustom(null as unknown as RawUITheme, {
        type: 'light',
        palette: {
          neutral: {
            50: '#ffffff',
          },
        },
      });
    }).toThrow('Duplicate or unavailable theme type');
    expect(() => {
      Theme.createFromCustom(
        Theme.getPresetStaticTheme(),
        null as unknown as RawUIUserTheme
      );
    }).toThrow('Duplicate or unavailable theme type');
  });

  test('should isAvailableThemeType return true when theme type is available', () => {
    expect(Theme.isAvailableThemeType('myTheme')).toBe(true);
  });

  test('should isAvailableThemeType return false when theme type is unavailable', () => {
    expect(Theme.isAvailableThemeType('light')).toBe(false);
    expect(Theme.isAvailableThemeType()).toBe(false);
  });

  test('should hasUserCustomTheme return true if a list of themes has a custom', () => {
    const myTheme = Theme.createFromCustom(Theme.getPresetStaticTheme(), {
      type: 'myTheme',
      palette: {
        neutral: {
          50: '#ffffff',
        },
      },
    });
    expect(
      Theme.hasUserCustomTheme([Theme.getPresetStaticTheme(), myTheme])
    ).toBe(true);
  });

  test('should hasUserCustomTheme return false if a list of themes do not has a custom', () => {
    expect(Theme.hasUserCustomTheme([Theme.getPresetStaticTheme()])).toBe(
      false
    );
    expect(Theme.hasUserCustomTheme()).toBe(false);
    expect(Theme.hasUserCustomTheme([null as unknown as RawUITheme])).toBe(
      false
    );
    expect(Theme.hasUserCustomTheme(null as unknown as RawUITheme[])).toBe(
      false
    );
  });

  test('should return default theme when theme is falsy', () => {
    const TestContent = () => {
      const theme = useTheme();

      return (
        <p data-testid="text" style={{ color: theme.palette.foreground }}>
          text
        </p>
      );
    };

    const TestApp = () => {
      return (
        <RawUIProvider
          themeType="myTheme"
          themes={[null as unknown as RawUITheme]}
        >
          <TestContent />
        </RawUIProvider>
      );
    };

    render(<TestApp />);
    const text = screen.getByTestId('text');
    expect(text.style.color).toBe('rgb(0, 0, 0)');
  });
});
