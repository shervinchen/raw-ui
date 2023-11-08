import React, { FC, PropsWithChildren } from 'react';

const ModalFooter: FC<PropsWithChildren> = ({ children, ...restProps }) => {
  return (
    <footer className="raw-modal-footer" {...restProps}>
      {children}
      <style jsx>{`
        .raw-modal-footer {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding: 16px 24px;
          gap: 16px;
        }
      `}</style>
    </footer>
  );
};

export default ModalFooter;
