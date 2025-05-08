import React, { FC, PropsWithChildren, useEffect, useRef } from 'react';
import { useModalContext } from './modal-context';

const ModalBody: FC<PropsWithChildren> = ({ children, ...restProps }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { handleSetPopupContainerInModal } = useModalContext();

  useEffect(() => {
    handleSetPopupContainerInModal(ref.current);
  }, [handleSetPopupContainerInModal]);

  return (
    <div
      ref={ref}
      id="raw-modal-body"
      className="raw-modal-body"
      {...restProps}
    >
      {children}
      <style jsx>{`
        .raw-modal-body {
          flex: 1 1 0%;
          padding: 8px 24px;
          font-size: 16px;
        }
      `}</style>
    </div>
  );
};

export default ModalBody;
