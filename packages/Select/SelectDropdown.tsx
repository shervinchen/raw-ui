import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  ComponentPropsWithRef,
  useCallback,
  MutableRefObject,
} from 'react';
import classNames from 'classnames';
import { SelectDropdownProps } from './SelectDropdown.types';
import { useTransition } from '../utils/hooks';
import { RawUITheme } from '../Theme/preset/preset.type';
import { useTheme } from '../Theme/theme-context';
import { useSelectContext } from './select-context';
import Popup from '../Popup';
import { computePopupRect } from '../Popup/computePopupRect';

const SelectDropdown = forwardRef(
  (
    { visible, className, children }: SelectDropdownProps,
    ref: ComponentPropsWithRef<'div'>['ref'],
  ) => {
    const theme: RawUITheme = useTheme();
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const {
      multiple,
      dropdownHeight,
      strategy,
      selectTargetRef,
      selectTarget,
      zIndex,
      getPopupContainer,
      selectId,
    } = useSelectContext();
    const { stage: dropdownTransitionStage } = useTransition(visible, 0, 0);
    const dropdownClasses = classNames('raw-select-dropdown', className);
    const selectRect = selectTargetRef.current?.getBoundingClientRect() ?? null;
    const dropdownWidth = selectRect
      ? selectRect.width || selectRect.right - selectRect.left
      : 0;

    const getPopupPosition = useCallback(
      (popupRef: MutableRefObject<HTMLDivElement | null>) => {
        const { bottom, left } = computePopupRect(
          strategy,
          selectTargetRef,
          popupRef,
        );
        return {
          top: bottom,
          left,
        };
      },
      [strategy, selectTargetRef],
    );

    useImperativeHandle(ref, () => dropdownRef.current as HTMLDivElement);

    return (
      <Popup
        name="dropdown"
        visible={visible}
        zIndex={zIndex}
        strategy={strategy}
        targetElement={selectTarget}
        getPopupPosition={getPopupPosition}
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
              border: 1px solid ${theme.palette.neutral['200']};
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
  },
);

SelectDropdown.displayName = 'RawSelectDropdown';

export default SelectDropdown;
