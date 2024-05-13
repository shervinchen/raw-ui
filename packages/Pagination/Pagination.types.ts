import { HTMLAttributes } from 'react';

interface BasePaginationProps {
  page?: number;
  defaultPage?: number;
  count?: number;
  limit?: number;
  className?: string;
  onChange?: (page: number) => void;
}

type NativePaginationProps = Omit<
  HTMLAttributes<HTMLElement>,
  keyof BasePaginationProps
>;

export type PaginationProps = BasePaginationProps & NativePaginationProps;

export interface PaginationPagesProps {
  pages: number[];
  internalPage: number;
  handlePageNumberClick: (page: number) => void;
}
