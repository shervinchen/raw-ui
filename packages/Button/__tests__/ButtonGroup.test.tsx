import React from 'react';
import { render } from '@testing-library/react';
import Button from '..';
import { ButtonSizes, ButtonTypes } from '../Button.types';
import { ButtonGroupVariant } from '../ButtonGroup.types';

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

  ['primary', 'success', 'warning', 'error'].forEach((item: ButtonTypes) => {
    test(`should render ${item} type`, () => {
      const { container } = render(
        <Button.Group type={item}>
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </Button.Group>
      );
      expect(container.querySelectorAll(`.raw-${item}-button`).length).toBe(3);
    });
  });

  ['sm', 'md', 'lg'].forEach((item: ButtonSizes) => {
    test(`should render ${item} size`, () => {
      const { container } = render(
        <Button.Group size={item}>
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </Button.Group>
      );
      expect(container.querySelectorAll(`.raw-${item}-button`).length).toBe(3);
    });
  });

  ['outline', 'ghost'].forEach((item: ButtonGroupVariant) => {
    test(`should render ${item} variant`, () => {
      const { container } = render(
        <Button.Group variant={item}>
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </Button.Group>
      );
      expect(container.querySelectorAll(`.raw-${item}-button`).length).toBe(3);
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
