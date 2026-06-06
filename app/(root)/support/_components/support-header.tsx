'use client';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { parseAsString, useQueryState } from 'nuqs';
import { FaSearch } from 'react-icons/fa';

const SupportHeader = () => {
  const [search, setSearch] = useQueryState(
    'q',
    parseAsString.withDefault('').withOptions({ clearOnDefault: true }),
  );

  return (
    <div className='flex flex-col items-center text-center gap-6 py-16 md:py-20 lg:py-24'>
      <div className='space-y-3'>
        <h1 className='text-4xl md:text-5xl font-semibold text-white'>
          We&apos;re here to help
        </h1>
        <p className='text-base md:text-lg lg:text-lg text-white/85'>
          Find answers to common questions and get in touch with our support
          team.
        </p>
      </div>
      <InputGroup className='rounded-full bg-transparent dark:bg-transparent border-white/20 w-full max-w-lg h-12 placeholder:text-white/70 text-white/90 has-[[data-slot=input-group-control]:focus-visible]:border-white/50 has-[[data-slot=input-group-control]:focus-visible]:ring-white/50 gap-1'>
        <InputGroupInput
          placeholder='Search for answers...'
          className='text-base placeholder:text-base placeholder:text-white/70 text-white/90'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <InputGroupAddon className='pl-3'>
          <FaSearch className='text-white/85 size-4' />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};

export default SupportHeader;
