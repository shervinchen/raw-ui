import React, { createContext, useContext } from "react";
import { RadioGroupConfig } from "./RadioGroup.types";

const defaultContext: RadioGroupConfig = {
  groupDisabled: false,
  groupValue: '',
  inGroup: false,
};

export const RadioGroupContext =
  createContext<RadioGroupConfig>(defaultContext);

export const useRadioGroupContext = (): RadioGroupConfig =>
  useContext<RadioGroupConfig>(RadioGroupContext);
