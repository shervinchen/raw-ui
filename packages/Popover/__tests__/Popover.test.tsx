import React, { useState } from 'react';
import { fireEvent, render, act } from '@testing-library/react';
import Popover from '..';
import { PopoverProps } from '../Popover.types';

describe('Popover', () => {
  test('should match the snapshot', () => {
    const { asFragment } = render(
      <Popover content="I am a popover">Click me</Popover>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should support custom class name', () => {
    const { container } = render(
      <Popover content="I am a popover" className="custom-popover">
        Click me
      </Popover>
    );
    expect(container.firstChild).toHaveClass('custom-popover');
  });

  test('should show popover when click target', () => {
    render(<Popover content="I am a popover">Click me</Popover>);
    const element = document.querySelector('.raw-popover');
    fireEvent.click(element);
    setTimeout(() => {
      expect('I am a popover').toBeInTheDocument();
    }, 50);
  });

  test('should switch whether or not popover is visible when click target', () => {
    render(<Popover content="I am a popover">Click me</Popover>);
    const element = document.querySelector('.raw-popover');
    fireEvent.click(element);
    setTimeout(() => {
      expect('I am a popover').toBeInTheDocument();
    }, 50);
    fireEvent.click(element);
    setTimeout(() => {
      expect('I am a popover').not.toBeInTheDocument();
    }, 50);
  });

  test('should hide popover when click outside', () => {
    render(<Popover content="I am a popover">Click me</Popover>);
    const element = document.querySelector('.raw-popover');
    fireEvent.click(element);
    setTimeout(() => {
      expect('I am a popover').toBeInTheDocument();
    }, 50);
    act(() => {
      document.dispatchEvent(new MouseEvent('click'));
    });
    setTimeout(() => {
      expect('I am a popover').not.toBeInTheDocument();
    }, 50);
  });

  test('should support disabled popover', () => {
    render(
      <Popover content="I am a popover" disabled>
        Click me
      </Popover>
    );
    const element = document.querySelector('.raw-popover');
    fireEvent.click(element);
    setTimeout(() => {
      expect('I am a popover').not.toBeInTheDocument();
    }, 50);
  });

  test('should support controlled value', () => {
    const onChange = jest.fn();

    const Component = (props: PopoverProps) => {
      const [value, setValue] = useState(false);

      return (
        <Popover
          content={props.content}
          value={value}
          onChange={(nextValue) => {
            setValue(nextValue);
            props.onChange?.(nextValue);
          }}
        >
          Click me
        </Popover>
      );
    };

    render(
      <Component content="I am a controlled popover" onChange={onChange} />
    );
    const element = document.querySelector('.raw-popover');
    fireEvent.click(element);
    setTimeout(() => {
      expect('I am a popover').toBeInTheDocument();
    }, 50);
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
