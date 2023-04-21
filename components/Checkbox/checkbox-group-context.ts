import { createContext, useContext } from "react";
import { CheckboxGroupConfig } from "./CheckboxGroup.types";

const defaultContext: CheckboxGroupConfig = {
  groupDisabled: false,
  groupValue: [],
  inGroup: false,
};

export const CheckboxGroupContext =
  createContext<CheckboxGroupConfig>(defaultContext);

export const useCheckboxGroupContext = (): CheckboxGroupConfig =>
  useContext<CheckboxGroupConfig>(CheckboxGroupContext);
