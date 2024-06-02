import React, { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';
import {
  AlignResponsiveStyle,
  GridConfig,
  GridProps,
  GutterResponsiveStyle,
  JustifyResponsiveStyle,
} from './Grid.types';
import { GridContext } from './grid-context';
import {
  alignStyleMap,
  getGridResponsiveStyle,
  justifyStyleMap,
} from './Grid.styles';

const Grid: FC<PropsWithChildren<GridProps>> = ({
  gutter = [0, 0],
  align = 'normal',
  justify = 'normal',
  className = '',
  children,
  ...restProps
}) => {
  const classes = classNames(
    'raw-grid',
    'raw-grid-gutter-side',
    'raw-grid-gutter-vertical',
    'raw-grid-align',
    'raw-grid-justify',
    className
  );

  const horizontalGutterResponsiveStyle = getGridResponsiveStyle(
    'gutter',
    gutter?.[0]
  ) as GutterResponsiveStyle;
  const verticalGutterResponsiveStyle = getGridResponsiveStyle(
    'gutter',
    gutter?.[1]
  ) as GutterResponsiveStyle;
  const alignResponsiveStyle = getGridResponsiveStyle(
    'align',
    align
  ) as AlignResponsiveStyle;
  const justifyResponsiveStyle = getGridResponsiveStyle(
    'justify',
    justify
  ) as JustifyResponsiveStyle;

  const gridConfig: GridConfig = {
    horizontalGutterResponsiveStyle,
  };

  return (
    <GridContext.Provider value={gridConfig}>
      <div className={classes} {...restProps}>
        {children}
        <style jsx>{`
          .raw-grid {
            display: flex;
            flex-flow: row wrap;
          }
          .raw-grid-gutter-side {
            margin-left: -${horizontalGutterResponsiveStyle.xs / 2}px;
            margin-right: -${horizontalGutterResponsiveStyle.xs / 2}px;
          }
          .raw-grid-gutter-vertical {
            row-gap: ${verticalGutterResponsiveStyle.xs}px;
          }
          .raw-grid-align {
            align-items: ${alignStyleMap[alignResponsiveStyle.xs]};
          }
          .raw-grid-justify {
            justify-content: ${justifyStyleMap[justifyResponsiveStyle.xs]};
          }
          @media (min-width: 576px) {
            .raw-grid-gutter-side {
              margin-left: -${horizontalGutterResponsiveStyle.sm / 2}px;
              margin-right: -${horizontalGutterResponsiveStyle.sm / 2}px;
            }
            .raw-grid-gutter-vertical {
              row-gap: ${verticalGutterResponsiveStyle.sm}px;
            }
            .raw-grid-align {
              align-items: ${alignStyleMap[alignResponsiveStyle.sm]};
            }
            .raw-grid-justify {
              justify-content: ${justifyStyleMap[justifyResponsiveStyle.sm]};
            }
          }
          @media (min-width: 768px) {
            .raw-grid-gutter-side {
              margin-left: -${horizontalGutterResponsiveStyle.md / 2}px;
              margin-right: -${horizontalGutterResponsiveStyle.md / 2}px;
            }
            .raw-grid-gutter-vertical {
              row-gap: ${verticalGutterResponsiveStyle.md}px;
            }
            .raw-grid-align {
              align-items: ${alignStyleMap[alignResponsiveStyle.md]};
            }
            .raw-grid-justify {
              justify-content: ${justifyStyleMap[justifyResponsiveStyle.md]};
            }
          }
          @media (min-width: 992px) {
            .raw-grid-gutter-side {
              margin-left: -${horizontalGutterResponsiveStyle.lg / 2}px;
              margin-right: -${horizontalGutterResponsiveStyle.lg / 2}px;
            }
            .raw-grid-gutter-vertical {
              row-gap: ${verticalGutterResponsiveStyle.lg}px;
            }
            .raw-grid-align {
              align-items: ${alignStyleMap[alignResponsiveStyle.lg]};
            }
            .raw-grid-justify {
              justify-content: ${justifyStyleMap[justifyResponsiveStyle.lg]};
            }
          }
          @media (min-width: 1200px) {
            .raw-grid-gutter-side {
              margin-left: -${horizontalGutterResponsiveStyle.xl / 2}px;
              margin-right: -${horizontalGutterResponsiveStyle.xl / 2}px;
            }
            .raw-grid-gutter-vertical {
              row-gap: ${verticalGutterResponsiveStyle.xl}px;
            }
            .raw-grid-align {
              align-items: ${alignStyleMap[alignResponsiveStyle.xl]};
            }
            .raw-grid-justify {
              justify-content: ${justifyStyleMap[justifyResponsiveStyle.xl]};
            }
          }
          @media (min-width: 1600px) {
            .raw-grid-gutter-side {
              margin-left: -${horizontalGutterResponsiveStyle.xxl / 2}px;
              margin-right: -${horizontalGutterResponsiveStyle.xxl / 2}px;
            }
            .raw-grid-gutter-vertical {
              row-gap: ${verticalGutterResponsiveStyle.xxl}px;
            }
            .raw-grid-align {
              align-items: ${alignStyleMap[alignResponsiveStyle.xxl]};
            }
            .raw-grid-justify {
              justify-content: ${justifyStyleMap[justifyResponsiveStyle.xxl]};
            }
          }
        `}</style>
      </div>
    </GridContext.Provider>
  );
};

export default Grid;
