import React, { FC, PropsWithChildren } from 'react';

const ModalHeader: FC<PropsWithChildren> = ({ children, ...restProps }) => {
  return (
    <header className="raw-modal-header" {...restProps}>
      <h4 id="raw-modal-title" className="raw-modal-title">
        {children}
      </h4>
      <style jsx>{`
        .raw-modal-header {
          flex: 0 1 0%;
          padding: 16px 24px;
        }
        .raw-modal-title {
          font-weight: 600;
          font-size: 24px;
          margin-top: 0;
          margin-bottom: 0;
        }
      `}</style>
    </header>
  );
};

export default ModalHeader;
