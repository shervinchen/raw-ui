import React, { FC, PropsWithChildren } from 'react';
import css from 'styled-jsx/css';
import classNames from 'classnames';
import { GridColProps } from './Grid.types';
import { useGridContext } from './grid-context';

const GRID_SIZE = 24;

const isLegalSize = (size) => {
  return Number.isInteger(size) && size >= 1 && size <= GRID_SIZE;
};

const colSizeStyles = Array.from({ length: GRID_SIZE }, (_, i) => 1 + i).map(
  (size) => css.resolve`
    .raw-grid-col-${size} {
      flex: 0 0 ${(size / GRID_SIZE) * 100}%;
      max-width: ${(size / GRID_SIZE) * 100}%;
    }
  `
);
const colOffsetStyles = Array.from({ length: GRID_SIZE }, (_, i) => 1 + i).map(
  (size) => css.resolve`
    .raw-grid-offset-${size} {
      margin-inline-start: ${(size / GRID_SIZE) * 100}%;
    }
  `
);
const colOrderStyles = Array.from({ length: GRID_SIZE }, (_, i) => 1 + i).map(
  (size) => css.resolve`
    .raw-grid-order-${size} {
      order: ${size};
    }
  `
);

const GridCol: FC<PropsWithChildren<GridColProps>> = ({
  offset = 0,
  order = 0,
  span,
  className = '',
  style,
  children,
  ...restProps
}) => {
  const { horizontalGutter } = useGridContext();
  const colStyle = {
    paddingLeft: `${horizontalGutter / 2}px`,
    paddingRight: `${horizontalGutter / 2}px`,
  };
  const { className: resolveColSizeClassName, styles: resolveColSizeStyles } =
    isLegalSize(span)
      ? colSizeStyles[span - 1]
      : { className: '', styles: null };
  const {
    className: resolveColOffsetClassName,
    styles: resolveColOffsetStyles,
  } = isLegalSize(offset)
    ? colOffsetStyles[offset - 1]
    : { className: '', styles: null };
  const { className: resolveColOrderClassName, styles: resolveColOrderStyles } =
    isLegalSize(order)
      ? colOrderStyles[order - 1]
      : { className: '', styles: null };

  const classes = classNames(
    'raw-grid-col',
    span && `raw-grid-col-${span}`,
    offset && `raw-grid-offset-${offset}`,
    order && `raw-grid-order-${order}`,
    resolveColSizeClassName,
    resolveColOffsetClassName,
    resolveColOrderClassName,
    className
  );

  return (
    <div className={classes} style={{ ...colStyle, ...style }} {...restProps}>
      {children}
      <style jsx>{`
        .raw-grid-col {
          position: relative;
          max-width: 100%;
          min-height: 1px;
        }
        .raw-grid-col-0 {
          display: none;
        }
      `}</style>
      {resolveColSizeStyles}
      {resolveColOffsetStyles}
      {resolveColOrderStyles}
    </div>
  );
};

export default GridCol;
