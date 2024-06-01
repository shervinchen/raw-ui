import React, { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';
import { GridConfig, GridProps } from './Grid.types';
import { GridContext } from './grid-context';

const isLegalGutter = (gutter) => {
  return Number.isInteger(gutter) && gutter >= 0;
};

const Grid: FC<PropsWithChildren<GridProps>> = ({
  gutter = [0, 0],
  align = 'top',
  justify = 'start',
  className = '',
  style,
  children,
  ...restProps
}) => {
  const classes = classNames(
    'raw-grid',
    align && `raw-grid-align-${align}`,
    justify && `raw-grid-justify-${justify}`,
    className
  );
  const horizontalGutter = isLegalGutter(gutter?.[0]) ? gutter[0] : 0;
  const verticalGutter = isLegalGutter(gutter?.[1]) ? gutter[1] : 0;
  const rowStyle = {
    marginLeft: `-${horizontalGutter / 2}px`,
    marginRight: `-${horizontalGutter / 2}px`,
    rowGap: `${verticalGutter}px`,
  };

  const gridConfig: GridConfig = {
    horizontalGutter,
  };

  return (
    <GridContext.Provider value={gridConfig}>
      <div className={classes} style={{ ...rowStyle, ...style }} {...restProps}>
        {children}
        <style jsx>{`
          .raw-grid {
            display: flex;
            flex-flow: row wrap;
          }
          .raw-grid-align-top {
            align-items: flex-start;
          }
          .raw-grid-align-center {
            align-items: center;
          }
          .raw-grid-align-bottom {
            align-items: flex-end;
          }
          .raw-grid-justify-start {
            justify-content: flex-start;
          }
          .raw-grid-justify-center {
            justify-content: center;
          }
          .raw-grid-justify-end {
            justify-content: flex-end;
          }
          .raw-grid-justify-space-between {
            justify-content: space-between;
          }
          .raw-grid-justify-space-around {
            justify-content: space-around;
          }
          .raw-grid-justify-space-evenly {
            justify-content: space-evenly;
          }
        `}</style>
      </div>
    </GridContext.Provider>
  );
};

export default Grid;
