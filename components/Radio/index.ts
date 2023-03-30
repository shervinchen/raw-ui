import Radio from "./Radio";
import RadioGroup from "./RadioGroup";

export type RadioComponentType = typeof Radio & {
  Group: typeof RadioGroup;
};

(Radio as RadioComponentType).Group = RadioGroup;

export default Radio as RadioComponentType;
