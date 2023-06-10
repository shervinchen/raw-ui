import React, { FC, PropsWithChildren } from 'react';

const Unit: FC<
  PropsWithChildren<{ title?: string; layout: 'row' | 'col' }>
> = ({ title, layout, children }) => {
  return (
    <div className="unit">
      {title && <h3>{title}</h3>}
      <div className={`unit-content unit-content-${layout}`}>{children}</div>
      <style jsx>
        {`
          .unit-content {
            display: flex;
            align-items: center;
          }

          .unit:not(:last-child) {
            margin-bottom: 12px;
          }

          .unit h3 {
            margin: 0 0 16px;
          }

          .unit-content-row {
            flex-direction: row;
            column-gap: 32px;
          }

          .unit-content-col {
            flex-direction: column;
            row-gap: 32px;
            align-items: flex-start;
          }
        `}
      </style>
    </div>
  );
};

export default Unit;
