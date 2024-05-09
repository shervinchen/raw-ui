import React, { ChangeEvent, useState } from 'react';
import { render, screen, renderHook } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from '..';
import { InputProps, InputSizes, InputTypes } from '../Input.types';
import { useInputFocusStyles, useInputStyles } from '../Input.styles';

const typeColorMap = {
  primary: '#000000',
  warning: '#f5a623',
  error: '#ee0000',
};

const sizeHeightMap = {
  sm: '32px',
  md: '40px',
  lg: '48px',
};

const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

describe('Input', () => {
  test('should match the snapshot', () => {
    const { asFragment } = render(<Input />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('should forward ref', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    expect(screen.getByRole('textbox')).toEqual(ref.current);
  });

  test('should support custom class name', () => {
    render(<Input className="custom-input" />);
    expect(screen.getByRole('textbox')).toHaveClass('custom-input');
  });

  test('should support type text', async () => {
    render(<Input />);
    const input = screen.getByRole('textbox');
    await user.type(input, 'test text');
    expect(input).toHaveValue('test text');
  });

  test('should support placeholder', () => {
    render(<Input placeholder="Placeholder..." />);
    expect(screen.getByRole('textbox')).toHaveAttribute(
      'placeholder',
      'Placeholder...'
    );
  });

  test('should support blur event', () => {
    const onBlur = jest.fn();
    render(<Input onBlur={onBlur} />);
    const input = screen.getByRole('textbox');
    input.focus();
    input.blur();
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  test('should support focus event', () => {
    const onFocus = jest.fn();
    render(<Input onFocus={onFocus} />);
    screen.getByRole('textbox').focus();
    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  test('should support uncontrolled value', () => {
    render(<Input defaultValue="default value" />);
    expect(screen.getByRole('textbox')).toHaveValue('default value');
  });

  test('should support controlled value', async () => {
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
    render(<Component onChange={onChange} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('');
    await user.type(input, 'test text');
    expect(input).toHaveValue('test text');
    expect(onChange).toHaveBeenCalledTimes(9);
  });

  ['primary', 'warning', 'error'].forEach(
    (item: Exclude<InputTypes, 'default'>) => {
      test(`should render ${item} type`, () => {
        render(<Input type={item} />);
        expect(getComputedStyle(screen.getByRole('textbox')).borderColor).toBe(
          typeColorMap[item]
        );
      });
    }
  );

  ['sm', 'md', 'lg'].forEach((item: InputSizes) => {
    test(`should render ${item} size`, () => {
      render(<Input size={item} />);
      expect(getComputedStyle(screen.getByRole('textbox')).height).toBe(
        sizeHeightMap[item]
      );
    });
  });

  test('should support custom width', () => {
    render(<Input width="160px" />);
    expect(getComputedStyle(screen.getByRole('textbox')).width).toBe('160px');
  });

  test('should support disabled', async () => {
    const onChange = jest.fn();
    render(<Input disabled onChange={onChange} />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
    expect(input).toHaveValue('');
    await user.type(input, 'test text');
    expect(input).toHaveValue('');
    expect(onChange).toHaveBeenCalledTimes(0);
  });

  test('should support readonly', async () => {
    const onChange = jest.fn();
    render(<Input readOnly onChange={onChange} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('readonly');
    expect(input).toHaveValue('');
    await user.type(input, 'test text');
    expect(input).toHaveValue('');
    expect(onChange).toHaveBeenCalledTimes(0);
  });

  test('should support inside element', () => {
    render(
      <Input.Group>
        <Input.LeftElement>$</Input.LeftElement>
        <Input placeholder="Enter amount" />
        <Input.RightElement>.0</Input.RightElement>
      </Input.Group>
    );

    expect(screen.getByText('$')).toBeInTheDocument();
    expect(screen.getByText('.0')).toBeInTheDocument();
  });

  test('should inside element support clickable style', () => {
    render(
      <Input.Group>
        <Input.LeftElement clickable>$</Input.LeftElement>
        <Input placeholder="Enter amount" />
        <Input.RightElement>.0</Input.RightElement>
      </Input.Group>
    );
    const leftElement = screen.getByTestId('inputLeftElement');
    expect(getComputedStyle(leftElement).pointerEvents).toBe('auto');
    expect(getComputedStyle(leftElement).cursor).toBe('pointer');
  });

  test('should support addon element', () => {
    render(
      <Input.Group>
        <Input.LeftAddon>https://</Input.LeftAddon>
        <Input placeholder="your domain" />
        <Input.RightAddon>.com</Input.RightAddon>
      </Input.Group>
    );

    expect(screen.getByText('https://')).toBeInTheDocument();
    expect(screen.getByText('.com')).toBeInTheDocument();
  });

  test('should addon element support custom class name', () => {
    render(
      <Input.Group>
        <Input.LeftAddon className="left-addon">https://</Input.LeftAddon>
        <Input placeholder="your domain" />
        <Input.RightAddon className="right-addon">.com</Input.RightAddon>
      </Input.Group>
    );

    expect(screen.getByText('https://')).toHaveClass('left-addon');
    expect(screen.getByText('.com')).toHaveClass('right-addon');
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
