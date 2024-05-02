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
    const selectInput = screen.getByTestId('selectInput');
    act(() => {
      ref?.current?.focus();
      expect(selectInput).toHaveFocus();
      ref?.current?.blur();
      expect(selectInput).not.toHaveFocus();
    });
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
    expect(screen.getByTestId('selectContainer').innerHTML).toContain(
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
    const { container, getAllByTestId } = render(
      <Component onChange={onChange} />
    );
    const select = container.firstChild as Element;
    await user.click(select);
    await user.click(getAllByTestId('selectOption')[0]);
    expect(screen.getByTestId('selectContainer').innerHTML).toContain(
      'Option 1'
    );
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
    expect(screen.getByTestId('selectContainer').innerHTML).toContain('React');
    expect(screen.getByTestId('selectContainer').innerHTML).toContain('Vue');
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
    expect(screen.getByTestId('selectContainer').innerHTML).not.toContain(
      'React'
    );
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
    expect(screen.getByTestId('selectContainer').innerHTML).not.toContain(
      'React'
    );
    expect(screen.getByTestId('selectContainer').innerHTML).not.toContain(
      'Vue'
    );
  });

  test('should get new value when has default value and selected multiple options change', async () => {
    const { container, getAllByTestId } = render(
      <Select multiple defaultValue={['react', 'vue']}>
        {optionsData.map((item) => (
          <Select.Option value={item.value} key={item.value}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    );
    const select = container.firstChild as Element;
    await user.click(select);
    await user.click(getAllByTestId('selectOption')[0]);
    expect(screen.getByTestId('selectContainer').innerHTML).not.toContain(
      'React'
    );
    expect(screen.getByTestId('selectContainer').innerHTML).toContain('Vue');
    await user.click(getAllByTestId('selectOption')[0]);
    expect(screen.getByTestId('selectContainer').innerHTML).toContain('React');
    expect(screen.getByTestId('selectContainer').innerHTML).toContain('Vue');
  });

  test('should get new value when not has default value and selected multiple options change', async () => {
    const { getAllByTestId, container } = render(
      <Select multiple>
        {optionsData.map((item) => (
          <Select.Option value={item.value} key={item.value}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    );
    const select = container.firstChild as Element;
    await user.click(select);
    await user.click(getAllByTestId('selectOption')[0]);
    expect(screen.getByTestId('selectContainer').innerHTML).toContain('React');
  });

  test('should support select disabled', async () => {
    const { container, queryAllByTestId } = render(
      <Select disabled>
        <Select.Option value="1">Option 1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
      </Select>
    );
    const select = container.firstChild as Element;
    await user.click(select);
    expect(queryAllByTestId('selectOption').length).toBe(0);
  });

  test('should support option disabled', async () => {
    const { container, getAllByTestId } = render(
      <Select>
        <Select.Option value="1" disabled>
          Option 1
        </Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
      </Select>
    );
    const select = container.firstChild as Element;
    await user.click(select);
    await user.click(getAllByTestId('selectOption')[0]);
    expect(screen.getByTestId('selectContainer').innerHTML).not.toContain(
      'Option 1'
    );
    await user.click(getAllByTestId('selectOption')[1]);
    expect(screen.getByTestId('selectContainer').innerHTML).toContain(
      'Option 2'
    );
  });

  test('should hide select dropdown when click outside', async () => {
    const { container } = render(
      <Select>
        <Select.Option value="1">Option 1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
      </Select>
    );
    const select = container.firstChild as Element;
    await user.click(select);
    expect(screen.getByTestId('selectDropdown')).toBeInTheDocument();
    await user.click(document.body);
    expect(screen.queryByTestId('selectDropdown')).not.toBeInTheDocument();
  });

  test('should delete select tag when click delete icon', async () => {
    const { getAllByTestId } = render(
      <Select multiple defaultValue={['react', 'vue']}>
        {optionsData.map((item) => (
          <Select.Option value={item.value} key={item.value}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    );
    expect(screen.getByTestId('selectContainer').innerHTML).toContain('React');
    await user.click(getAllByTestId('selectTagIcon')[0]);
    expect(screen.getByTestId('selectContainer').innerHTML).not.toContain(
      'React'
    );
  });

  test('should not delete select tag when disabled and click delete icon', async () => {
    const { getAllByTestId } = render(
      <Select multiple disabled defaultValue={['react', 'vue']}>
        {optionsData.map((item) => (
          <Select.Option value={item.value} key={item.value}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    );
    expect(screen.getByTestId('selectContainer').innerHTML).toContain('React');
    await user.click(getAllByTestId('selectTagIcon')[0]);
    expect(screen.getByTestId('selectContainer').innerHTML).toContain('React');
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
});
