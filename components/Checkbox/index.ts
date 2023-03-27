import Checkbox from "./Checkbox";
import CheckboxGroup from "./CheckboxGroup";

export type CheckboxComponentType = typeof Checkbox & {
  Group: typeof CheckboxGroup;
};

(Checkbox as CheckboxComponentType).Group = CheckboxGroup;

export default Checkbox as CheckboxComponentType;
