import React, { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';
import {
  ColOffsetResponsiveStyle,
  ColOrderResponsiveStyle,
  ColSpanResponsiveStyle,
  GridColProps,
} from './Grid.types';
import { useGridContext } from './grid-context';
import { getColResponsiveStyle } from './Grid.styles';

const GridCol: FC<PropsWithChildren<GridColProps>> = ({
  offset = 0,
  order = 0,
  span,
  className = '',
  children,
  ...restProps
}) => {
  const { horizontalGutterResponsiveStyle } = useGridContext();

  const classes = classNames(
    'raw-grid-col',
    'raw-grid-col-span',
    'raw-grid-col-offset',
    'raw-grid-col-order',
    'raw-grid-gutter-horizontal',
    className
  );

  const colSpanResponsiveStyle = getColResponsiveStyle(
    'span',
    span
  ) as ColSpanResponsiveStyle;
  const colOffsetResponsiveStyle = getColResponsiveStyle(
    'offset',
    offset
  ) as ColOffsetResponsiveStyle;
  const colOrderResponsiveStyle = getColResponsiveStyle(
    'order',
    order
  ) as ColOrderResponsiveStyle;

  return (
    <div data-testid="gridCol" className={classes} {...restProps}>
      {children}
      <style jsx>{`
        .raw-grid-col {
          position: relative;
          max-width: 100%;
          min-height: 1px;
        }
        .raw-grid-col-span {
          display: ${colSpanResponsiveStyle.xs.display};
          flex: ${colSpanResponsiveStyle.xs.flex};
          max-width: ${colSpanResponsiveStyle.xs.maxWidth};
        }
        .raw-grid-col-offset {
          margin-inline-start: ${colOffsetResponsiveStyle.xs.marginInlineStart};
        }
        .raw-grid-col-order {
          order: ${colOrderResponsiveStyle.xs.order};
        }
        .raw-grid-gutter-horizontal {
          padding-left: ${horizontalGutterResponsiveStyle.xs / 2}px;
          padding-right: ${horizontalGutterResponsiveStyle.xs / 2}px;
        }
        @media (min-width: 576px) {
          .raw-grid-col-span {
            display: ${colSpanResponsiveStyle.sm.display};
            flex: ${colSpanResponsiveStyle.sm.flex};
            max-width: ${colSpanResponsiveStyle.sm.maxWidth};
          }
          .raw-grid-col-offset {
            margin-inline-start: ${colOffsetResponsiveStyle.sm
              .marginInlineStart};
          }
          .raw-grid-col-order {
            order: ${colOrderResponsiveStyle.sm.order};
          }
          .raw-grid-gutter-horizontal {
            padding-left: ${horizontalGutterResponsiveStyle.sm / 2}px;
            padding-right: ${horizontalGutterResponsiveStyle.sm / 2}px;
          }
        }
        @media (min-width: 768px) {
          .raw-grid-col-span {
            display: ${colSpanResponsiveStyle.md.display};
            flex: ${colSpanResponsiveStyle.md.flex};
            max-width: ${colSpanResponsiveStyle.md.maxWidth};
          }
          .raw-grid-col-offset {
            margin-inline-start: ${colOffsetResponsiveStyle.md
              .marginInlineStart};
          }
          .raw-grid-col-order {
            order: ${colOrderResponsiveStyle.md.order};
          }
          .raw-grid-gutter-horizontal {
            padding-left: ${horizontalGutterResponsiveStyle.md / 2}px;
            padding-right: ${horizontalGutterResponsiveStyle.md / 2}px;
          }
        }
        @media (min-width: 992px) {
          .raw-grid-col-span {
            display: ${colSpanResponsiveStyle.lg.display};
            flex: ${colSpanResponsiveStyle.lg.flex};
            max-width: ${colSpanResponsiveStyle.lg.maxWidth};
          }
          .raw-grid-col-offset {
            margin-inline-start: ${colOffsetResponsiveStyle.lg
              .marginInlineStart};
          }
          .raw-grid-col-order {
            order: ${colOrderResponsiveStyle.lg.order};
          }
          .raw-grid-gutter-horizontal {
            padding-left: ${horizontalGutterResponsiveStyle.lg / 2}px;
            padding-right: ${horizontalGutterResponsiveStyle.lg / 2}px;
          }
        }
        @media (min-width: 1200px) {
          .raw-grid-col-span {
            display: ${colSpanResponsiveStyle.xl.display};
            flex: ${colSpanResponsiveStyle.xl.flex};
            max-width: ${colSpanResponsiveStyle.xl.maxWidth};
          }
          .raw-grid-col-offset {
            margin-inline-start: ${colOffsetResponsiveStyle.xl
              .marginInlineStart};
          }
          .raw-grid-col-order {
            order: ${colOrderResponsiveStyle.xl.order};
          }
          .raw-grid-gutter-horizontal {
            padding-left: ${horizontalGutterResponsiveStyle.xl / 2}px;
            padding-right: ${horizontalGutterResponsiveStyle.xl / 2}px;
          }
        }
        @media (min-width: 1600px) {
          .raw-grid-col-span {
            display: ${colSpanResponsiveStyle.xxl.display};
            flex: ${colSpanResponsiveStyle.xxl.flex};
            max-width: ${colSpanResponsiveStyle.xxl.maxWidth};
          }
          .raw-grid-col-offset {
            margin-inline-start: ${colOffsetResponsiveStyle.xxl
              .marginInlineStart};
          }
          .raw-grid-col-order {
            order: ${colOrderResponsiveStyle.xxl.order};
          }
          .raw-grid-gutter-horizontal {
            padding-left: ${horizontalGutterResponsiveStyle.xxl / 2}px;
            padding-right: ${horizontalGutterResponsiveStyle.xxl / 2}px;
          }
        }
      `}</style>
    </div>
  );
};

export default GridCol;
