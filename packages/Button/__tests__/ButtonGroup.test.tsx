import React from 'react';
import { render } from '@testing-library/react';
import Button from '..';
import { ButtonSizes, ButtonTypes } from '../Button.types';
import { ButtonGroupVariant } from '../ButtonGroup.types';

const typeColorMap = {
  primary: 'rgb(0, 0, 0)',
  success: 'rgb(0, 112, 243)',
  warning: 'rgb(245, 166, 35)',
  error: 'rgb(238, 0, 0)',
};

const sizeHeightMap = {
  sm: '34px',
  md: '40px',
  lg: '46px',
};

describe('ButtonGroup', () => {
  test('should match the snapshot', () => {
    const { asFragment } = render(
      <Button.Group>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </Button.Group>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should support custom class name', () => {
    const { container } = render(
      <Button.Group className="custom-button-group">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </Button.Group>
    );
    expect(container.firstChild).toHaveClass('custom-button-group');
  });

  test('should render the correct number of child', () => {
    const { container } = render(
      <Button.Group>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </Button.Group>
    );
    expect(container.querySelectorAll('.raw-button').length).toBe(3);
  });

  ['primary', 'success', 'warning', 'error'].forEach(
    (item: Exclude<ButtonTypes, 'default'>) => {
      test(`should render ${item} type`, () => {
        const { container } = render(
          <Button.Group type={item}>
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </Button.Group>
        );
        const buttons = container.querySelectorAll(`.raw-button`);
        buttons.forEach((button) => {
          expect(getComputedStyle(button).backgroundColor).toBe(
            typeColorMap[item]
          );
        });
      });
    }
  );

  ['sm', 'md', 'lg'].forEach((item: ButtonSizes) => {
    test(`should render ${item} size`, () => {
      const { container } = render(
        <Button.Group size={item}>
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </Button.Group>
      );
      const buttons = container.querySelectorAll(`.raw-button`);
      buttons.forEach((button) => {
        expect(getComputedStyle(button).height).toBe(sizeHeightMap[item]);
      });
    });
  });

  test('should render outline variant', () => {
    const { container } = render(
      <Button.Group type="primary" variant="outline">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </Button.Group>
    );
    const buttons = container.querySelectorAll(`.raw-button`);
    buttons.forEach((button) => {
      expect(getComputedStyle(button).color).toBe('rgb(0, 0, 0)');
    });
  });

  test('should render ghost variant', () => {
    const { container } = render(
      <Button.Group type="primary" variant="ghost">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </Button.Group>
    );
    const buttons = container.querySelectorAll(`.raw-button`);
    buttons.forEach((button) => {
      expect(getComputedStyle(button).backgroundColor).toBe('transparent');
    });
  });

  test('should get default style when variant is unknown', () => {
    const { container } = render(
      <Button.Group variant={'unknown' as ButtonGroupVariant}>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </Button.Group>
    );
    const buttons = container.querySelectorAll('.raw-button');
    buttons.forEach((button) => {
      expect(getComputedStyle(button).backgroundColor).toBe(
        'rgb(255, 255, 255)'
      );
    });
  });

  test('should support vertical', () => {
    const { container } = render(
      <Button.Group vertical>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </Button.Group>
    );
    expect(container.firstChild).toHaveClass('vertical');
  });

  test('should support disabled', () => {
    const { container } = render(
      <Button.Group disabled>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </Button.Group>
    );
    const buttons = container.querySelectorAll('.raw-disabled-button');
    expect(buttons.length).toBe(3);
    buttons.forEach((button) => {
      expect(button).toBeDisabled();
    });
  });
});
