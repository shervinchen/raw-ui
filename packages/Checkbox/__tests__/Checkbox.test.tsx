import React, { ChangeEvent, useState } from 'react';
import { render, screen } from '@testing-library/react';
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
    render(<Checkbox className="custom-checkbox" />);
    expect(screen.getByTestId('checkboxLabel')).toHaveClass('custom-checkbox');
  });

  test('should trigger event when clicked', async () => {
    const clickHandler = jest.fn();
    render(<Checkbox onClick={clickHandler} />);
    await user.click(screen.getByTestId('checkboxLabel'));
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });

  test('should support uncontrolled value', () => {
    render(<Checkbox defaultChecked />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  test('should support label text', () => {
    render(<Checkbox>Label</Checkbox>);
    expect(screen.getByText('Label')).toBeInTheDocument();
  });

  test('should support indeterminate', () => {
    render(<Checkbox indeterminate>Indeterminate</Checkbox>);
    expect(screen.getByRole('checkbox')).toBePartiallyChecked();
  });

  test('should support disabled', async () => {
    render(<Checkbox disabled />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
    await user.click(screen.getByTestId('checkboxLabel'));
    expect(checkbox).not.toBeChecked();
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
    render(<Component onChange={onChange} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    await user.click(screen.getByTestId('checkboxLabel'));
    expect(checkbox).toBeChecked();
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  test('should not change value when indeterminate', async () => {
    render(<Checkbox indeterminate />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBePartiallyChecked();
    await user.click(screen.getByTestId('checkboxLabel'));
    expect(checkbox).toBePartiallyChecked();
  });

  test('should not be indeterminate when indeterminate prop is false', () => {
    const { rerender } = render(<Checkbox indeterminate={true} />);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox).toBePartiallyChecked();
    rerender(<Checkbox indeterminate={false} />);
    expect(checkbox).not.toBePartiallyChecked();
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
    render(<Component />);
    const checkboxes = screen.getAllByRole('checkbox');
    const checkboxLabels = screen.getAllByTestId('checkboxLabel');
    const checkboxOne = checkboxes[0];
    const checkboxTwo = checkboxes[1];
    const checkboxThree = checkboxes[2];
    const checkboxFour = checkboxes[3];
    expect(checkboxOne).toBeChecked();
    expect(checkboxTwo).toBeChecked();
    expect(checkboxThree).not.toBeChecked();
    expect(checkboxFour).not.toBeChecked();
    await user.click(checkboxLabels[1]);
    await user.click(checkboxLabels[2]);
    await user.click(checkboxLabels[3]);
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

    const { rerender } = render(
      <Component value={checked} onChange={onChange} />
    );

    const [checkboxOne, checkboxTwo, checkboxThree, checkboxFour] =
      screen.getAllByRole('checkbox');
    const checkboxLabels = screen.getAllByTestId('checkboxLabel');

    expect(checkboxOne).toBeChecked();
    expect(checkboxTwo).toBeChecked();
    expect(checkboxThree).not.toBeChecked();
    expect(checkboxFour).not.toBeChecked();

    await user.click(checkboxLabels[2]);
    rerender(<Component value={checked} onChange={onChange} />);
    await user.click(checkboxLabels[3]);
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
    render(<Component />);
    const [checkboxOne, checkboxTwo, checkboxThree, checkboxFour] =
      screen.getAllByRole('checkbox');
    const [
      checkboxLabelOne,
      checkboxLabelTwo,
      checkboxLabelThree,
      checkboxLabelFour,
    ] = screen.getAllByTestId('checkboxLabel');

    expect(checkboxOne).toBeDisabled();
    expect(checkboxTwo).toBeDisabled();
    expect(checkboxThree).toBeDisabled();
    expect(checkboxFour).toBeDisabled();

    await user.click(checkboxLabelOne);
    await user.click(checkboxLabelTwo);
    await user.click(checkboxLabelThree);
    await user.click(checkboxLabelFour);

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
    const { rerender } = render(<Component layout="row" />);
    const checkboxGroup = screen.getByTestId('checkboxGroup');
    expect(getComputedStyle(checkboxGroup).flexDirection).toBe('row');
    rerender(<Component layout="column" />);
    expect(getComputedStyle(checkboxGroup).flexDirection).toBe('column');
  });
});
