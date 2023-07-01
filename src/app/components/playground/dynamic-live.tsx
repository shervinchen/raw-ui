'use client';

import { FC } from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { PrismTheme } from 'prism-react-renderer';
import { RawUITheme } from '@/packages/Theme/preset/preset.type';
import { useTheme } from '@/packages/Theme/theme-context';

interface Props {
  code?: string;
  scope?: Record<string, unknown>;
}

const prismTheme: PrismTheme = {
  plain: {
    color: '#888',
    backgroundColor: '#fff',
  },
  styles: [
    {
      types: [
        'comment',
        'prolog',
        'constant',
        'builtin',
        'punctuation',
        'symbol',
      ],
      style: {
        color: '#999',
        opacity: 0.5,
      },
    },
    {
      types: ['tag'],
      style: {
        color: '#444',
      },
    },
    {
      types: ['function'],
      style: {
        color: '#0070f3',
      },
    },
    {
      types: ['selector'],
      style: {
        color: '#eeebff',
      },
    },
    {
      types: ['attr-name'],
      style: {
        color: '#f5a623',
      },
    },
    {
      types: ['keyword', 'variable'],
      style: {
        color: '#f81ce5',
      },
    },
    {
      types: ['string', 'char'],
      style: {
        color: '#7928ca',
      },
    },
    {
      types: ['deleted'],
      style: {
        textDecorationLine: 'line-through',
      },
    },
    {
      types: ['inserted'],
      style: {
        textDecorationLine: 'underline',
      },
    },
    {
      types: ['changed'],
      style: {
        color: '#50e3c2',
      },
    },
  ],
};

const DynamicLive: FC<Props> = ({ code, scope }) => {
  const theme: RawUITheme = useTheme();

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
