import Select from './Select'
import SelectOption from './SelectOption'

export type SelectComponentType = typeof Select & {
  Option: typeof SelectOption
};

(Select as SelectComponentType).Option = SelectOption

export default Select as SelectComponentType
