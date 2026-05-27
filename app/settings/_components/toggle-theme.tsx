'use client';

import { useTheme } from '@teispace/next-themes';
import { LuMoon, LuSun, LuMonitor } from 'react-icons/lu';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';

const themeOptions = [
  { value: 'light', label: 'Light', icon: LuSun },
  { value: 'dark', label: 'Dark', icon: LuMoon },
  { value: 'system', label: 'System', icon: LuMonitor },
] as const;

const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Select value={theme} onValueChange={setTheme}>
      <SelectTrigger className='w-36 text-sm'>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {themeOptions.map(({ value, label, icon: Icon }) => (
          <SelectItem key={value} value={value}>
            <span className='flex items-center gap-2'>
              <Icon className='size-4 shrink-0' />
              {label}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ToggleTheme;
