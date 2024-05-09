import Unit from '../Unit';
import { Pagination } from '@/packages';

export function DemoPaginationDefault() {
  return (
    <Unit layout="row">
      <Pagination defaultPage={1} count={124} limit={10} />
    </Unit>
  );
}
