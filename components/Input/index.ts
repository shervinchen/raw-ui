import Input from "./Input";
import InputGroup from './InputGroup';
import { RawInputLeftElement, RawInputRightElement } from "./InputElement";
import { RawInputLeftAddon, RawInputRightAddon } from './InputAddon';

export type InputComponentType = typeof Input & {
  Group: typeof InputGroup
  LeftElement: typeof RawInputLeftElement
  RightElement: typeof RawInputRightElement
  LeftAddon: typeof RawInputLeftAddon
  RightAddon: typeof RawInputRightAddon
};

(Input as InputComponentType).Group = InputGroup;
(Input as InputComponentType).LeftElement = RawInputLeftElement;
(Input as InputComponentType).RightElement = RawInputRightElement;
(Input as InputComponentType).LeftAddon = RawInputLeftAddon;
(Input as InputComponentType).RightAddon = RawInputRightAddon;

export default Input as InputComponentType;

