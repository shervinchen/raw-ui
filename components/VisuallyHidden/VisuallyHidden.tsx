import React, {
  FC,
  HTMLAttributes,
  InputHTMLAttributes,
  Ref,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";

const VisuallyHiddenInput = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>((props, ref: Ref<HTMLInputElement | null>) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => inputRef.current);

  return (
    <>
      <input ref={inputRef} {...props} />
      <style jsx>
        {`
          border: 0;
          clip: rect(0, 0, 0, 0);
          height: 1px;
          width: 1px;
          margin: -1px;
          padding: 0;
          overflow: hidden;
          white-space: nowrap;
          position: absolute;
        `}
      </style>
    </>
  );
});

const VisuallyHidden: FC<HTMLAttributes<HTMLSpanElement>> = (props) => {
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

VisuallyHiddenInput.displayName = 'RawVisuallyHiddenInput';
VisuallyHidden.displayName = 'RawVisuallyHidden';

export { VisuallyHiddenInput, VisuallyHidden };