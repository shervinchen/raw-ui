import Unit from '../Unit';
import { Tooltip } from '@/packages';

export function DemoTooltipDefault() {
  return (
    <Unit layout="row">
      <Tooltip content="I am a tooltip">Hover me</Tooltip>
    </Unit>
  );
}

export function DemoTooltipHideArrow() {
  return (
    <Unit layout="row">
      <Tooltip content="I am a tooltip" hideArrow>
        Hover me
      </Tooltip>
    </Unit>
  );
}

export function DemoTooltipDisabled() {
  return (
    <Unit layout="row">
      <Tooltip content="I am a tooltip" disabled>
        Hover me
      </Tooltip>
    </Unit>
  );
}

export function DemoTooltipPlacement() {
  return (
    <Unit layout="col">
      <Unit layout="row">
        <Tooltip
          content="I am a tooltip with different placement"
          placement="topLeft"
        >
          Top Left
        </Tooltip>
        <Tooltip
          content="I am a tooltip with different placement"
          placement="top"
        >
          Top
        </Tooltip>
        <Tooltip
          content="I am a tooltip with different placement"
          placement="topRight"
        >
          Top Right
        </Tooltip>
      </Unit>
      <Unit layout="row">
        <Tooltip
          content="I am a tooltip with different placement"
          placement="bottomLeft"
        >
          Bottom Left
        </Tooltip>
        <Tooltip
          content="I am a tooltip with different placement"
          placement="bottom"
        >
          Bottom
        </Tooltip>
        <Tooltip
          content="I am a tooltip with different placement"
          placement="bottomRight"
        >
          Bottom Right
        </Tooltip>
      </Unit>
      <Unit layout="row">
        <Tooltip
          content="I am a tooltip with different placement"
          placement="leftTop"
        >
          Left Top
        </Tooltip>
        <Tooltip
          content="I am a tooltip with different placement"
          placement="left"
        >
          Left
        </Tooltip>
        <Tooltip
          content="I am a tooltip with different placement"
          placement="leftBottom"
        >
          Left Bottom
        </Tooltip>
      </Unit>
      <Unit layout="row">
        <Tooltip
          content="I am a tooltip with different placement"
          placement="rightTop"
        >
          Right Top
        </Tooltip>
        <Tooltip
          content="I am a tooltip with different placement"
          placement="right"
        >
          Right
        </Tooltip>
        <Tooltip
          content="I am a tooltip with different placement"
          placement="rightBottom"
        >
          Right Bottom
        </Tooltip>
      </Unit>
    </Unit>
  );
}
