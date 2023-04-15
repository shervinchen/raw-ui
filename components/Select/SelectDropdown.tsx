import React, {
  forwardRef,
  PropsWithChildren,
  useRef,
  useImperativeHandle,
} from "react";
import classNames from "classnames";
import { SelectDropdownProps } from "./SelectDropdown.types";
import { useTransition } from "../utils/hooks";
import { RawUITheme } from "../Theme/preset/preset.type";
import { useTheme } from "../Theme/theme-context";
import { useSelectContext } from "./select-context";
import Popup from "../Popup";

const SelectDropdown = forwardRef<
  HTMLDivElement | null,
  PropsWithChildren<SelectDropdownProps>
>(({ visible, className, children }, ref) => {
  const theme: RawUITheme = useTheme();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { dropdownHeight, selectRef, getPopupContainer } = useSelectContext();
  const { stage: dropdownTransitionStage, shouldMount: dropdownShouldMount } =
    useTransition(visible, 150);
  const dropdownClasses = classNames(
    "raw-select-dropdown",
    className
  );

  useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(
    ref,
    () => dropdownRef.current
  );

  return (
    <Popup
      name="dropdown"
      visible={dropdownShouldMount}
      targetRef={selectRef}
      getPopupContainer={getPopupContainer}
    >
      <div
        ref={dropdownRef}
        className={dropdownClasses}
        style={{
          opacity: dropdownTransitionStage === "enter" ? 1 : 0,
        }}
      >
        {children}
        <style jsx>{`
          .raw-select-dropdown {
            padding: 6px 0;
            border-radius: 6px;
            box-shadow: ${theme.tokens.shadow.lg};
            background-color: ${theme.palette.white};
            max-height: ${dropdownHeight};
            overflow-y: auto;
            transition: opacity 0.15s ease;
          }
        `}</style>
      </div>
    </Popup>
  );
});

export default SelectDropdown;
