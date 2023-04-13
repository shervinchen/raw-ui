import React, { FC, HTMLAttributes, InputHTMLAttributes } from "react";

export const VisuallyHiddenInput: FC<InputHTMLAttributes<HTMLInputElement>> = (
  props
) => {
  return (
    <>
      <input {...props} />
      <style jsx>{`
        border: 0;
        clip: rect(0, 0, 0, 0);
        height: 1px;
        width: 1px;
        margin: -1px;
        padding: 0;
        overflow: hidden;
        whitespace: nowrap;
        position: absolute;
      `}</style>
    </>
  );
};

export const VisuallyHidden: FC<HTMLAttributes<HTMLSpanElement>> = (
  props
) => {
  return (
    <>
      <span {...props} />
      <style jsx>{`
        border: 0;
        clip: rect(0, 0, 0, 0);
        height: 1px;
        width: 1px;
        margin: -1px;
        padding: 0;
        overflow: hidden;
        whitespace: nowrap;
        position: absolute;
      `}</style>
    </>
  );
};
