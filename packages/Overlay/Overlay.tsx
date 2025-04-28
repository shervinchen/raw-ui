import React, { FC, MouseEvent } from 'react';
import { OverlayProps } from './Overlay.types';
import { useTheme } from '../Theme';
import { useTransition } from '../utils/hooks';

const Overlay: FC<OverlayProps> = ({
  visible = false,
  onClick,
  ...restProps
}) => {
  const theme = useTheme();
  const { stage, shouldMount } = useTransition(visible, 50, 350);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    onClick?.(event);
  };

  return shouldMount ? (
    <div
      data-testid="overlay"
      className="raw-overlay"
      onClick={handleClick}
      style={{
        opacity: stage === 'enter' ? 0.25 : 0,
      }}
      {...restProps}
    >
      <style jsx>{`
        .raw-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          z-index: ${theme.zIndex.overlay};
          background-color: ${theme.palette.foreground};
          transition: opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  ) : null;
};

export default Overlay;
