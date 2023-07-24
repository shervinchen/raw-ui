import React, { useState } from 'react';
import { render } from '@testing-library/react';
import { Button, RawUIProvider, useTheme, Theme } from '../..';
import userEvent from '@testing-library/user-event';

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

    const { getByTestId } = render(<TestApp />);
    const button = getByTestId('button');
    const text = getByTestId('text');
    expect(text.style.color).toBe('rgb(0, 0, 0)');
    await userEvent.click(button);
    expect(text.style.color).toBe('rgb(255, 255, 255)');
  });

  test('should support create theme from light', () => {
    const myTheme = Theme.createFromLight({
      type: 'myTheme',
      palette: {
        accents1: '#000',
      },
    });

    const TestContent = () => {
      const theme = useTheme();

      return (
        <p data-testid="text" style={{ color: theme.palette.accents1 }}>
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

    const { getByTestId } = render(<TestApp />);
    const text = getByTestId('text');
    expect(text.style.color).toBe('rgb(0, 0, 0)');
  });

  test('should support create theme from dark', () => {
    const myTheme = Theme.createFromDark({
      type: 'myTheme',
      palette: {
        accents1: '#000',
      },
    });

    const TestContent = () => {
      const theme = useTheme();

      return (
        <p data-testid="text" style={{ color: theme.palette.accents1 }}>
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

    const { getByTestId } = render(<TestApp />);
    const text = getByTestId('text');
    expect(text.style.color).toBe('rgb(0, 0, 0)');
  });

  test('should support create theme from custom', () => {
    const myTheme = Theme.createFromCustom(Theme.getPresetStaticTheme(), {
      type: 'myTheme',
      palette: {
        accents1: '#000',
      },
    });

    const TestContent = () => {
      const theme = useTheme();

      return (
        <p data-testid="text" style={{ color: theme.palette.accents1 }}>
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

    const { getByTestId } = render(<TestApp />);
    const text = getByTestId('text');
    expect(text.style.color).toBe('rgb(0, 0, 0)');
  });

  test('should not support duplicate theme', () => {
    expect(() => {
      Theme.createFromCustom(Theme.getPresetStaticTheme(), {
        type: 'light',
        palette: {
          accents1: '#000',
        },
      });
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
        accents1: '#000',
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
  });

  test('should use source theme when target or source is not object', () => {
    const myTheme = Theme.createFromCustom(null, {
      type: 'myTheme',
      palette: {
        accents1: '#000',
      },
    });
    expect(myTheme).toBe(null);
  });
});
