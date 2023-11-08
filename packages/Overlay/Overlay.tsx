import React, { FC, PropsWithChildren, MouseEvent } from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import { OverlayProps } from './Overlay.types';
import { useTheme } from '../Theme';
import { useTransition } from '../utils/hooks';

const Overlay: FC<PropsWithChildren<OverlayProps>> = ({
  visible,
  onClick,
  children,
  ...restProps
}) => {
  const theme = useTheme();
  const { stage, shouldMount } = useTransition(visible, 50, 350);

  const clickHandler = (event: MouseEvent<HTMLDivElement>) => {
    onClick?.(event);
  };

  return (
    shouldMount && (
      <RemoveScroll>
        <div className="raw-overlay" {...restProps}>
          <div
            className="raw-overlay-backdrop"
            style={{
              opacity: stage === 'enter' ? 0.25 : 0,
            }}
            onClick={clickHandler}
          />
          {children}
          <style jsx>{`
            .raw-overlay {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              width: 100%;
              height: 100%;
              z-index: 1000;
            }
            .raw-overlay-backdrop {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              width: 100%;
              height: 100%;
              background-color: ${theme.palette.foreground};
              transition: opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1);
            }
          `}</style>
        </div>
      </RemoveScroll>
    )
  );
};

export default Overlay;
