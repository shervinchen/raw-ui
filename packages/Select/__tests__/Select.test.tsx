import React, { useState } from 'react';
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
import Modal from '../../Modal';
import Button from '../../Button';
import Popover from '../../Popover';
import { Theme } from '../../Theme';

const typeColorMap = {
  warning: '#eab308',
  error: '#ef4444',
};

const sizeHeightMap = {
  xs: '24px',
  sm: '28px',
  md: '32px',
  lg: '36px',
  xl: '40px',
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
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Select ref={ref}>
        <Select.Option value="1">Option 1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
      </Select>
    );
    expect(screen.getByTestId('selectContainer')).toEqual(ref.current);
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
    expect(result1.current.borderColor).toBe('#e5e5e5');
    expect(result2.current.borderColor).toBe('#e5e5e5');
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
    expect(result1.current.hoverBorderColor).toBe('#525252');
    expect(result2.current.hoverBorderColor).toBe('#525252');
  });

  ['xs', 'sm', 'md', 'lg', 'xl'].forEach((item: SelectSizes) => {
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
    expect(result1.current.height).toBe('32px');
    expect(result2.current.height).toBe('32px');
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

  test('should set popup zIndex by closest floating container', async () => {
    render(
      <Modal visible>
        <Modal.Header>Modal Title</Modal.Header>
        <Modal.Body>
          <Select>
            <Select.Option value="1">Option 1</Select.Option>
            <Select.Option value="2">Option 2</Select.Option>
          </Select>
        </Modal.Body>
        <Modal.Footer>
          <Button>Cancel</Button>
          <Button type="primary">Confirm</Button>
        </Modal.Footer>
      </Modal>
    );
    const select = screen.getByTestId('selectContainer');
    await user.click(select);
    const popup = screen.getByTestId('popup');
    expect(popup).toHaveStyle({
      zIndex: Theme.getPresetStaticTheme().zIndex.modal + 1,
    });
  });

  test('should set popup zIndex by closest floating container with popup', async () => {
    render(
      <Popover
        defaultValue
        content={
          <Select>
            <Select.Option value="1">Option 1</Select.Option>
            <Select.Option value="2">Option 2</Select.Option>
          </Select>
        }
      >
        Click me
      </Popover>
    );
    const select = screen.getByTestId('selectContainer');
    await user.click(select);
    const popups = screen.getAllByTestId('popup');
    popups.forEach((popup) => {
      if (popup.innerHTML.indexOf('Option 1') !== -1) {
        expect(popup).toHaveStyle({
          zIndex: Theme.getPresetStaticTheme().zIndex.popover + 1,
        });
      }
    });
  });
});
