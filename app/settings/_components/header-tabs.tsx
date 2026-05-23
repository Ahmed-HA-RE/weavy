'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { parseAsString, useQueryState } from 'nuqs';

const tabs = [
  {
    label: 'Details',
    value: 'details',
  },
  {
    label: 'Account',
    value: 'account',
  },
  {
    label: 'Security',
    value: 'security',
  },
  {
    label: 'Notifications',
    value: 'notifications',
  },
  {
    label: 'Appearance',
    value: 'appearance',
  },
  {
    label: 'Danger Zone',
    value: 'danger-zone',
  },
];

const HeaderTabs = () => {
  const [tab, setTab] = useQueryState(
    'tab',
    parseAsString.withOptions({ clearOnDefault: false }).withDefault('details'),
  );
  return (
    <Tabs value={tab || 'details'} onValueChange={setTab}>
      <TabsList variant='line' className='gap-6'>
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className='text-base md:text-lg group-data-horizontal/tabs:after:bottom-[-15px] md:group-data-horizontal/tabs:after:bottom-[-20px]'
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
export default HeaderTabs;
