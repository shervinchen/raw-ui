import { HTMLAttributes } from 'react';

interface BasePaginationProps {
  page?: number;
  defaultPage?: number;
  count?: number;
  limit?: number;
  onChange?: (page: number) => void;
}

type NativePaginationProps = Omit<
  HTMLAttributes<HTMLElement>,
  keyof BasePaginationProps
>;

export type PaginationProps = BasePaginationProps & NativePaginationProps;
