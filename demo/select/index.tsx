import React, { useState } from 'react';
import Unit from '../Unit';
import { Select, SelectValue } from '@/packages';

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

export function DemoSelectDefault() {
  return (
    <Unit layout="row">
      <Select width="200px" placeholder="Select option">
        <Select.Option value="1">Option 1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
      </Select>
    </Unit>
  );
}

export function DemoSelectTypes() {
  return (
    <Unit layout="col">
      <Select width="200px" placeholder="Default Type">
        <Select.Option value="1">Option 1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
      </Select>
      <Select width="200px" type="warning" placeholder="Warning Type">
        <Select.Option value="1">Option 1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
      </Select>
      <Select width="200px" type="error" placeholder="Error Type">
        <Select.Option value="1">Option 1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
      </Select>
    </Unit>
  );
}

export function DemoSelectSizes() {
  return (
    <Unit layout="col">
      <Select size="xs" width="200px" placeholder="Extra Small">
        <Select.Option value="1">Option 1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
      </Select>
      <Select size="sm" width="200px" placeholder="Small">
        <Select.Option value="1">Option 1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
      </Select>
      <Select size="md" width="200px" placeholder="Medium">
        <Select.Option value="1">Option 1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
      </Select>
      <Select size="lg" width="200px" placeholder="Large">
        <Select.Option value="1">Option 1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
      </Select>
      <Select size="xl" width="200px" placeholder="Extra Large">
        <Select.Option value="1">Option 1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
      </Select>
    </Unit>
  );
}

export function DemoSelectSelected() {
  return (
    <Unit layout="row">
      <Select width="200px" placeholder="Select option" defaultValue="1">
        <Select.Option value="1">Option 1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
      </Select>
    </Unit>
  );
}

export function DemoSelectControlled() {
  const [selectValue, setSelectValue] = useState<SelectValue>();

  return (
    <Unit layout="row">
      <Select
        width="200px"
        placeholder="Select option"
        value={selectValue}
        onChange={(value) => {
          setSelectValue(value);
        }}
      >
        <Select.Option value="1">Option 1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
      </Select>
    </Unit>
  );
}

export function DemoSelectMultiple() {
  return (
    <Unit layout="row">
      <Select
        width="200px"
        placeholder="Select option"
        multiple
        defaultValue={['react', 'vue']}
      >
        {optionsData.map((item) => (
          <Select.Option value={item.value} key={item.value}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    </Unit>
  );
}

export function DemoSelectClearable() {
  return (
    <Unit layout="row">
      <Select
        width="200px"
        placeholder="Select option"
        defaultValue="1"
        clearable
      >
        <Select.Option value="1">Option 1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
      </Select>
      <Select
        width="200px"
        placeholder="Select option"
        defaultValue={['react', 'vue']}
        multiple
        clearable
      >
        {optionsData.map((item) => (
          <Select.Option value={item.value} key={item.value}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    </Unit>
  );
}

export function DemoSelectDisabled() {
  return (
    <Unit layout="row">
      <Select width="200px" placeholder="Select option" disabled>
        <Select.Option value="1">Option 1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
      </Select>
      <Select
        width="200px"
        placeholder="Select option"
        disabled
        multiple
        defaultValue={['react', 'vue']}
      >
        {optionsData.map((item) => (
          <Select.Option value={item.value} key={item.value}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    </Unit>
  );
}

export function DemoSelectDisabledOption() {
  return (
    <Unit layout="row">
      <Select width="200px" placeholder="Select option">
        <Select.Option value="1" disabled>
          Option 1
        </Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
      </Select>
    </Unit>
  );
}

export function DemoSelectSetParentElement() {
  return (
    <Unit layout="row">
      <div
        id="parentElement"
        style={{
          overflowY: 'auto',
          width: '400px',
          height: '200px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '400px',
          }}
        >
          <Select
            width="200px"
            placeholder="Select option"
            getPopupContainer={() => document.querySelector('#parentElement')}
          >
            <Select.Option value="1">Option 1</Select.Option>
            <Select.Option value="2">Option 2</Select.Option>
          </Select>
        </div>
      </div>
    </Unit>
  );
}
