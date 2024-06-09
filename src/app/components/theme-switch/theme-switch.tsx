'use client';

import { useTheme } from 'next-themes';
import { useIsClient } from '../../utils';

const ThemeSwitch = ({ lightComponent, darkComponent }) => {
  const isClient = useIsClient();
  const { theme } = useTheme();

  return <>{isClient && theme === 'dark' ? darkComponent : lightComponent}</>;
};

export default ThemeSwitch;
