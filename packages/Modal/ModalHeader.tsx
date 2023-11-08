import React, { FC, PropsWithChildren } from 'react';

const ModalHeader: FC<PropsWithChildren> = ({ children, ...restProps }) => {
  return (
    <header className="raw-modal-header" {...restProps}>
      {children}
      <style jsx>{`
        .raw-modal-header {
          flex: 0 1 0%;
          padding: 16px 24px;
          font-weight: 600;
          font-size: 24px;
        }
      `}</style>
    </header>
  );
};

export default ModalHeader;
