import React, {
  FC,
  HTMLAttributes,
  InputHTMLAttributes,
  Ref,
  forwardRef,
} from "react";

export const VisuallyHiddenInput = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>((props, ref: Ref<HTMLInputElement | null>) => {
  return (
    <>
      <input ref={ref} {...props} />
      <style jsx>{`
        border: 0;
        clip: rect(0, 0, 0, 0);
        height: 1px;
        width: 1px;
        margin: -1px;
        padding: 0;
        overflow: hidden;
        white-space: nowrap;
        position: absolute;
      `}</style>
    </>
  );
});

export const VisuallyHidden: FC<HTMLAttributes<HTMLSpanElement>> = (props) => {
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
        white-space: nowrap;
        position: absolute;
      `}</style>
    </>
  );
};
