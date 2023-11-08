import { HTMLAttributes, MouseEvent } from 'react';

interface BaseOverlayProps {
  visible?: boolean;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
}

type NativeOverlayProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  keyof BaseOverlayProps
>;

export type OverlayProps = BaseOverlayProps & NativeOverlayProps;
