'use client';

import { Accordion as AccordionPrimitive } from 'radix-ui';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from '@/components/ui/accordion';
import { APP_FAQS } from '@/lib/constants/app';
import { cn } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import { GoPlus } from 'react-icons/go';

const SupportFAQ = () => {
  const q = useSearchParams().get('q') || '';

  const filteredFAQs = APP_FAQS.filter((faq) => {
    const question = faq.question.toLowerCase();
    const answer = faq.answer.toLowerCase();
    const query = q.toLowerCase();
    return question.includes(query) || answer.includes(query);
  });

  return (
    <div className='flex flex-col gap-6'>
      <div className='space-y-2.5 text-center'>
        <h2 className='text-2xl md:text-3xl lg:text-4xl font-semibold'>
          Frequently Asked Questions
        </h2>
        <p className='text-sm md:text-base lg:text-lg max-w-3xl mx-auto text-muted-foreground'>
          Find answers to common questions about our products. Can&apos;t find
          what you&apos;re looking for? Contact our support team.
        </p>
      </div>
      {filteredFAQs.length === 0 && (
        <p className='text-sm text-center text-muted-foreground mt-10'>
          No results found for &quot;{q}&quot;. Please try a different search
          term.
        </p>
      )}

      <Accordion
        className='w-full border-0 [&>*>[data-slot="accordion-content"]]:px-0'
        collapsible
        defaultValue='question-0'
        type='single'
      >
        {filteredFAQs.map(({ question, answer }, index) => (
          <AccordionItem key={question} value={`question-${index}`}>
            <AccordionPrimitive.Header className='flex'>
              <AccordionPrimitive.Trigger
                className={cn(
                  'flex flex-1 items-center justify-between py-4 font-medium transition-all [&[data-state=open]>svg]:rotate-45',
                  'text-start lg:text-lg cursor-pointer',
                )}
              >
                {question}
                <GoPlus className='h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200' />
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>
            <AccordionContent className='text-pretty text-base text-muted-foreground'>
              {answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default SupportFAQ;
