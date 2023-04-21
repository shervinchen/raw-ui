import { createContext, useContext } from "react";
import { SelectConfig } from "./Select.types";

const defaultContext: SelectConfig = {
  multiple: false,
  selectDisabled: false
};

export const SelectContext =
  createContext<SelectConfig>(defaultContext);

export const useSelectContext = (): SelectConfig =>
  useContext<SelectConfig>(SelectContext);
