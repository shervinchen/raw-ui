import { HTMLAttributes } from 'react';

interface BaseModalProps {
  visible?: boolean;
  width?: string;
  closeOnOverlayClick?: boolean;
  onClose?: () => void;
}

type NativeModalProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  keyof BaseModalProps
>;

export type ModalProps = BaseModalProps & NativeModalProps;
