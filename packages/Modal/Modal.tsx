import React, { FC, PropsWithChildren, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import { ModalProps } from './Modal.types';
import { useControlled, usePortal } from '../utils/hooks';
import Overlay from '../Overlay';
import ModalWrapper from './ModalWrapper';
import { ModalConfig, ModalContext } from './modal-context';
import ModalCloseButton from './ModalCloseButton';

const Modal: FC<PropsWithChildren<ModalProps>> = ({
  visible,
  width = '540px',
  closeOnOverlayClick = true,
  className = '',
  onClose,
  children,
  ...restProps
}) => {
  const portal = usePortal('modal');
  const [internalVisible, setInternalVisible] = useControlled<boolean>({
    defaultValue: false,
    value: visible,
  });
  const classes = classNames('raw-modal-wrapper', className);

  const closeModal = useCallback(() => {
    setInternalVisible(false);
    onClose?.();
  }, [onClose, setInternalVisible]);

  const modalConfig: ModalConfig = useMemo(
    () => ({
      width,
      closeOnOverlayClick,
      closeModal,
    }),
    [closeModal, width, closeOnOverlayClick]
  );

  if (!portal) return null;

  return createPortal(
    <ModalContext.Provider value={modalConfig}>
      <Overlay visible={internalVisible} />
      <ModalWrapper
        visible={internalVisible}
        className={classes}
        {...restProps}
      >
        <ModalCloseButton />
        {children}
      </ModalWrapper>
    </ModalContext.Provider>,
    portal
  );
};

export default Modal;
