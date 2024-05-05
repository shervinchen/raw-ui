import React, { FC, PropsWithChildren, MouseEvent } from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import { useTheme } from '../Theme';
import { useTransition } from '../utils/hooks';
import { useModalContext } from './modal-context';

interface ModalWrapperProps {
  className?: string;
}

const ModalWrapper: FC<PropsWithChildren<ModalWrapperProps>> = ({
  className,
  children,
  ...restProps
}) => {
  const theme = useTheme();
  const { visible, width, closeOnOverlayClick, closeModal } = useModalContext();
  const { stage, shouldMount } = useTransition(visible, 50, 350);

  const clickModalContainerHandler = () => {
    if (closeOnOverlayClick) {
      closeModal?.();
    }
  };

  const clickModalHandler = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return shouldMount ? (
    <RemoveScroll>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="raw-modal-title"
        aria-describedby="raw-modal-body"
        className="raw-modal-container"
        onClick={clickModalContainerHandler}
        data-testid="modalContainer"
      >
        <div
          className={className}
          onClick={clickModalHandler}
          style={
            stage === 'enter'
              ? {
                  opacity: 1,
                  transform: 'translate3d(0px, 0px, 0px)',
                }
              : {
                  opacity: 0,
                  transform: 'translate3d(0px, -30px, 0px)',
                }
          }
          data-testid="modalWrapper"
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
            z-index: 1000;
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
            transition: opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1),
              transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
            margin: auto;
          }
        `}</style>
      </div>
    </RemoveScroll>
  ) : null;
};

export default ModalWrapper;
