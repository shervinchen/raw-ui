import React, { useState } from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Select from '..';
import { SelectProps, SelectValue } from '../Select.types';

const optionsData = [
  {
    name: 'React',
    value: 'react',
  },
  {
    name: 'Vue',
    value: 'vue',
  },
  {
    name: 'Angular',
    value: 'angular',
  },
  {
    name: 'Svelte',
    value: 'svelte',
  },
];

describe('Select', () => {
  test('should match the snapshot', () => {
    const { asFragment } = render(
      <Select>
        <Select.Option value="1">Option 1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
      </Select>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should forward ref', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(
      <Select ref={ref}>
        <Select.Option value="1">Option 1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
      </Select>
    );
    const selectInput = screen.getByTestId('selectInput');
    ref.current.focus();
    expect(selectInput).toHaveFocus();
    ref.current.blur();
    expect(selectInput).not.toHaveFocus();
  });

  test('should support custom class name', () => {
    const { container } = render(
      <Select className="custom-select">
        <Select.Option value="1">Option 1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
      </Select>
    );
    expect(container.firstChild).toHaveClass('custom-select');
  });

  test('should support placeholder', () => {
    render(
      <Select placeholder="Select option">
        <Select.Option value="1">Option 1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
      </Select>
    );
    expect(screen.getByText('Select option')).toBeInTheDocument();
  });

  test('should support custom width', () => {
    const { container } = render(
      <Select width="200px">
        <Select.Option value="1">Option 1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
      </Select>
    );
    const select = container.firstChild as Element;
    expect(getComputedStyle(select).width).toBe('200px');
  });

  test('should support uncontrolled value', () => {
    render(
      <Select defaultValue="1">
        <Select.Option value="1">Option 1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
      </Select>
    );
    expect(document.querySelector('.raw-select').innerHTML).toContain(
      'Option 1'
    );
  });

  test('should support controlled value', async () => {
    const onChange = jest.fn();

    const Component = (props: SelectProps) => {
      const [selectValue, setSelectValue] = useState<SelectValue>();

      return (
        <Select
          value={selectValue}
          onChange={(value) => {
            setSelectValue(value);
            props.onChange?.(value);
          }}
        >
          <Select.Option value="1">Option 1</Select.Option>
          <Select.Option value="2">Option 2</Select.Option>
        </Select>
      );
    };
    const { container } = render(<Component onChange={onChange} />);
    const select = container.firstChild as Element;
    const option1 = document.querySelectorAll('.raw-select-option')[0];
    await userEvent.click(select);
    await userEvent.click(option1);
    setTimeout(() => {
      expect(document.querySelector('.raw-select').innerHTML).toContain(
        'Option 1'
      );
    }, 150);
  });

  test('should support multiple value', () => {
    render(
      <Select multiple defaultValue={['react', 'vue']}>
        {optionsData.map((item) => (
          <Select.Option value={item.value} key={item.value}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    );
    expect(document.querySelector('.raw-select').innerHTML).toContain('React');
    expect(document.querySelector('.raw-select').innerHTML).toContain('Vue');
  });

  test('should support select disabled', async () => {
    const { container } = render(
      <Select disabled>
        <Select.Option value="1">Option 1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
      </Select>
    );
    const select = container.firstChild as Element;
    await userEvent.click(select);
    expect(document.querySelectorAll('.raw-select-option').length).toBe(0);
  });

  test('should support option disabled', async () => {
    const { container } = render(
      <Select>
        <Select.Option value="1" disabled>
          Option 1
        </Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
      </Select>
    );
    const select = container.firstChild as Element;
    const option1 = document.querySelectorAll('.raw-select-option')[0];
    const option2 = document.querySelectorAll('.raw-select-option')[1];
    await userEvent.click(select);
    await userEvent.click(option1);
    expect(document.querySelector('.raw-select').innerHTML).not.toContain(
      'Option 1'
    );
    await userEvent.click(option2);
    setTimeout(() => {
      expect(document.querySelector('.raw-select').innerHTML).toContain(
        'Option 2'
      );
    }, 150);
  });
});
