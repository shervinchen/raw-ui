import React, { FC, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';
import classNames from 'classnames';
import { PaginationProps } from './Pagination.types';
import { useControlled } from '../utils/hooks';
import PaginationPages from './PaginationPages';
import { usePaginationItemStyles } from './Pagination.styles';

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};

const Pagination: FC<PaginationProps> = ({
  page,
  defaultPage = 1,
  count = 1,
  limit = 10,
  onChange,
  className = '',
  ...restProps
}) => {
  const [internalPage, setInternalPage] = useControlled<number>({
    defaultValue: defaultPage,
    value: page,
  });
  const classes = classNames('raw-pagination', className);
  const { className: paginationItemClassName, styles: paginationItemStyles } =
    usePaginationItemStyles();
  const pageCount = Math.ceil(count / limit);
  const boundaryCount = 5;
  const startPages = range(1, boundaryCount);
  const endPages = range(pageCount - boundaryCount + 1, pageCount);

  const pages: number[] = useMemo(() => {
    return [
      ...new Set(
        [
          ...(internalPage < boundaryCount ? startPages : [1]),
          internalPage,
          internalPage - 1,
          internalPage + 1,
          ...(internalPage > pageCount - boundaryCount + 1
            ? endPages
            : [pageCount]),
        ]
          .filter((value) => value >= 1 && value <= pageCount)
          .sort((a, b) => a - b)
      ),
    ].reduce<number[]>((previousValue, currentValue, currentIndex, array) => {
      previousValue.push(currentValue);
      if (
        array[currentIndex + 1] &&
        array[currentIndex + 1] - array[currentIndex] > 1
      ) {
        previousValue.push(0);
      }
      return previousValue;
    }, []);
  }, [internalPage, pageCount, startPages, endPages]);

  const clickPageNumberHandler = (pageNumber: number) => {
    setInternalPage(pageNumber);
    onChange?.(pageNumber);
  };

  const clickPreviousPageHandler = () => {
    if (internalPage === 1) {
      return;
    }
    clickPageNumberHandler(internalPage - 1);
  };

  const clickNextPageHandler = () => {
    if (internalPage === pageCount) {
      return;
    }
    clickPageNumberHandler(internalPage + 1);
  };

  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={classes}
      {...restProps}
    >
      <ul className="raw-pagination-list">
        <li>
          <a
            className={classNames(
              'raw-pagination-item',
              internalPage === 1 && 'raw-pagination-item-disabled',
              paginationItemClassName
            )}
            aria-label="Go to previous page"
            onClick={clickPreviousPageHandler}
          >
            <ChevronLeft size={16} />
          </a>
        </li>
        <PaginationPages
          pages={pages}
          internalPage={internalPage}
          clickPageNumberHandler={clickPageNumberHandler}
        />
        <li>
          <a
            className={classNames(
              'raw-pagination-item',
              internalPage === pageCount && 'raw-pagination-item-disabled',
              paginationItemClassName
            )}
            aria-label="Go to next page"
            onClick={clickNextPageHandler}
          >
            <ChevronRight size={16} />
          </a>
        </li>
      </ul>
      {paginationItemStyles}
      <style jsx>
        {`
          .raw-pagination-list {
            display: flex;
            align-items: center;
            gap: 8px;
            list-style: none;
            padding: 0;
            margin: 0;
          }
        `}
      </style>
    </nav>
  );
};

export default Pagination;
