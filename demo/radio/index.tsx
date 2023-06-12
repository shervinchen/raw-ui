import React, { ChangeEvent, useState } from 'react';
import Unit from '../Unit';
import { Radio, RadioValue } from '@/packages';

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

export function DemoRadioDefault() {
  return (
    <Unit layout="row">
      <Radio />
    </Unit>
  );
}

export function DemoRadioChecked() {
  return (
    <Unit layout="row">
      <Radio defaultChecked />
    </Unit>
  );
}

export function DemoRadioWithLabel() {
  return (
    <Unit layout="row">
      <Radio>Label</Radio>
    </Unit>
  );
}

export function DemoRadioControlled() {
  const [value, setValue] = useState(false);

  return (
    <Unit layout="row">
      <Radio
        checked={value}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setValue(event.target.checked);
        }}
      >
        Controlled
      </Radio>
    </Unit>
  );
}

export function DemoRadioDisabled() {
  return (
    <Unit layout="row">
      <Radio disabled>Disabled</Radio>
      <Radio defaultChecked disabled>
        Disabled
      </Radio>
    </Unit>
  );
}

export function DemoRadioGroup() {
  const [radioGroupValue, setRadioGroupValue] = useState<RadioValue>('angular');

  return (
    <Unit layout="col">
      <Radio.Group defaultValue="vue">
        {optionsData.map((item) => (
          <Radio value={item.value} key={item.value}>
            {item.name}
          </Radio>
        ))}
      </Radio.Group>
      <Radio.Group
        value={radioGroupValue}
        onChange={(groupValue) => {
          setRadioGroupValue(groupValue);
        }}
      >
        {optionsData.map((item) => (
          <Radio value={item.value} key={item.value}>
            {item.name}
          </Radio>
        ))}
      </Radio.Group>
      <Radio.Group defaultValue="svelte" disabled>
        {optionsData.map((item) => (
          <Radio value={item.value} key={item.value}>
            {item.name}
          </Radio>
        ))}
      </Radio.Group>
      <Radio.Group defaultValue="vue" layout="column">
        {optionsData.map((item) => (
          <Radio value={item.value} key={item.value}>
            {item.name}
          </Radio>
        ))}
      </Radio.Group>
    </Unit>
  );
}
