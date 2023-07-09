'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

const ThemeSwitch = ({ lightComponent, darkComponent }) => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <>{theme === 'light' ? lightComponent : darkComponent}</>;
};

export default ThemeSwitch;
