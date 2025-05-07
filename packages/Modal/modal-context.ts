import React from 'react';

export interface ModalConfig {
  visible: boolean;
  width: string;
  closeOnOverlayClick: boolean;
  getPopupContainerInModal: () => HTMLDivElement | null;
  handleSetPopupContainerInModal: (portal: HTMLDivElement | null) => void;
  closeModal: () => void;
}

const defaultContext = {};

export const ModalContext = React.createContext<ModalConfig>(
  defaultContext as ModalConfig
);

export const useModalContext = (): ModalConfig =>
  React.useContext<ModalConfig>(ModalContext);
