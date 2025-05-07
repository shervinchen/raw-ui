import React, {
  FC,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import { useKeyPressEvent } from 'react-use';
import { ModalProps } from './Modal.types';
import { useControlled, usePortal } from '../utils/hooks';
import Overlay from '../Overlay';
import ModalWrapper from './ModalWrapper';
import { ModalConfig, ModalContext } from './modal-context';
import ModalCloseButton from './ModalCloseButton';
import { KeyCode } from '../utils/constant';

const Modal: FC<PropsWithChildren<ModalProps>> = ({
  visible,
  width = '540px',
  closeOnOverlayClick = true,
  className = '',
  onClose,
  children,
  ...restProps
}) => {
  const modalPortal = usePortal('modal');
  const [internalVisible, setInternalVisible] = useControlled<boolean>({
    defaultValue: false,
    value: visible,
  });
  const [popupContainerInModal, setPopupContainerInModal] =
    useState<HTMLDivElement | null>(null);
  const classes = classNames('raw-modal-wrapper', className);

  const closeModal = useCallback(() => {
    setInternalVisible(false);
    onClose?.();
  }, [onClose, setInternalVisible]);

  const handleSetPopupContainerInModal = useCallback((portal) => {
    setPopupContainerInModal(portal);
  }, []);

  const modalConfig: ModalConfig = useMemo(
    () => ({
      visible: internalVisible,
      width,
      closeOnOverlayClick,
      getPopupContainerInModal: () => popupContainerInModal,
      handleSetPopupContainerInModal,
      closeModal,
    }),
    [
      internalVisible,
      width,
      closeOnOverlayClick,
      popupContainerInModal,
      handleSetPopupContainerInModal,
      closeModal,
    ]
  );

  useKeyPressEvent(KeyCode.Escape, () => {
    closeModal();
  });

  if (!modalPortal) return null;

  return createPortal(
    <ModalContext.Provider value={modalConfig}>
      <Overlay visible={internalVisible} />
      <ModalWrapper className={classes} {...restProps}>
        <ModalCloseButton />
        {children}
      </ModalWrapper>
    </ModalContext.Provider>,
    modalPortal
  );
};

export default Modal;
