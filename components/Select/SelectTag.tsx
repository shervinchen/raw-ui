import React, { FC, PropsWithChildren, MouseEvent } from "react";
import { X } from "react-feather";
import { RawUITheme } from "../Theme/preset/preset.type";
import { useTheme } from "../Theme/theme-context";

interface SelectTagProps {
  disabled: boolean;
  onDeleteTag: (event: MouseEvent<HTMLDivElement>) => void;
}

const SelectTag: FC<PropsWithChildren<SelectTagProps>> = ({
  disabled,
  onDeleteTag,
  children,
}) => {
  const theme: RawUITheme = useTheme();

  const clickHandler = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    if (disabled) return;
    onDeleteTag(event);
  };

  return (
    <div className="raw-select-tag">
      <div className="raw-select-tag-text">{children}</div>
      <div className="raw-select-tag-icon" onClick={clickHandler}>
        <X size={14} />
      </div>
      <style jsx>{`
        .raw-select-tag {
          display: inline-flex;
          justify-items: center;
          align-items: center;
          gap: 6px;
          padding: 6px;
          margin: 2px;
          height: 28px;
          border-radius: 6px;
          background-color: ${theme.palette.accents2};
        }
        .raw-select-tag-text {
          font-size: 14px;
          color: ${disabled ? theme.palette.accents6 : theme.palette.accents8};
        }
        .raw-select-tag-icon {
          display: inline-flex;
          align-items: center;
          transition: color 0.15s ease;
          cursor: ${disabled ? "not-allowed" : "pointer"};
          color: ${theme.palette.accents5};
        }
        .raw-select-tag-icon:hover {
          color: ${disabled ? theme.palette.accents5 : theme.palette.black};
        }
      `}</style>
    </div>
  );
};

export default SelectTag;
