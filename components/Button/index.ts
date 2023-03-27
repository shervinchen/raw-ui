import Button from "./Button";
import ButtonGroup from './ButtonGroup'

export type ButtonComponentType = typeof Button & {
  Group: typeof ButtonGroup
};

(Button as ButtonComponentType).Group = ButtonGroup;

export default Button as ButtonComponentType;
