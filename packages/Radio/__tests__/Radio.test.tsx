import React, { ChangeEvent, useState } from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Radio from '..';
import { RadioProps } from '../Radio.types';

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

describe('Radio', () => {
  test('should match the snapshot', () => {
    const { asFragment } = render(<Radio />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('should support custom class name', () => {
    const { container } = render(<Radio className="custom-radio" />);
    expect(container.firstChild).toHaveClass('custom-radio');
  });

  test('should trigger event when clicked', async () => {
    const clickHandler = jest.fn();
    const { container } = render(<Radio onClick={clickHandler} />);
    const radio = container.firstChild;
    await userEvent.click(radio as Element);
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });

  test('should support uncontrolled value', () => {
    const { container } = render(<Radio defaultChecked />);
    const radioInput = container.querySelector('.raw-radio-input');
    expect(radioInput).toBeChecked();
  });

  test('should support label text', () => {
    const { queryByText } = render(<Radio>Label</Radio>);
    expect(queryByText('Label')).toBeInTheDocument();
  });

  test('should support disabled', async () => {
    const { container } = render(<Radio disabled />);
    const radio = container.firstChild;
    const radioInput = container.querySelector('.raw-radio-input');
    expect(radioInput).toBeDisabled();
    await userEvent.click(radio as Element);
    expect(radioInput).not.toBeChecked();
  });

  test('should support controlled value', async () => {
    const onChange = jest.fn();

    const Component = (props: RadioProps) => {
      const [checked, setChecked] = useState(false);

      return (
        <Radio
          checked={checked}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setChecked(event.target.checked);
            props.onChange?.(event);
          }}
        >
          Controlled
        </Radio>
      );
    };

    const { container } = render(<Component onChange={onChange} />);
    const radio = container.firstChild;
    const radioInput = container.querySelector('.raw-radio-input');
    expect(radioInput).not.toBeChecked();
    await userEvent.click(radio as Element);
    expect(radioInput).toBeChecked();
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  test('should support radio group uncontrolled value', async () => {
    const Component = () => (
      <Radio.Group defaultValue="react">
        {optionsData.map((item) => (
          <Radio value={item.value} key={item.value}>
            {item.name}
          </Radio>
        ))}
      </Radio.Group>
    );
    const { container } = render(<Component />);
    const radioOne = container.querySelectorAll('input')[0];
    const radioTwo = container.querySelectorAll('input')[1];
    const radioThree = container.querySelectorAll('input')[2];
    const radioFour = container.querySelectorAll('input')[3];
    expect(radioOne).toBeChecked();
    expect(radioTwo).not.toBeChecked();
    expect(radioThree).not.toBeChecked();
    expect(radioFour).not.toBeChecked();
    await userEvent.click(radioTwo);
    expect(radioOne).not.toBeChecked();
    expect(radioTwo).toBeChecked();
    expect(radioThree).not.toBeChecked();
    expect(radioFour).not.toBeChecked();
  });

  test('should support radio group controlled value', async () => {
    let checked = 'react';

    const onChange = jest.fn((value: string) => {
      checked = value;
    });

    const Component = (props) => (
      <Radio.Group {...props}>
        {optionsData.map((item) => (
          <Radio value={item.value} key={item.value}>
            {item.name}
          </Radio>
        ))}
      </Radio.Group>
    );

    const { container, rerender } = render(
      <Component value={checked} onChange={onChange} />
    );

    const [radioOne, radioTwo, radioThree, radioFour] = Array.from(
      container.querySelectorAll('input')
    );

    expect(radioOne).toBeChecked();
    expect(radioTwo).not.toBeChecked();
    expect(radioThree).not.toBeChecked();
    expect(radioFour).not.toBeChecked();

    await userEvent.click(radioTwo);
    rerender(<Component value={checked} onChange={onChange} />);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(checked).toEqual('vue');
  });

  test('should support radio group disabled', async () => {
    const Component = () => (
      <Radio.Group defaultValue="" disabled>
        <Radio value="react">React</Radio>
        <Radio value="vue">Vue</Radio>
        <Radio value="angular" disabled>
          Angular
        </Radio>
        <Radio value="svelte" disabled={false}>
          Svelte
        </Radio>
      </Radio.Group>
    );
    const { container } = render(<Component />);
    const [radioOne, radioTwo, radioThree, radioFour] = Array.from(
      container.querySelectorAll('input')
    );
    expect(radioOne).toBeDisabled();
    expect(radioTwo).toBeDisabled();
    expect(radioThree).toBeDisabled();
    expect(radioFour).toBeDisabled();

    await userEvent.click(radioOne);
    await userEvent.click(radioTwo);
    await userEvent.click(radioThree);
    await userEvent.click(radioFour);

    expect(radioOne).not.toBeChecked();
    expect(radioTwo).not.toBeChecked();
    expect(radioThree).not.toBeChecked();
    expect(radioFour).not.toBeChecked();
  });

  test('should support row and col layout in radio group', () => {
    const Component = ({ layout }: { layout: 'row' | 'column' }) => (
      <Radio.Group defaultValue="react" layout={layout}>
        {optionsData.map((item) => (
          <Radio value={item.value} key={item.value}>
            {item.name}
          </Radio>
        ))}
      </Radio.Group>
    );
    const { container, rerender } = render(<Component layout="row" />);
    const radioGroup = container.firstChild as Element;
    expect(getComputedStyle(radioGroup).flexDirection).toBe('row');
    rerender(<Component layout="column" />);
    expect(getComputedStyle(radioGroup).flexDirection).toBe('column');
  });
});
