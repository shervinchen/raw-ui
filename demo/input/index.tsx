import React, { ChangeEvent, useState } from 'react';
import { AlertCircle, Eye, EyeOff, Search, X } from 'react-feather';
import Unit from '../Unit';
import { Input } from '@/packages';

export function DemoInputTypes() {
  return (
    <Unit layout="col">
      <Input placeholder="Default Type" />
      <Input type="primary" placeholder="Primary Type" />
      <Input type="success" placeholder="Success Type" />
      <Input type="warning" placeholder="Warning Type" />
      <Input type="error" placeholder="Error Type" />
    </Unit>
  );
}

export function DemoInputSizes() {
  return (
    <Unit layout="col">
      <Input size="sm" placeholder="Small" />
      <Input placeholder="Medium" />
      <Input size="lg" placeholder="Large" />
    </Unit>
  );
}

export function DemoInputWidth() {
  return (
    <Unit layout="row">
      <Input width="160px" placeholder="Customized width" />
    </Unit>
  );
}

export function DemoInputDisabled() {
  return (
    <Unit layout="col">
      <Input placeholder="Disabled with placeholder" disabled />
      <Input defaultValue="Disabled with value" disabled />
    </Unit>
  );
}

export function DemoInputReadOnly() {
  return (
    <Unit layout="col">
      <Input defaultValue="Read only with value" readOnly />
    </Unit>
  );
}

export function DemoInputDefaultValue() {
  return (
    <Unit layout="col">
      <Input defaultValue="default value" placeholder="Placeholder..." />
    </Unit>
  );
}

export function DemoInputControlled() {
  const [value, setValue] = useState('');

  return (
    <Unit layout="col">
      <Input
        value={value}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setValue(event.target.value);
        }}
        placeholder="Placeholder..."
      />
    </Unit>
  );
}

export function DemoInputInsideElement() {
  return (
    <Unit layout="col">
      <Input.Group>
        <Input.LeftElement>
          <Search size={16} />
        </Input.LeftElement>
        <Input placeholder="Inside left element" />
      </Input.Group>
      <Input.Group>
        <Input placeholder="Inside right element" />
        <Input.RightElement>
          <AlertCircle size={16} />
        </Input.RightElement>
      </Input.Group>
      <Input.Group>
        <Input.LeftElement>$</Input.LeftElement>
        <Input placeholder="Enter amount" />
        <Input.RightElement>.0</Input.RightElement>
      </Input.Group>
    </Unit>
  );
}

export function DemoInputAddon() {
  return (
    <Unit layout="col">
      <Input.Group>
        <Input.LeftAddon>username</Input.LeftAddon>
        <Input placeholder="Put in the username" />
      </Input.Group>
      <Input.Group>
        <Input placeholder="https://github" />
        <Input.RightAddon>.com</Input.RightAddon>
      </Input.Group>
      <Input.Group>
        <Input.LeftAddon>https://</Input.LeftAddon>
        <Input placeholder="your domain" />
        <Input.RightAddon>.com</Input.RightAddon>
      </Input.Group>
    </Unit>
  );
}

export function DemoInputPassword() {
  const [visible, setVisible] = useState(false);

  return (
    <Unit layout="row">
      <Input.Group>
        <Input
          htmlType={visible ? 'text' : 'password'}
          placeholder="Enter password"
        />
        <Input.RightElement clickable onClick={() => setVisible(!visible)}>
          {setVisible ? <EyeOff size={16} /> : <Eye size={16} />}
        </Input.RightElement>
      </Input.Group>
    </Unit>
  );
}

export function DemoInputClearable() {
  const [value, setValue] = useState('');

  return (
    <Unit layout="row">
      <Input.Group>
        <Input
          value={value}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setValue(event.target.value)
          }
          placeholder="Clearable input"
        />
        {value !== '' && (
          <Input.RightElement clickable onClick={() => setValue('')}>
            <X size={16} />
          </Input.RightElement>
        )}
      </Input.Group>
    </Unit>
  );
}
