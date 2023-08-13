import React from 'react';
import { render, renderHook } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Search } from 'react-feather';
import Button from '..';
import { ButtonSizes, ButtonTypes, ButtonVariants } from '../Button.types';
import {
  useButtonActiveStyles,
  useButtonHoverStyles,
  useButtonStyles,
} from '../Button.styles';

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

  test('should support custom class name', () => {
    const { container } = render(
      <Button className="custom-button">Text</Button>
    );
    expect(container.firstChild).toHaveClass('custom-button');
  });

  test('should trigger event when clicked', async () => {
    const clickHandler = jest.fn();
    const { container } = render(<Button onClick={clickHandler}>Text</Button>);
    const button = container.firstChild;
    await userEvent.click(button as Element);
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });

  ['primary', 'success', 'warning', 'error'].forEach(
    (item: Exclude<ButtonTypes, 'default'>) => {
      test(`should render ${item} type`, () => {
        const { container } = render(<Button type={item}>Text</Button>);
        const button = container.firstChild as Element;
        expect(getComputedStyle(button).backgroundColor).toBe(
          typeColorMap[item]
        );
      });
    }
  );

  ['sm', 'md', 'lg'].forEach((item: ButtonSizes) => {
    test(`should render ${item} size`, () => {
      const { container } = render(<Button size={item}>Text</Button>);
      const button = container.firstChild as Element;
      expect(getComputedStyle(button).height).toBe(sizeHeightMap[item]);
    });
  });

  test('should render outline variant', () => {
    const { container } = render(
      <Button type="primary" variant="outline">
        Text
      </Button>
    );
    const button = container.firstChild as Element;
    expect(getComputedStyle(button).color).toBe('rgb(0, 0, 0)');
    expect(getComputedStyle(button).borderColor).toBe('#000000');
  });

  test('should render ghost variant', () => {
    const { container } = render(
      <Button type="primary" variant="ghost">
        Text
      </Button>
    );
    const button = container.firstChild as Element;
    expect(getComputedStyle(button).backgroundColor).toBe('transparent');
    expect(getComputedStyle(button).borderColor).toBe('transparent');
  });

  test('should render shadow variant', () => {
    const { container } = render(
      <Button type="primary" variant="shadow">
        Text
      </Button>
    );
    const button = container.firstChild as Element;
    expect(getComputedStyle(button).boxShadow).toBe(
      '0 5px 10px rgba(0, 0, 0, 0.12)'
    );
  });

  test('should get default style when type is unknown or falsy', () => {
    const { result: result1 } = renderHook(() =>
      useButtonStyles({
        type: 'unknown' as ButtonTypes,
        size: 'md',
        variant: 'default',
        loading: false,
        disabled: false,
      })
    );
    const { result: result2 } = renderHook(() =>
      useButtonStyles({
        type: undefined as unknown as ButtonTypes,
        size: 'md',
        variant: 'default',
        loading: false,
        disabled: false,
      })
    );
    expect(result1.current.backgroundColor).toBe('#ffffff');
    expect(result2.current.backgroundColor).toBe('#ffffff');
  });

  test('should get default loading style when type is unknown or falsy', () => {
    const { result: result1 } = renderHook(() =>
      useButtonStyles({
        type: 'unknown' as ButtonTypes,
        size: 'md',
        variant: 'default',
        loading: true,
        disabled: false,
      })
    );
    const { result: result2 } = renderHook(() =>
      useButtonStyles({
        type: undefined as unknown as ButtonTypes,
        size: 'md',
        variant: 'default',
        loading: true,
        disabled: false,
      })
    );
    expect(result1.current.backgroundColor).toBe('#ffffff');
    expect(result2.current.backgroundColor).toBe('#ffffff');
  });

  test('should get default style when variant is unknown or falsy', () => {
    const { result: result1 } = renderHook(() =>
      useButtonStyles({
        type: 'default',
        size: 'md',
        variant: 'unknown' as ButtonVariants,
        loading: false,
        disabled: false,
      })
    );
    const { result: result2 } = renderHook(() =>
      useButtonStyles({
        type: 'default',
        size: 'md',
        variant: undefined as unknown as ButtonVariants,
        loading: false,
        disabled: false,
      })
    );
    expect(result1.current.backgroundColor).toBe('#ffffff');
    expect(result2.current.backgroundColor).toBe('#ffffff');
  });

  test('should get default loading style when variant is unknown or falsy', () => {
    const { result: result1 } = renderHook(() =>
      useButtonStyles({
        type: 'default',
        size: 'md',
        variant: 'unknown' as ButtonVariants,
        loading: true,
        disabled: false,
      })
    );
    const { result: result2 } = renderHook(() =>
      useButtonStyles({
        type: 'default',
        size: 'md',
        variant: undefined as unknown as ButtonVariants,
        loading: true,
        disabled: false,
      })
    );
    expect(result1.current.backgroundColor).toBe('#ffffff');
    expect(result2.current.backgroundColor).toBe('#ffffff');
  });

  test('should get default disabled style when type is unknown or falsy', () => {
    const { result: result1 } = renderHook(() =>
      useButtonStyles({
        type: 'unknown' as ButtonTypes,
        size: 'md',
        variant: 'default',
        loading: false,
        disabled: true,
      })
    );
    const { result: result2 } = renderHook(() =>
      useButtonStyles({
        type: undefined as unknown as ButtonTypes,
        size: 'md',
        variant: 'default',
        loading: false,
        disabled: true,
      })
    );
    expect(result1.current.backgroundColor).toBe('#eaeaea');
    expect(result2.current.backgroundColor).toBe('#eaeaea');
  });

  test('should get default disabled style when variant is unknown or falsy', () => {
    const { result: result1 } = renderHook(() =>
      useButtonStyles({
        type: undefined as unknown as ButtonTypes,
        size: 'md',
        variant: 'unknown' as ButtonVariants,
        loading: false,
        disabled: true,
      })
    );
    const { result: result2 } = renderHook(() =>
      useButtonStyles({
        type: undefined as unknown as ButtonTypes,
        size: 'md',
        variant: undefined as unknown as ButtonVariants,
        loading: false,
        disabled: true,
      })
    );
    expect(result1.current.backgroundColor).toBe('#eaeaea');
    expect(result2.current.backgroundColor).toBe('#eaeaea');
  });

  test('should get default hover style when type is unknown or falsy', () => {
    const { result: result1 } = renderHook(() =>
      useButtonHoverStyles({
        type: 'unknown' as ButtonTypes,
        size: 'md',
        variant: 'default',
        loading: false,
        disabled: false,
      })
    );
    const { result: result2 } = renderHook(() =>
      useButtonHoverStyles({
        type: undefined as unknown as ButtonTypes,
        size: 'md',
        variant: 'default',
        loading: false,
        disabled: false,
      })
    );
    expect(result1.current.hoverColor).toBe('#000000');
    expect(result2.current.hoverColor).toBe('#000000');
  });

  test('should get default hover style when variant is unknown or falsy', () => {
    const { result: result1 } = renderHook(() =>
      useButtonHoverStyles({
        type: 'default',
        size: 'md',
        variant: 'unknown' as ButtonVariants,
        loading: false,
        disabled: false,
      })
    );
    const { result: result2 } = renderHook(() =>
      useButtonHoverStyles({
        type: 'default',
        size: 'md',
        variant: undefined as unknown as ButtonVariants,
        loading: false,
        disabled: false,
      })
    );
    expect(result1.current.hoverColor).toBe('#000000');
    expect(result2.current.hoverColor).toBe('#000000');
  });

  test('should get default active style when type is unknown or falsy', () => {
    const { result: result1 } = renderHook(() =>
      useButtonActiveStyles({
        type: 'unknown' as ButtonTypes,
        size: 'md',
        variant: 'default',
        loading: false,
        disabled: false,
      })
    );
    const { result: result2 } = renderHook(() =>
      useButtonActiveStyles({
        type: undefined as unknown as ButtonTypes,
        size: 'md',
        variant: 'default',
        loading: false,
        disabled: false,
      })
    );
    expect(result1.current.activeBackgroundColor).toBe('#eaeaea');
    expect(result2.current.activeBackgroundColor).toBe('#eaeaea');
  });

  test('should get default active style when variant is unknown or falsy', () => {
    const { result: result1 } = renderHook(() =>
      useButtonActiveStyles({
        type: 'default',
        size: 'md',
        variant: 'unknown' as ButtonVariants,
        loading: false,
        disabled: false,
      })
    );
    const { result: result2 } = renderHook(() =>
      useButtonActiveStyles({
        type: 'default',
        size: 'md',
        variant: undefined as unknown as ButtonVariants,
        loading: false,
        disabled: false,
      })
    );
    expect(result1.current.activeBackgroundColor).toBe('#eaeaea');
    expect(result2.current.activeBackgroundColor).toBe('#eaeaea');
  });

  test('should get md size when size is unknown or falsy', () => {
    const { result: result1 } = renderHook(() =>
      useButtonStyles({
        type: 'default',
        size: 'unknown' as ButtonSizes,
        variant: 'default',
        loading: false,
        disabled: false,
      })
    );
    const { result: result2 } = renderHook(() =>
      useButtonStyles({
        type: 'default',
        size: undefined as unknown as ButtonSizes,
        variant: 'default',
        loading: false,
        disabled: false,
      })
    );
    expect(result1.current.height).toBe('40px');
    expect(result2.current.height).toBe('40px');
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
    const { container } = render(<Button disabled>Text</Button>);
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
    expect(container.querySelector('.button-icon-single')).toBeFalsy();
    expect(container.querySelector('.raw-button-content')).toBeTruthy();
  });

  test('should support right icon', () => {
    const { container } = render(
      <Button iconRight={<Search />}>Search</Button>
    );
    expect(container.querySelector('.raw-button-icon')).toBeTruthy();
    expect(container.querySelector('.button-icon-single')).toBeFalsy();
    expect(container.querySelector('.button-icon-right')).toBeTruthy();
  });
});
