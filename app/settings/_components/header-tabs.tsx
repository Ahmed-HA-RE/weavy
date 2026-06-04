'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { parseAsString, useQueryState } from 'nuqs';

const tabs = [
  {
    label: 'Details',
    value: 'details',
  },
  {
    label: 'Security',
    value: 'security',
  },
  {
    label: 'Privacy',
    value: 'privacy',
  },
  {
    label: 'Notifications',
    value: 'notifications',
  },
  {
    label: 'Danger Zone',
    value: 'danger-zone',
  },
];

const HeaderTabs = () => {
  const [tab, setTab] = useQueryState(
    'tab',
    parseAsString
      .withOptions({ clearOnDefault: false, shallow: false })
      .withDefault('details'),
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
