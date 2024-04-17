import React, { FC, PropsWithChildren } from 'react';
import { PaginationProps } from './Pagination.types';

const Pagination: FC<PropsWithChildren<PaginationProps>> = ({
  page,
  defaultPage,
  count,
  limit,
  onChange,
  children,
  ...restProps
}) => {
  return <div></div>;
};

export default Pagination;
