import React from 'react';

export interface ModalConfig {
  visible?: boolean;
  width?: string;
  closeOnOverlayClick?: boolean;
  closeModal?: () => void;
}

const defaultContext = {};

export const ModalContext = React.createContext<ModalConfig>(defaultContext);

export const useModalContext = (): ModalConfig =>
  React.useContext<ModalConfig>(ModalContext);
