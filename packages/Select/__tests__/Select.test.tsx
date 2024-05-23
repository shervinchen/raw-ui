import React, { useState, act } from 'react';
import { fireEvent, render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Select from '..';
import {
  SelectProps,
  SelectSizes,
  SelectTypes,
  SelectValue,
} from '../Select.types';
import { useSelectHoverStyles, useSelectStyles } from '../Select.styles';

const typeColorMap = {
  warning: '#f5a623',
  error: '#ee0000',
};

const sizeHeightMap = {
  sm: '32px',
  md: '40px',
  lg: '48px',
};

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

const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

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
    const selectInput = screen.getByRole('combobox');
    act(() => {
      ref?.current?.focus();
      expect(selectInput).toHaveFocus();
      ref?.current?.blur();
      expect(selectInput).not.toHaveFocus();
    });
  });

  ['warning', 'error'].forEach((item: Exclude<SelectTypes, 'default'>) => {
    test(`should render ${item} type`, () => {
      render(
        <Select type={item}>
          <Select.Option value="1">Option 1</Select.Option>
          <Select.Option value="2">Option 2</Select.Option>
        </Select>
      );
      expect(screen.getByTestId('selectContainer')).toHaveStyle(
        `border: 1px solid ${typeColorMap[item]}`
      );
    });
  });

  test('should get default style when type is unknown or falsy', () => {
    const { result: result1 } = renderHook(() =>
      useSelectStyles({
        type: 'unknown' as SelectTypes,
        disabled: false,
      })
    );
    const { result: result2 } = renderHook(() =>
      useSelectStyles({
        type: undefined as unknown as SelectTypes,
        disabled: false,
      })
    );
    expect(result1.current.borderColor).toBe('#eaeaea');
    expect(result2.current.borderColor).toBe('#eaeaea');
  });

  test('should get default hover style when type is unknown or falsy', () => {
    const { result: result1 } = renderHook(() =>
      useSelectHoverStyles({
        type: 'unknown' as SelectTypes,
        disabled: false,
      })
    );
    const { result: result2 } = renderHook(() =>
      useSelectHoverStyles({
        type: undefined as unknown as SelectTypes,
        disabled: false,
      })
    );
    expect(result1.current.hoverBorderColor).toBe('#666666');
    expect(result2.current.hoverBorderColor).toBe('#666666');
  });

  ['sm', 'md', 'lg'].forEach((item: SelectSizes) => {
    test(`should render ${item} size`, () => {
      render(
        <Select size={item}>
          <Select.Option value="1">Option 1</Select.Option>
          <Select.Option value="2">Option 2</Select.Option>
        </Select>
      );
      expect(screen.getByTestId('selectContainer')).toHaveStyle(
        `height: ${sizeHeightMap[item]}`
      );
    });
  });

  test('should get md size when size is unknown or falsy', () => {
    const { result: result1 } = renderHook(() =>
      useSelectStyles({
        size: 'unknown' as SelectSizes,
        disabled: false,
      })
    );
    const { result: result2 } = renderHook(() =>
      useSelectStyles({
        size: undefined as unknown as SelectSizes,
        disabled: false,
      })
    );
    expect(result1.current.height).toBe('40px');
    expect(result2.current.height).toBe('40px');
  });

  test('should support custom class name', () => {
    render(
      <Select className="custom-select">
        <Select.Option value="1">Option 1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
      </Select>
    );
    expect(screen.getByTestId('selectContainer')).toHaveClass('custom-select');
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
    render(
      <Select width="200px">
        <Select.Option value="1">Option 1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
      </Select>
    );
    const select = screen.getByTestId('selectContainer');
    expect(select).toHaveStyle('width: 200px');
  });

  test('should support uncontrolled value', () => {
    render(
      <Select defaultValue="1">
        <Select.Option value="1">Option 1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
      </Select>
    );
    expect(screen.getByText('Option 1')).toBeInTheDocument();
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
    render(<Component onChange={onChange} />);
    const select = screen.getByTestId('selectContainer');
    await user.click(select);
    await user.click(screen.getAllByTestId('selectOption')[0]);
    expect(select).toHaveTextContent('Option 1');
    expect(onChange).toHaveBeenCalledWith('1');
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
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Vue')).toBeInTheDocument();
  });

  test('should not get initial value when value is not array but multiple is true', () => {
    render(
      <Select multiple defaultValue="react" value="react">
        {optionsData.map((item) => (
          <Select.Option value={item.value} key={item.value}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    );
    expect(screen.queryByText('React')).not.toBeInTheDocument();
  });

  test('should not get initial value when value is array but multiple is false', () => {
    render(
      <Select
        multiple={false}
        defaultValue={['react', 'vue']}
        value={['react', 'vue']}
      >
        {optionsData.map((item) => (
          <Select.Option value={item.value} key={item.value}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    );
    expect(screen.queryByText('React')).not.toBeInTheDocument();
    expect(screen.queryByText('Vue')).not.toBeInTheDocument();
  });

  test('should get new value when has default value and selected multiple options change', async () => {
    render(
      <Select multiple defaultValue={['react', 'vue']}>
        {optionsData.map((item) => (
          <Select.Option value={item.value} key={item.value}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    );
    const select = screen.getByTestId('selectContainer');
    await user.click(select);
    await user.click(screen.getAllByTestId('selectOption')[0]);
    expect(select).not.toHaveTextContent('React');
    expect(select).toHaveTextContent('Vue');
    await user.click(screen.getAllByTestId('selectOption')[0]);
    expect(select).toHaveTextContent('React');
    expect(select).toHaveTextContent('Vue');
  });

  test('should get new value when not has default value and selected multiple options change', async () => {
    render(
      <Select multiple>
        {optionsData.map((item) => (
          <Select.Option value={item.value} key={item.value}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    );
    const select = screen.getByTestId('selectContainer');
    await user.click(select);
    await user.click(screen.getAllByTestId('selectOption')[0]);
    expect(select).toHaveTextContent('React');
  });

  test('should support select disabled', async () => {
    const { queryAllByTestId } = render(
      <Select disabled>
        <Select.Option value="1">Option 1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
      </Select>
    );
    const select = screen.getByTestId('selectContainer');
    await user.click(select);
    expect(queryAllByTestId('selectOption').length).toBe(0);
  });

  test('should support option disabled', async () => {
    render(
      <Select>
        <Select.Option value="1" disabled>
          Option 1
        </Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
      </Select>
    );
    const select = screen.getByTestId('selectContainer');
    await user.click(select);
    await user.click(screen.getAllByTestId('selectOption')[0]);
    expect(select).not.toHaveTextContent('Option 1');
  });

  test('should hide select dropdown when click outside', async () => {
    render(
      <Select>
        <Select.Option value="1">Option 1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
      </Select>
    );
    const select = screen.getByTestId('selectContainer');
    await user.click(select);
    expect(screen.getByTestId('selectDropdown')).toBeInTheDocument();
    await user.click(document.body);
    expect(screen.queryByTestId('selectDropdown')).not.toBeInTheDocument();
  });

  test('should delete select tag when click delete icon', async () => {
    render(
      <Select multiple defaultValue={['react', 'vue']}>
        {optionsData.map((item) => (
          <Select.Option value={item.value} key={item.value}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    );
    const select = screen.getByTestId('selectContainer');
    expect(select).toHaveTextContent('React');
    fireEvent.mouseEnter(select);
    await user.click(screen.getAllByTestId('selectTagIcon')[0]);
    expect(select).not.toHaveTextContent('React');
  });

  test('should not delete select tag when disabled and click delete icon', async () => {
    render(
      <Select multiple disabled defaultValue={['react', 'vue']}>
        {optionsData.map((item) => (
          <Select.Option value={item.value} key={item.value}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    );
    const select = screen.getByTestId('selectContainer');
    expect(select).toHaveTextContent('React');
    fireEvent.mouseEnter(select);
    await user.click(screen.getAllByTestId('selectTagIcon')[0]);
    expect(select).toHaveTextContent('React');
  });

  test('should display placeholder when value is empty string', () => {
    render(
      <Select defaultValue="" placeholder="Select option">
        <Select.Option value="1">Option 1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
      </Select>
    );
    expect(screen.getByText('Select option')).toBeInTheDocument();
  });

  test('should not display placeholder or selected option when value is not undefined', () => {
    render(
      <Select defaultValue={null} placeholder="Select option">
        <Select.Option value="1">Option 1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
      </Select>
    );
    expect(screen.queryByTestId('Select option')).not.toBeInTheDocument();
  });

  test('should support clearable when not multiple value', async () => {
    render(
      <Select defaultValue="1" placeholder="Select option" clearable>
        <Select.Option value="1">Option 1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
      </Select>
    );
    const select = screen.getByTestId('selectContainer');
    expect(select).toHaveTextContent('Option 1');
    fireEvent.mouseEnter(select);
    const selectClear = screen.getByTestId('selectClear');
    await user.click(selectClear);
    expect(select).not.toHaveTextContent('Option 1');
    expect(screen.getByText('Select option')).toBeInTheDocument();
  });

  test('should support clearable when multiple value', async () => {
    render(
      <Select
        defaultValue={['react', 'vue']}
        placeholder="Select option"
        multiple
        clearable
      >
        {optionsData.map((item) => (
          <Select.Option value={item.value} key={item.value}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    );
    const select = screen.getByTestId('selectContainer');
    expect(select).toHaveTextContent('React');
    expect(select).toHaveTextContent('Vue');
    fireEvent.mouseEnter(select);
    const selectClear = screen.getByTestId('selectClear');
    await user.click(selectClear);
    expect(select).not.toHaveTextContent('React');
    expect(select).not.toHaveTextContent('Vue');
    expect(screen.getByText('Select option')).toBeInTheDocument();
  });
});
