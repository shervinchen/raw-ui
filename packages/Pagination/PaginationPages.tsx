import React, { FC } from 'react';
import { MoreHorizontal } from 'react-feather';
import classNames from 'classnames';
import { PaginationPagesProps } from './Pagination.types';
import { useTheme } from '../Theme';
import { usePaginationItemStyles } from './Pagination.styles';

const PaginationPages: FC<PaginationPagesProps> = ({
  pages,
  internalPage,
  handlePageNumberClick,
}) => {
  const theme = useTheme();
  const { className: paginationItemClassName, styles: paginationItemStyles } =
    usePaginationItemStyles();

  return (
    <>
      {pages.map((pageItem, index) => {
        const isCurrentPage = pageItem === internalPage;
        return (
          <li key={index}>
            {pageItem !== 0 ? (
              <a
                className={classNames(
                  'raw-pagination-item',
                  isCurrentPage && 'raw-pagination-item-active',
                  paginationItemClassName
                )}
                aria-current={isCurrentPage ? 'page' : undefined}
                onClick={() => handlePageNumberClick(pageItem)}
              >
                {pageItem}
              </a>
            ) : (
              <span className="raw-pagination-ellipsis">
                <MoreHorizontal size={16} color={theme.palette.accents7} />
              </span>
            )}
          </li>
        );
      })}
      {paginationItemStyles}
      <style jsx>
        {`
          .raw-pagination-ellipsis {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
          }
        `}
      </style>
    </>
  );
};

export default PaginationPages;
