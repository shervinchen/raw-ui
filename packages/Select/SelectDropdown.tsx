import React, {
  forwardRef,
  PropsWithChildren,
  useRef,
  useImperativeHandle,
} from 'react';
import classNames from 'classnames';
import { SelectDropdownProps } from './SelectDropdown.types';
import { useTransition } from '../utils/hooks';
import { RawUITheme } from '../Theme/preset/preset.type';
import { useTheme } from '../Theme/theme-context';
import { useSelectContext } from './select-context';
import Popup from '../Popup';
import { computeTargetPosition } from '../Popup/computePopup';

const SelectDropdown = forwardRef<
  HTMLDivElement | null,
  PropsWithChildren<SelectDropdownProps>
>(({ visible, className, children }, ref) => {
  const theme: RawUITheme = useTheme();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { multiple, dropdownHeight, selectRef, getPopupContainer, selectId } =
    useSelectContext();
  const { stage: dropdownTransitionStage } = useTransition(visible, 0, 0);
  const dropdownClasses = classNames('raw-select-dropdown', className);
  const selectRect = selectRef?.current?.getBoundingClientRect() ?? null;
  const dropdownWidth = selectRect
    ? selectRect.width || selectRect.right - selectRect.left
    : 0;

  useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(
    ref,
    () => dropdownRef.current
  );

  return (
    <Popup
      name="dropdown"
      visible={visible}
      targetRef={selectRef}
      getPopupPosition={() => {
        const { bottom, left } = computeTargetPosition(
          selectRef,
          getPopupContainer
        );
        return {
          top: bottom,
          left,
          transform: 'translate(0, 0)',
        };
      }}
      getPopupContainer={getPopupContainer}
    >
      <div
        data-testid="selectDropdown"
        role="listbox"
        aria-multiselectable={multiple}
        id={selectId}
        ref={dropdownRef}
        className={dropdownClasses}
        style={{
          opacity: dropdownTransitionStage === 'enter' ? 1 : 0,
        }}
      >
        {children}
        <style jsx>{`
          .raw-select-dropdown {
            width: ${dropdownWidth}px;
            padding: 8px;
            margin-top: 2px;
            border-radius: 6px;
            border: 1px solid ${theme.palette.accents2};
            box-shadow: ${theme.tokens.shadow.sm};
            background-color: ${theme.palette.background};
            max-height: ${dropdownHeight};
            overflow-y: auto;
            transition: opacity 0.15s ease;
          }
        `}</style>
      </div>
    </Popup>
  );
});

SelectDropdown.displayName = 'RawSelectDropdown';

export default SelectDropdown;
