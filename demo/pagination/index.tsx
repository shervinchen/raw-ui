import { useState } from 'react';
import Unit from '../Unit';
import { Pagination } from '@/packages';

export function DemoPaginationDefault() {
  return (
    <Unit layout="row">
      <Pagination defaultPage={1} count={100} />
    </Unit>
  );
}

export function DemoPaginationDefaultPage() {
  return (
    <Unit layout="row">
      <Pagination defaultPage={3} count={100} />
    </Unit>
  );
}

export function DemoPaginationControlled() {
  const [page, setPage] = useState(1);

  return (
    <Pagination
      page={page}
      count={100}
      onChange={(value) => {
        setPage(value);
      }}
    />
  );
}

export function DemoPaginationLimit() {
  return (
    <Unit layout="row">
      <Pagination defaultPage={1} count={100} limit={20} />
    </Unit>
  );
}
