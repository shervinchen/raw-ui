import { PrismTheme } from 'prism-react-renderer';
import { RawUITheme } from '@/packages/Theme/preset/preset.type';

export const getPrismTheme = (theme: RawUITheme): PrismTheme => ({
  plain: {
    color: theme.palette.accents6,
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
        color: theme.palette.accents5,
        opacity: 0.5,
      },
    },
    {
      types: ['tag'],
      style: {
        color: theme.palette.accents8,
      },
    },
    {
      types: ['function'],
      style: {
        color: theme.palette.success5,
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
        color: theme.palette.warning5,
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
});
