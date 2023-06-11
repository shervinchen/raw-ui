import React, { ChangeEvent, useState } from 'react';
import Unit from '../Unit';
import { Checkbox, CheckboxGroupValue } from '@/packages';

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

export function DemoCheckboxDefault() {
  return (
    <Unit layout="row">
      <Checkbox />
    </Unit>
  );
}

export function DemoCheckboxChecked() {
  return (
    <Unit layout="row">
      <Checkbox defaultChecked />
    </Unit>
  );
}

export function DemoCheckboxWithLabel() {
  return (
    <Unit layout="row">
      <Checkbox>Label</Checkbox>
    </Unit>
  );
}

export function DemoCheckboxControlled() {
  const [checkboxValue, setCheckboxValue] = useState(false);

  return (
    <Unit layout="row">
      <Checkbox
        checked={checkboxValue}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setCheckboxValue(event.target.checked);
        }}
      >
        Controlled
      </Checkbox>
    </Unit>
  );
}

export function DemoCheckboxIndeterminate() {
  return (
    <Unit layout="row">
      <Checkbox indeterminate>Indeterminate</Checkbox>
    </Unit>
  );
}

export function DemoCheckboxDisabled() {
  return (
    <Unit layout="row">
      <Checkbox disabled>Disabled</Checkbox>
      <Checkbox defaultChecked disabled>
        Disabled
      </Checkbox>
      <Checkbox indeterminate disabled>
        Disabled
      </Checkbox>
    </Unit>
  );
}

export function DemoCheckboxGroup() {
  const [checkboxGroupValue, setCheckboxGroupValue] =
    useState<CheckboxGroupValue>(['react', 'angular']);

  return (
    <Unit layout="col">
      <Checkbox.Group defaultValue={['vue', 'svelte']}>
        {optionsData.map((item) => (
          <Checkbox value={item.value} key={item.value}>
            {item.name}
          </Checkbox>
        ))}
      </Checkbox.Group>
      <Checkbox.Group
        value={checkboxGroupValue}
        onChange={(groupValue) => {
          setCheckboxGroupValue(groupValue);
        }}
      >
        {optionsData.map((item) => (
          <Checkbox value={item.value} key={item.value}>
            {item.name}
          </Checkbox>
        ))}
      </Checkbox.Group>
      <Checkbox.Group
        defaultValue={['react', 'vue', 'angular', 'svelte']}
        disabled
      >
        {optionsData.map((item) => (
          <Checkbox value={item.value} key={item.value}>
            {item.name}
          </Checkbox>
        ))}
      </Checkbox.Group>
      <Checkbox.Group defaultValue={['vue', 'svelte']} layout="column">
        {optionsData.map((item) => (
          <Checkbox value={item.value} key={item.value}>
            {item.name}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </Unit>
  );
}

export function DemoCheckboxGroupWithIndeterminate() {
  const [checkboxGroupValue, setCheckboxGroupValue] =
    useState<CheckboxGroupValue>(['react', 'angular']);

  return (
    <Unit layout="col">
      <Checkbox
        indeterminate={
          checkboxGroupValue.length > 0 &&
          checkboxGroupValue.length < optionsData.length
        }
        checked={checkboxGroupValue.length === optionsData.length}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setCheckboxGroupValue(
            event.target.checked ? optionsData.map((item) => item.value) : []
          );
        }}
      >
        Check All
      </Checkbox>
      <Checkbox.Group
        value={checkboxGroupValue}
        onChange={setCheckboxGroupValue}
      >
        {optionsData.map((item) => (
          <Checkbox value={item.value} key={item.value}>
            {item.name}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </Unit>
  );
}
