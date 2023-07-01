'use client';

import { FC } from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { RawUITheme } from '@/packages/Theme/preset/preset.type';
import { useTheme } from '@/packages/Theme/theme-context';
import { getPrismTheme } from './prism-theme';

interface Props {
  code?: string;
  scope?: Record<string, unknown>;
}

const DynamicLive: FC<Props> = ({ code, scope }) => {
  const theme: RawUITheme = useTheme();
  const prismTheme = getPrismTheme(theme);

  return (
    <LiveProvider code={code} scope={scope} theme={prismTheme}>
      <div>
        <LivePreview />
        <LiveError />
      </div>
      <LiveEditor
        language="tsx"
        className={`border border-solid border-[${theme.palette.accents2}] rounded-md`}
      />
    </LiveProvider>
  );
};

export default DynamicLive;
