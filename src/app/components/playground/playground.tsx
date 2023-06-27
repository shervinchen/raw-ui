'use client';

import { FC } from 'react';
import dynamic from 'next/dynamic';
import { Loading } from '@/packages';

interface Props {
  code?: string;
  scope?: Record<string, unknown>;
}

const DynamicLive = dynamic(() => import('./dynamic-live'), {
  ssr: false,
  loading: () => (
    <div className="py-8">
      <Loading />
    </div>
  ),
});

const Playground: FC<Props> = ({ scope, code }) => {
  return (
    <div className="flex flex-col gap-4">
      <DynamicLive scope={scope} code={code.trim()} />
    </div>
  );
};

export default Playground;
