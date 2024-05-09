import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from '../Pagination';
import { PaginationProps } from '../Pagination.types';

const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

describe('Pagination', () => {
  test('should match the snapshot', () => {
    const { asFragment } = render(<Pagination />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('should support custom class name', () => {
    render(<Pagination className="custom-pagination" />);
    expect(screen.getByRole('navigation')).toHaveClass('custom-pagination');
  });

  test('should support default value', () => {
    render(<Pagination defaultPage={2} count={100} />);
    expect(screen.getByText('2')).toHaveClass('raw-pagination-item-active');
  });

  test('should support controlled value', async () => {
    const onChange = jest.fn();

    const Component = (props: PaginationProps) => {
      const [page, setPage] = useState(1);

      return (
        <Pagination
          page={page}
          count={100}
          onChange={(value) => {
            setPage(value);
            props.onChange?.(value);
          }}
        />
      );
    };

    render(<Component onChange={onChange} />);
    const pageItemSecond = screen.getByText('2');
    await user.click(pageItemSecond);
    expect(pageItemSecond).toHaveClass('raw-pagination-item-active');
    expect(onChange).toHaveBeenCalledWith(2);
  });

  test('should support go to previous when page is not first', async () => {
    render(<Pagination defaultPage={2} count={100} />);
    const pageItemPrevious = screen.getByLabelText('Go to previous page');
    const pageItemFirst = screen.getByText('1');
    const pageItemSecond = screen.getByText('2');
    expect(pageItemSecond).toHaveClass('raw-pagination-item-active');
    await user.click(pageItemPrevious);
    expect(pageItemFirst).toHaveClass('raw-pagination-item-active');
    expect(pageItemSecond).not.toHaveClass('raw-pagination-item-active');
  });

  test('should not support go to previous when page is first', async () => {
    render(<Pagination defaultPage={1} count={100} />);
    const pageItemPrevious = screen.getByLabelText('Go to previous page');
    const pageItemFirst = screen.getByText('1');
    expect(pageItemFirst).toHaveClass('raw-pagination-item-active');
    await user.click(pageItemPrevious);
    expect(pageItemFirst).toHaveClass('raw-pagination-item-active');
  });

  test('should support go to next when page is not last', async () => {
    render(<Pagination defaultPage={2} count={100} />);
    const pageItemNext = screen.getByLabelText('Go to next page');
    const pageItemSecond = screen.getByText('2');
    const pageItemThird = screen.getByText('3');
    expect(pageItemSecond).toHaveClass('raw-pagination-item-active');
    await user.click(pageItemNext);
    expect(pageItemThird).toHaveClass('raw-pagination-item-active');
    expect(pageItemSecond).not.toHaveClass('raw-pagination-item-active');
  });

  test('should not support go to next when page is last', async () => {
    render(<Pagination defaultPage={10} count={100} />);
    const pageItemNext = screen.getByLabelText('Go to next page');
    const pageItemLast = screen.getByText('10');
    expect(pageItemLast).toHaveClass('raw-pagination-item-active');
    await user.click(pageItemNext);
    expect(pageItemLast).toHaveClass('raw-pagination-item-active');
  });
});
