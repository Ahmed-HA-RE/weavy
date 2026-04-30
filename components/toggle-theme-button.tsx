'use client';

import { useTheme } from '@teispace/next-themes';
import { Button } from './ui/button';
import { LuMoon, LuSun } from 'react-icons/lu';

const ToggleThemeButton = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant='ghost'
      size='icon'
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      {theme === 'light' ? <LuMoon /> : <LuSun />}
    </Button>
  );
};

export default ToggleThemeButton;
