import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Search } from 'react-feather';
import Button from '../Button';
import { ButtonSizes, ButtonTypes, ButtonVariants } from '../Button.types';

describe('Button', () => {
  test('should match the snapshot', () => {
    const { asFragment } = render(<Button>Default</Button>);
    expect(asFragment()).toMatchSnapshot();
  });

  test('should forward ref', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const { container } = render(<Button ref={ref}>Text</Button>);
    const button = container.firstChild;
    expect(button).toEqual(ref.current);
  });

  test('should trigger event when clicked', async () => {
    const clickHandler = jest.fn();
    const { container } = render(<Button onClick={clickHandler}>Text</Button>);
    const button = container.firstChild;
    await userEvent.click(button as Element);
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });

  ['primary', 'success', 'warning', 'error'].forEach((item: ButtonTypes) => {
    test(`should render ${item} type`, () => {
      const { container } = render(<Button type={item}>Text</Button>);
      expect(container.firstChild).toHaveClass(`raw-${item}-button`);
    });
  });

  ['sm', 'md', 'lg'].forEach((item: ButtonSizes) => {
    test(`should render ${item} size`, () => {
      const { container } = render(<Button size={item}>Text</Button>);
      expect(container.firstChild).toHaveClass(`raw-${item}-button`);
    });
  });

  ['outline', 'ghost', 'shadow'].forEach((item: ButtonVariants) => {
    test(`should render ${item} variant`, () => {
      const { container } = render(<Button variant={item}>Text</Button>);
      expect(container.firstChild).toHaveClass(`raw-${item}-button`);
    });
  });

  test('should support loading', async () => {
    const clickHandler = jest.fn();
    const { container } = render(
      <Button loading onClick={clickHandler}>
        Text
      </Button>
    );
    const button = container.firstChild;
    expect(button).toHaveClass('raw-loading-button');
    await userEvent.click(button as Element);
    expect(clickHandler).toHaveBeenCalledTimes(0);
  });

  test('should support disabled', () => {
    const clickHandler = jest.fn();
    const { container } = render(
      <Button disabled onClick={clickHandler}>
        Text
      </Button>
    );
    const button = container.firstChild;
    expect(button).toHaveClass('raw-disabled-button');
    expect(button).toBeDisabled();
  });

  test('should support icon without text', () => {
    const { container } = render(<Button icon={<Search />} />);
    expect(container.querySelector('.raw-button-icon')).toBeTruthy();
    expect(container.querySelector('.button-icon-single')).toBeTruthy();
    expect(container.querySelector('.raw-button-content')).toBeFalsy();
  });

  test('should support icon with text', () => {
    const { container } = render(<Button icon={<Search />}>Search</Button>);
    expect(container.querySelector('.raw-button-icon')).toBeTruthy();
    expect(container.querySelector('.raw-button-content')).toBeTruthy();
  });

  test('should support right icon', () => {
    const { container } = render(
      <Button iconRight={<Search />}>Search</Button>
    );
    expect(container.querySelector('.raw-button-icon')).toBeTruthy();
    expect(container.querySelector('.button-icon-right')).toBeTruthy();
  });
});
