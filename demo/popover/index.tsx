import { useState } from 'react';
import Unit from '../Unit';
import { Popover } from '@/packages';

export function DemoPopoverDefault() {
  return (
    <Unit layout="row">
      <Popover content="I am a popover">Click me</Popover>
    </Unit>
  );
}

export function DemoPopoverHideArrow() {
  return (
    <Unit layout="row">
      <Popover content="I am a popover" hideArrow>
        Click me
      </Popover>
    </Unit>
  );
}

export function DemoPopoverDisabled() {
  return (
    <Unit layout="row">
      <Popover content="I am a popover" disabled>
        Click me
      </Popover>
    </Unit>
  );
}

export function DemoPopoverPlacement() {
  return (
    <Unit layout="col">
      <Unit layout="row">
        <Popover
          content="I am a popover with different placement"
          placement="topLeft"
        >
          Top Left
        </Popover>
        <Popover
          content="I am a popover with different placement"
          placement="top"
        >
          Top
        </Popover>
        <Popover
          content="I am a popover with different placement"
          placement="topRight"
        >
          Top Right
        </Popover>
      </Unit>
      <Unit layout="row">
        <Popover
          content="I am a popover with different placement"
          placement="bottomLeft"
        >
          Bottom Left
        </Popover>
        <Popover
          content="I am a popover with different placement"
          placement="bottom"
        >
          Bottom
        </Popover>
        <Popover
          content="I am a popover with different placement"
          placement="bottomRight"
        >
          Bottom Right
        </Popover>
      </Unit>
      <Unit layout="row">
        <Popover
          content="I am a popover with different placement"
          placement="leftTop"
        >
          Left Top
        </Popover>
        <Popover
          content="I am a popover with different placement"
          placement="left"
        >
          Left
        </Popover>
        <Popover
          content="I am a popover with different placement"
          placement="leftBottom"
        >
          Left Bottom
        </Popover>
      </Unit>
      <Unit layout="row">
        <Popover
          content="I am a popover with different placement"
          placement="rightTop"
        >
          Right Top
        </Popover>
        <Popover
          content="I am a popover with different placement"
          placement="right"
        >
          Right
        </Popover>
        <Popover
          content="I am a popover with different placement"
          placement="rightBottom"
        >
          Right Bottom
        </Popover>
      </Unit>
    </Unit>
  );
}

export function DemoPopoverControlled() {
  const [value, setValue] = useState(false);

  return (
    <Popover
      content="I am a controlled popover"
      value={value}
      onChange={(nextValue) => {
        setValue(nextValue);
      }}
    >
      Click me
    </Popover>
  );
}
