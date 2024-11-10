import React, {
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';

const VisuallyHiddenInput = forwardRef(
  (
    props: ComponentPropsWithoutRef<'input'>,
    ref: ComponentPropsWithRef<'input'>['ref']
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

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
  }
);

// const VisuallyHidden: FC<> = ({ as: Tag = 'span', ...props }) => {
//   return (
//     <>
//       <Tag {...props} />
//       <style jsx>{`
//         border: 0;
//         clip: rect(0, 0, 0, 0);
//         height: 1px;
//         width: 1px;
//         margin: -1px;
//         padding: 0;
//         overflow: hidden;
//         white-space: nowrap;
//         position: absolute;
//       `}</style>
//     </>
//   );
// };

VisuallyHiddenInput.displayName = 'RawVisuallyHiddenInput';
// VisuallyHidden.displayName = 'RawVisuallyHidden';

export { VisuallyHiddenInput };
