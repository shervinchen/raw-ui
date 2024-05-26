import React from 'react';
import { render, screen } from '@testing-library/react';
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
    render(
      <Button.Group className="custom-button-group">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </Button.Group>
    );
    expect(screen.getByRole('group')).toHaveClass('custom-button-group');
  });

  test('should render the correct number of child', () => {
    render(
      <Button.Group>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </Button.Group>
    );
    expect(screen.getAllByRole('button').length).toBe(3);
  });

  ['primary', 'success', 'warning', 'error'].forEach(
    (item: Exclude<ButtonTypes, 'default'>) => {
      test(`should render ${item} type`, () => {
        render(
          <Button.Group type={item}>
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </Button.Group>
        );
        const buttons = screen.getAllByRole('button');
        buttons.forEach((button) => {
          expect(button).toHaveStyle(`background-color: ${typeColorMap[item]}`);
        });
      });
    }
  );

  ['sm', 'md', 'lg'].forEach((item: ButtonSizes) => {
    test(`should render ${item} size`, () => {
      render(
        <Button.Group size={item}>
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </Button.Group>
      );
      const buttons = screen.getAllByRole('button');
      buttons.forEach((button) => {
        expect(button).toHaveStyle(`height: ${sizeHeightMap[item]}`);
      });
    });
  });

  test('should render outline variant', () => {
    render(
      <Button.Group type="primary" variant="outline">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </Button.Group>
    );
    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      expect(button).toHaveStyle(`color: rgb(0, 0, 0)`);
    });
  });

  test('should render ghost variant', () => {
    render(
      <Button.Group type="primary" variant="ghost">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </Button.Group>
    );
    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      expect(button).toHaveStyle(`background-color: transparent`);
    });
  });

  test('should get default style when variant is unknown', () => {
    render(
      <Button.Group variant={'unknown' as ButtonGroupVariant}>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </Button.Group>
    );
    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      expect(button).toHaveStyle(`background-color: rgb(255, 255, 255)`);
    });
  });

  test('should support vertical', () => {
    render(
      <Button.Group vertical>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </Button.Group>
    );
    expect(screen.getByRole('group')).toHaveClass('raw-button-group-vertical');
  });

  test('should support disabled', () => {
    render(
      <Button.Group disabled>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </Button.Group>
    );
    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      expect(button).toBeDisabled();
    });
  });
});
