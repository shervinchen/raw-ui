import css from 'styled-jsx/css';
import { useTheme } from '../Theme';

export const usePaginationItemStyles = () => {
  const theme = useTheme();

  return css.resolve`
    .raw-pagination-item {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      white-space: nowrap;
      min-width: 32px;
      height: 32px;
      padding: 0 8px;
      border: 1px solid ${theme.palette.neutral['200']};
      border-radius: 6px;
      font-size: 14px;
      color: ${theme.palette.neutral['600']};
      background-color: ${theme.palette.background};
      transition-property: border-color, background, color;
      transition-duration: 0.2s;
      transition-timing-function: ease;
      user-select: none;
      text-decoration: none;
      cursor: pointer;
    }
    .raw-pagination-item.raw-pagination-item-disabled {
      background-color: ${theme.palette.neutral['200']};
      color: ${theme.palette.neutral['400']};
      cursor: not-allowed;
    }
    .raw-pagination-item.raw-pagination-item-active {
      background-color: ${theme.palette.foreground};
      border-color: ${theme.palette.foreground};
      color: ${theme.palette.background};
    }
    .raw-pagination-item:not(.raw-pagination-item-active):not(
        .raw-pagination-item-disabled
      ):hover {
      border-color: ${theme.palette.foreground};
      color: ${theme.palette.foreground};
    }
    .raw-pagination-item:not(.raw-pagination-item-active):not(
        .raw-pagination-item-disabled
      ):active {
      background-color: ${theme.palette.neutral['200']};
    }
  `;
};
