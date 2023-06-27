'use client';

import { FC } from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { themes } from 'prism-react-renderer';

interface Props {
  code?: string;
  scope?: Record<string, unknown>;
}

const DynamicLive: FC<Props> = ({ code, scope }) => {
  return (
    <LiveProvider code={code} scope={scope} theme={themes.dracula}>
      <div>
        <LivePreview />
        <LiveError />
      </div>
      <LiveEditor />
    </LiveProvider>
  );
};

export default DynamicLive;
