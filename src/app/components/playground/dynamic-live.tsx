'use client';

import { FC } from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { themes } from 'prism-react-renderer';
import { RawUITheme } from '@/packages/Theme/preset/preset.type';
import { useTheme } from '@/packages/Theme/theme-context';

interface Props {
  code?: string;
  scope?: Record<string, unknown>;
}

const DynamicLive: FC<Props> = ({ code, scope }) => {
  const theme: RawUITheme = useTheme();

  return (
    <LiveProvider code={code} scope={scope} theme={themes.dracula}>
      <div>
        <LivePreview />
        <LiveError className="bg-white text-[#e00] border-2 border-dotted border-[#e00]" />
      </div>
      <LiveEditor
        language="tsx"
        className={`border border-solid border-[${theme.palette.accents2}] rounded-md`}
      />
    </LiveProvider>
  );
};

export default DynamicLive;
