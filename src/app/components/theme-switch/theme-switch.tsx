'use client';

import { useTheme } from 'next-themes';
import { useSSR } from '@/packages/utils';

const ThemeSwitch = ({ lightComponent, darkComponent }) => {
  const isBrowser = useSSR().isBrowser;
  const { theme } = useTheme();

  return <>{isBrowser && theme === 'dark' ? darkComponent : lightComponent}</>;
};

export default ThemeSwitch;
