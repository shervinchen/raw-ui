import React, { ChangeEvent, useState } from 'react';
import Unit from '../Unit';
import { Toggle } from '@/packages';

export function DemoToggleDefault() {
  return (
    <Unit layout="row">
      <Toggle />
    </Unit>
  );
}

export function DemoToggleChecked() {
  return (
    <Unit layout="row">
      <Toggle defaultChecked />
    </Unit>
  );
}

export function DemoToggleControlled() {
  const [value, setValue] = useState(false);

  return (
    <Unit layout="row">
      <Toggle
        checked={value}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setValue(event.target.checked);
        }}
      />
    </Unit>
  );
}

export function DemoToggleDisabled() {
  return (
    <Unit layout="row">
      <Toggle disabled />
      <Toggle defaultChecked disabled />
    </Unit>
  );
}
