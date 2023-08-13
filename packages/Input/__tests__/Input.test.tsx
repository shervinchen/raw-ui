import React, { ChangeEvent, useState } from 'react';
import { fireEvent, render, renderHook } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from '..';
import { InputProps, InputSizes, InputTypes } from '../Input.types';
import { useInputFocusStyles, useInputStyles } from '../Input.styles';

const typeColorMap = {
  primary: '#000000',
  success: '#0070f3',
  warning: '#f5a623',
  error: '#ee0000',
};

const sizeHeightMap = {
  sm: '32px',
  md: '40px',
  lg: '48px',
};

describe('Input', () => {
  test('should match the snapshot', () => {
    const { asFragment } = render(<Input />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('should forward ref', () => {
    const ref = React.createRef<HTMLInputElement>();
    const { container } = render(<Input ref={ref} />);
    const input = container.firstChild;
    expect(input).toEqual(ref.current);
  });

  test('should support custom class name', () => {
    const { container } = render(<Input className="custom-input" />);
    expect(container.firstChild).toHaveClass('custom-input');
  });

  test('should support type text', async () => {
    const { container } = render(<Input />);
    const input = container.firstChild as Element;
    await userEvent.type(input, 'test text');
    expect(input).toHaveValue('test text');
  });

  test('should support placeholder', () => {
    const { container } = render(<Input placeholder="Placeholder..." />);
    const input = container.firstChild as Element;
    expect(input).toHaveAttribute('placeholder', 'Placeholder...');
  });

  test('should support blur event', () => {
    const onBlur = jest.fn();
    const { container } = render(<Input onBlur={onBlur} />);
    const input = container.firstChild as Element;
    fireEvent.blur(input);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  test('should support focus event', () => {
    const onFocus = jest.fn();
    const { container } = render(<Input onFocus={onFocus} />);
    const input = container.firstChild as Element;
    fireEvent.focus(input);
    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  test('should support uncontrolled value', () => {
    const { container } = render(<Input defaultValue="default value" />);
    const input = container.firstChild as Element;
    expect(input).toHaveValue('default value');
  });

  test('should support controlled value', () => {
    const onChange = jest.fn();

    const Component = (props: InputProps) => {
      const [value, setValue] = useState('');

      return (
        <Input
          value={value}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setValue(event.target.value);
            props.onChange?.(event);
          }}
        />
      );
    };
    const { container } = render(<Component onChange={onChange} />);
    const input = container.firstChild as Element;
    expect(input).toHaveValue('');
    fireEvent.change(input, { target: { value: 'test text' } });
    expect(input).toHaveValue('test text');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  ['primary', 'success', 'warning', 'error'].forEach(
    (item: Exclude<InputTypes, 'default'>) => {
      test(`should render ${item} type`, () => {
        const { container } = render(<Input type={item} />);
        const input = container.firstChild as Element;
        expect(getComputedStyle(input).borderColor).toBe(typeColorMap[item]);
      });
    }
  );

  ['sm', 'md', 'lg'].forEach((item: InputSizes) => {
    test(`should render ${item} size`, () => {
      const { container } = render(<Input size={item} />);
      const input = container.firstChild as Element;
      expect(getComputedStyle(input).height).toBe(sizeHeightMap[item]);
    });
  });

  test('should support custom width', () => {
    const { container } = render(<Input width="160px" />);
    const input = container.firstChild as Element;
    expect(getComputedStyle(input).width).toBe('160px');
  });

  test('should support disabled', () => {
    const onChange = jest.fn();
    const { container } = render(<Input disabled onChange={onChange} />);
    const input = container.firstChild as Element;
    expect(input).toBeDisabled();
    expect(input).toHaveValue('');
    fireEvent.change(input, { target: { value: 'test text' } });
    expect(input).toHaveValue('');
    expect(onChange).toHaveBeenCalledTimes(0);
  });

  test('should support readonly', () => {
    const onChange = jest.fn();
    const { container } = render(<Input readOnly onChange={onChange} />);
    const input = container.firstChild as Element;
    expect(input).toHaveAttribute('readonly');
    expect(input).toHaveValue('');
    fireEvent.change(input, { target: { value: 'test text' } });
    expect(input).toHaveValue('');
    expect(onChange).toHaveBeenCalledTimes(0);
  });

  test('should support inside element', () => {
    const { getByText } = render(
      <Input.Group>
        <Input.LeftElement>$</Input.LeftElement>
        <Input placeholder="Enter amount" />
        <Input.RightElement>.0</Input.RightElement>
      </Input.Group>
    );

    expect(getByText('$')).toBeInTheDocument();
    expect(getByText('.0')).toBeInTheDocument();
  });

  test('should inside element support clickable style', () => {
    const { container } = render(
      <Input.Group>
        <Input.LeftElement clickable>$</Input.LeftElement>
        <Input placeholder="Enter amount" />
        <Input.RightElement>.0</Input.RightElement>
      </Input.Group>
    );
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const leftElement = container.querySelector(
      '.raw-input-left-element'
    ) as Element;
    expect(getComputedStyle(leftElement).pointerEvents).toBe('auto');
    expect(getComputedStyle(leftElement).cursor).toBe('pointer');
  });

  test('should support addon element', () => {
    const { getByText } = render(
      <Input.Group>
        <Input.LeftAddon>https://</Input.LeftAddon>
        <Input placeholder="your domain" />
        <Input.RightAddon>.com</Input.RightAddon>
      </Input.Group>
    );

    expect(getByText('https://')).toBeInTheDocument();
    expect(getByText('.com')).toBeInTheDocument();
  });

  test('should addon element support custom class name', () => {
    const { container } = render(
      <Input.Group>
        <Input.LeftAddon className="left-addon">https://</Input.LeftAddon>
        <Input placeholder="your domain" />
        <Input.RightAddon className="right-addon">.com</Input.RightAddon>
      </Input.Group>
    );

    expect(container.querySelector('.left-addon')).toBeInTheDocument();
    expect(container.querySelector('.right-addon')).toBeInTheDocument();
  });

  test('should get default style when type is unknown or falsy', () => {
    const { result: result1 } = renderHook(() =>
      useInputStyles({
        type: 'unknown' as InputTypes,
        size: 'md',
        disabled: false,
      })
    );
    const { result: result2 } = renderHook(() =>
      useInputStyles({
        type: undefined as unknown as InputTypes,
        size: 'md',
        disabled: false,
      })
    );
    expect(result1.current.borderColor).toBe('#eaeaea');
    expect(result2.current.borderColor).toBe('#eaeaea');
  });

  test('should get md size when size is unknown or falsy', () => {
    const { result: result1 } = renderHook(() =>
      useInputStyles({
        type: 'default',
        size: 'unknown' as InputSizes,
        disabled: false,
      })
    );
    const { result: result2 } = renderHook(() =>
      useInputStyles({
        type: 'default',
        size: undefined as unknown as InputSizes,
        disabled: false,
      })
    );
    expect(result1.current.height).toBe('40px');
    expect(result2.current.height).toBe('40px');
  });

  test('should get default focus style when type is unknown or falsy', () => {
    const { result: result1 } = renderHook(() =>
      useInputFocusStyles({
        type: 'unknown' as InputTypes,
        disabled: false,
      })
    );
    const { result: result2 } = renderHook(() =>
      useInputFocusStyles({
        type: undefined as unknown as InputTypes,
        disabled: false,
      })
    );
    expect(result1.current.focusBorderColor).toBe('#666666');
    expect(result2.current.focusBorderColor).toBe('#666666');
  });
});
