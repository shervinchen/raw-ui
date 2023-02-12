import Input from "./Input";
import InputElement from "./InputElement";

export type InputComponentType = typeof Input & {
  Element: typeof InputElement;
};

(Input as InputComponentType).Element = InputElement;

export default Input as InputComponentType;
