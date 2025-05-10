import React from 'react';

export interface ModalConfig {
  visible: boolean;
  width: string;
  closeOnOverlayClick: boolean;
  closeModal: () => void;
}

const defaultContext = {};

export const ModalContext = React.createContext<ModalConfig>(
  defaultContext as ModalConfig
);

export const useModalContext = (): ModalConfig =>
  React.useContext<ModalConfig>(ModalContext);
