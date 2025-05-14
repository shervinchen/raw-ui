'use client';

import { FC } from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { themes } from 'prism-react-renderer';
import { useTheme } from 'next-themes';

interface Props {
  code?: string;
  scope?: Record<string, unknown>;
}

const DynamicLive: FC<Props> = ({ code, scope }) => {
  const { theme } = useTheme();

  return (
    <LiveProvider
      code={code}
      scope={scope}
      theme={theme === 'light' ? themes.oneLight : themes.oneDark}
    >
      <div>
        <LivePreview />
        <LiveError className="bg-white text-[#e00] border-2 border-dotted border-[#e00]" />
      </div>
      <LiveEditor
        language="tsx"
        className={`border border-solid border-transparent rounded-md`}
      />
    </LiveProvider>
  );
};

export default DynamicLive;
