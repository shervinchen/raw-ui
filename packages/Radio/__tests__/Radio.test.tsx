import React, { ChangeEvent, useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Radio from '..';
import { RadioProps } from '../Radio.types';
import { RadioGroupProps } from '../RadioGroup.types';

const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

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
    render(<Radio className="custom-radio" />);
    expect(screen.getByTestId('radioLabel')).toHaveClass('custom-radio');
  });

  test('should trigger event when clicked', async () => {
    const clickHandler = jest.fn();
    render(<Radio onClick={clickHandler} />);
    await user.click(screen.getByTestId('radioLabel'));
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });

  test('should support uncontrolled value', () => {
    render(<Radio defaultChecked />);
    expect(screen.getByRole('radio')).toBeChecked();
  });

  test('should support label text', () => {
    render(<Radio>Label</Radio>);
    expect(screen.queryByText('Label')).toBeInTheDocument();
  });

  test('should support disabled', async () => {
    render(<Radio disabled />);
    const radio = screen.getByTestId('radioLabel');
    const radioInput = screen.getByRole('radio');
    expect(radioInput).toBeDisabled();
    await user.click(radio);
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

    render(<Component onChange={onChange} />);
    const radio = screen.getByTestId('radioLabel');
    const radioInput = screen.getByRole('radio');
    expect(radioInput).not.toBeChecked();
    await user.click(radio);
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
    render(<Component />);
    const [radioOne, radioTwo, radioThree, radioFour] =
      screen.getAllByRole('radio');
    expect(radioOne).toBeChecked();
    expect(radioTwo).not.toBeChecked();
    expect(radioThree).not.toBeChecked();
    expect(radioFour).not.toBeChecked();
    await user.click(radioTwo);
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

    const Component = (props: RadioGroupProps) => (
      <Radio.Group {...props}>
        {optionsData.map((item) => (
          <Radio value={item.value} key={item.value}>
            {item.name}
          </Radio>
        ))}
      </Radio.Group>
    );

    const { rerender } = render(
      <Component value={checked} onChange={onChange} />
    );

    const [radioOne, radioTwo, radioThree, radioFour] =
      screen.getAllByRole('radio');

    expect(radioOne).toBeChecked();
    expect(radioTwo).not.toBeChecked();
    expect(radioThree).not.toBeChecked();
    expect(radioFour).not.toBeChecked();

    await user.click(radioTwo);
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
    render(<Component />);
    const [radioOne, radioTwo, radioThree, radioFour] =
      screen.getAllByRole('radio');
    expect(radioOne).toBeDisabled();
    expect(radioTwo).toBeDisabled();
    expect(radioThree).toBeDisabled();
    expect(radioFour).toBeDisabled();

    await user.click(radioOne);
    await user.click(radioTwo);
    await user.click(radioThree);
    await user.click(radioFour);

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
    const { rerender } = render(<Component layout="row" />);
    const radioGroup = screen.getByRole('radiogroup');
    expect(radioGroup).toHaveStyle('flex-direction: row');
    rerender(<Component layout="column" />);
    expect(radioGroup).toHaveStyle('flex-direction: column');
  });
});
