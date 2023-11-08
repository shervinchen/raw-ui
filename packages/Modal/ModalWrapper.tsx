import React, { FC, PropsWithChildren, MouseEvent } from 'react';
import { useTheme } from '../Theme';
import { useTransition } from '../utils/hooks';
import { useModalContext } from './modal-context';

interface ModalWrapperProps {
  visible?: boolean;
}

const ModalWrapper: FC<PropsWithChildren<ModalWrapperProps>> = ({
  visible,
  children,
  ...restProps
}) => {
  const theme = useTheme();
  const { stage, shouldMount } = useTransition(visible, 50, 350);
  const { width, closeOnOverlayClick, closeModal } = useModalContext();

  const clickModalContainerHandler = () => {
    if (closeOnOverlayClick) {
      closeModal();
    }
  };

  const clickModalHandler = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    shouldMount && (
      <div className="raw-modal-container" onClick={clickModalContainerHandler}>
        <div
          className="raw-modal-wrapper"
          style={{
            opacity: stage === 'enter' ? 1 : 0,
            transform:
              stage === 'enter'
                ? 'translate3d(0px, 0px, 0px)'
                : 'translate3d(0px, -30px, 0px)',
          }}
          onClick={clickModalHandler}
          {...restProps}
        >
          {children}
        </div>
        <style jsx>{`
          .raw-modal-container {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: auto;
            padding: 64px 0;
          }
          .raw-modal-wrapper {
            position: relative;
            display: flex;
            flex-direction: column;
            width: 100%;
            max-width: ${width};
            border-radius: 6px;
            background-color: ${theme.palette.background};
            color: ${theme.palette.foreground};
            font-size: 16px;
            box-shadow: ${theme.tokens.shadow.lg};
            transition: opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1) 0s,
              transform 0.35s cubic-bezier(0.4, 0, 0.2, 1) 0s;
            margin: auto;
          }
        `}</style>
      </div>
    )
  );
};

export default ModalWrapper;
