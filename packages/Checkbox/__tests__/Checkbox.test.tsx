import React, { ChangeEvent, useState } from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Checkbox from '..';
import { CheckboxProps } from '../Checkbox.types';
import { CheckboxGroupProps } from '../CheckboxGroup.types';

const optionsData = [
  {
    name: 'React',
    value: 'react',
    disabled: false,
  },
  {
    name: 'Vue',
    value: 'vue',
    disabled: false,
  },
  {
    name: 'Angular',
    value: 'angular',
    disabled: false,
  },
  {
    name: 'Svelte',
    value: 'svelte',
    disabled: true,
  },
];

const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

describe('Checkbox', () => {
  test('should match the snapshot', () => {
    const { asFragment } = render(<Checkbox />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('should support custom class name', () => {
    const { container } = render(<Checkbox className="custom-checkbox" />);
    expect(container.firstChild).toHaveClass('custom-checkbox');
  });

  test('should trigger event when clicked', async () => {
    const clickHandler = jest.fn();
    const { container } = render(<Checkbox onClick={clickHandler} />);
    const checkbox = container.firstChild;
    await user.click(checkbox as Element);
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });

  test('should support uncontrolled value', () => {
    const { container } = render(<Checkbox defaultChecked />);
    const checkboxInput = container.querySelector('.raw-checkbox-input');
    expect(checkboxInput).toBeChecked();
  });

  test('should support label text', () => {
    const { queryByText } = render(<Checkbox>Label</Checkbox>);
    expect(queryByText('Label')).toBeInTheDocument();
  });

  test('should support indeterminate', () => {
    const { container } = render(
      <Checkbox indeterminate>Indeterminate</Checkbox>
    );
    const checkboxInput = container.querySelector('.raw-checkbox-input');
    expect(checkboxInput).toBePartiallyChecked();
  });

  test('should support disabled', async () => {
    const { container } = render(<Checkbox disabled />);
    const checkbox = container.firstChild;
    const checkboxInput = container.querySelector('.raw-checkbox-input');
    expect(checkboxInput).toBeDisabled();
    await user.click(checkbox as Element);
    expect(checkboxInput).not.toBeChecked();
  });

  test('should support controlled value', async () => {
    const onChange = jest.fn();

    const Component = (props: CheckboxProps) => {
      const [checked, setChecked] = useState(false);

      return (
        <Checkbox
          checked={checked}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setChecked(event.target.checked);
            props.onChange?.(event);
          }}
        >
          Controlled
        </Checkbox>
      );
    };
    const { container } = render(<Component onChange={onChange} />);
    const checkbox = container.firstChild;
    const checkboxInput = container.querySelector('.raw-checkbox-input');
    expect(checkboxInput).not.toBeChecked();
    await user.click(checkbox as Element);
    expect(checkboxInput).toBeChecked();
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  test('should not change value when indeterminate', async () => {
    const { container } = render(<Checkbox indeterminate />);
    const checkbox = container.firstChild;
    const checkboxInput = container.querySelector('.raw-checkbox-input');
    expect(checkboxInput).toBePartiallyChecked();
    await user.click(checkbox as Element);
    expect(checkboxInput).toBePartiallyChecked();
  });

  test('should support checkbox group uncontrolled value', async () => {
    const Component = () => (
      <Checkbox.Group defaultValue={['react', 'vue']}>
        {optionsData.map((item) => (
          <Checkbox value={item.value} key={item.value}>
            {item.name}
          </Checkbox>
        ))}
      </Checkbox.Group>
    );
    const { container } = render(<Component />);
    const checkboxOne = container.querySelectorAll('input')[0];
    const checkboxTwo = container.querySelectorAll('input')[1];
    const checkboxThree = container.querySelectorAll('input')[2];
    const checkboxFour = container.querySelectorAll('input')[3];
    expect(checkboxOne).toBeChecked();
    expect(checkboxTwo).toBeChecked();
    expect(checkboxThree).not.toBeChecked();
    expect(checkboxFour).not.toBeChecked();
    await user.click(checkboxTwo);
    await user.click(checkboxThree);
    await user.click(checkboxFour);
    expect(checkboxOne).toBeChecked();
    expect(checkboxTwo).not.toBeChecked();
    expect(checkboxThree).toBeChecked();
    expect(checkboxFour).toBeChecked();
  });

  test('should support checkbox group controlled value', async () => {
    let checked = ['react', 'vue'];

    const onChange = jest.fn((value: string[]) => {
      checked = value;
    });

    const Component = (props: CheckboxGroupProps) => (
      <Checkbox.Group {...props}>
        {optionsData.map((item) => (
          <Checkbox value={item.value} key={item.value}>
            {item.name}
          </Checkbox>
        ))}
      </Checkbox.Group>
    );

    const { container, rerender } = render(
      <Component value={checked} onChange={onChange} />
    );

    const [checkboxOne, checkboxTwo, checkboxThree, checkboxFour] = Array.from(
      container.querySelectorAll('input')
    );

    expect(checkboxOne).toBeChecked();
    expect(checkboxTwo).toBeChecked();
    expect(checkboxThree).not.toBeChecked();
    expect(checkboxFour).not.toBeChecked();

    await user.click(checkboxThree);
    rerender(<Component value={checked} onChange={onChange} />);
    await user.click(checkboxFour);
    rerender(<Component value={checked} onChange={onChange} />);

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(checked).toEqual(['react', 'vue', 'angular', 'svelte']);
  });

  test('should support checkbox group disabled', async () => {
    const Component = () => (
      <Checkbox.Group defaultValue={[]} disabled>
        <Checkbox value="react">React</Checkbox>
        <Checkbox value="vue">Vue</Checkbox>
        <Checkbox value="angular" disabled>
          Angular
        </Checkbox>
        <Checkbox value="svelte" disabled={false}>
          Svelte
        </Checkbox>
      </Checkbox.Group>
    );
    const { container } = render(<Component />);
    const [checkboxOne, checkboxTwo, checkboxThree, checkboxFour] = Array.from(
      container.querySelectorAll('input')
    );
    expect(checkboxOne).toBeDisabled();
    expect(checkboxTwo).toBeDisabled();
    expect(checkboxThree).toBeDisabled();
    expect(checkboxFour).toBeDisabled();

    await user.click(checkboxOne);
    await user.click(checkboxTwo);
    await user.click(checkboxThree);
    await user.click(checkboxFour);

    expect(checkboxOne).not.toBeChecked();
    expect(checkboxTwo).not.toBeChecked();
    expect(checkboxThree).not.toBeChecked();
    expect(checkboxFour).not.toBeChecked();
  });

  test('should support row and col layout in checkbox group', () => {
    const Component = ({ layout }: { layout: 'row' | 'column' }) => (
      <Checkbox.Group defaultValue={['react', 'vue']} layout={layout}>
        {optionsData.map((item) => (
          <Checkbox value={item.value} key={item.value}>
            {item.name}
          </Checkbox>
        ))}
      </Checkbox.Group>
    );
    const { container, rerender } = render(<Component layout="row" />);
    const checkboxGroup = container.firstChild as Element;
    expect(getComputedStyle(checkboxGroup).flexDirection).toBe('row');
    rerender(<Component layout="column" />);
    expect(getComputedStyle(checkboxGroup).flexDirection).toBe('column');
  });
});
