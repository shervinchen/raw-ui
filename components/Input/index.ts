import Input from "./Input";
import InputGroup from './InputGroup';
import { InputLeftElement, InputRightElement } from "./InputElement";
import { InputLeftAddon, InputRightAddon } from './InputAddon';

export type InputComponentType = typeof Input & {
  Group: typeof InputGroup
  LeftElement: typeof InputLeftElement
  RightElement: typeof InputRightElement
  LeftAddon: typeof InputLeftAddon
  RightAddon: typeof InputRightAddon
};

(Input as InputComponentType).Group = InputGroup;
(Input as InputComponentType).LeftElement = InputLeftElement;
(Input as InputComponentType).RightElement = InputRightElement;
(Input as InputComponentType).LeftAddon = InputLeftAddon;
(Input as InputComponentType).RightAddon = InputRightAddon;

export default Input as InputComponentType;

