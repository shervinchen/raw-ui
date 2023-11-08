import React from 'react';
import { X } from 'react-feather';
import { useTheme } from '../Theme';
import { useModalContext } from './modal-context';

const ModalCloseButton = () => {
  const theme = useTheme();
  const { closeModal } = useModalContext();

  return (
    <button className="raw-modal-close-button" onClick={closeModal}>
      <X size={20} />
      <style jsx>{`
        .raw-modal-close-button {
          position: absolute;
          top: 16px;
          right: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: ${theme.palette.accents7};
          transition-property: color;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 0.15s;
          flex-shrink: 0;
          padding: 0;
          background: transparent;
          appearance: none;
          border: none;
          outline: none;
        }
        .raw-modal-close-button:hover {
          color: ${theme.palette.foreground};
        }
      `}</style>
    </button>
  );
};

export default ModalCloseButton;
