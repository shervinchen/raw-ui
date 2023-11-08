import React, { FC, PropsWithChildren, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
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
  onClose,
  children,
  ...restProps
}) => {
  const portal = usePortal('modal');
  const [internalValue, setInternalValue] = useControlled<boolean>({
    defaultValue: false,
    value: visible,
  });

  const closeModal = useCallback(() => {
    setInternalValue(false);
    onClose?.();
  }, [onClose, setInternalValue]);

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
      <Overlay visible={internalValue}>
        <ModalWrapper visible={internalValue} {...restProps}>
          <ModalCloseButton />
          {children}
        </ModalWrapper>
      </Overlay>
    </ModalContext.Provider>,
    portal
  );
};

export default Modal;
