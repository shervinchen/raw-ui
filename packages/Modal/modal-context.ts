import { createContext, useContext } from 'react';

export interface ModalConfig {
  visible: boolean;
  width: string;
  closeOnOverlayClick: boolean;
  closeModal: () => void;
}

const defaultContext = {};

export const ModalContext = createContext<ModalConfig>(
  defaultContext as ModalConfig,
);

export const useModalContext = (): ModalConfig =>
  useContext<ModalConfig>(ModalContext);
