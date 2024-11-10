import { ComponentPropsWithoutRef } from 'react';
import { Merge } from '../utils';

export interface BasePaginationProps {
  page?: number;
  defaultPage?: number;
  count?: number;
  limit?: number;
  className?: string;
  onChange?: (page: number) => void;
}

export type PaginationProps = Merge<
  ComponentPropsWithoutRef<'nav'>,
  BasePaginationProps
>;

export interface PaginationPagesProps {
  pages: number[];
  internalPage: number;
  handlePageNumberClick: (page: number) => void;
}
