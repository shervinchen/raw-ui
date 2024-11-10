import { ComponentPropsWithoutRef } from 'react';
import { Merge } from '../utils';

export interface BaseModalProps {
  visible?: boolean;
  width?: string;
  closeOnOverlayClick?: boolean;
  className?: string;
  onClose?: () => void;
}

export type ModalProps = Merge<ComponentPropsWithoutRef<'div'>, BaseModalProps>;
