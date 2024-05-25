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
      min-width: 40px;
      height: 40px;
      padding: 0 8px;
      border: 1px solid ${theme.palette.accents2};
      border-radius: 6px;
      font-size: 14px;
      color: ${theme.palette.accents7};
      background-color: ${theme.palette.background};
      transition-property: border-color, background, color;
      transition-duration: 0.2s;
      transition-timing-function: ease;
      user-select: none;
      text-decoration: none;
      cursor: pointer;
    }
    .raw-pagination-item.raw-pagination-item-disabled {
      background-color: ${theme.palette.accents2};
      color: ${theme.palette.accents5};
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
      background-color: ${theme.palette.accents2};
    }
  `;
};
