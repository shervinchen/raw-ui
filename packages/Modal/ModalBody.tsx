import React, { FC, PropsWithChildren } from 'react';

const ModalBody: FC<PropsWithChildren> = ({ children, ...restProps }) => {
  return (
    <div className="raw-modal-body" {...restProps}>
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
