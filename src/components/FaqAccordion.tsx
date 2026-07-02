'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

type FaqItem = { q: string; a: string };

type FaqAccordionProps = {
  items: FaqItem[];
  className?: string;
};

export function FaqAccordion({ items, className }: FaqAccordionProps) {
  return (
    <Accordion.Root type="single" collapsible className={cn('space-y-2', className)}>
      {items.map((item, idx) => (
        <Accordion.Item
          key={idx}
          value={String(idx)}
          className="bg-ivory border border-sand rounded-card overflow-hidden"
        >
          <Accordion.Header>
            <Accordion.Trigger className="w-full flex items-center justify-between gap-4 px-5 py-4 text-start text-mocha font-medium hover:bg-pearl/50 transition-colors duration-150 group focus:outline-none focus-visible:ring-2 focus-visible:ring-rose">
              <span>{item.q}</span>
              <ChevronDown
                size={18}
                className="text-taupe flex-shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180"
                aria-hidden="true"
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden data-[state=closed]:animate-[accordionClose_0.15s_ease-out] data-[state=open]:animate-[accordionOpen_0.15s_ease-out]">
            <div className="px-5 pb-4 text-mocha/80 text-sm leading-relaxed border-t border-sand/50 pt-3">
              {item.a}
            </div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
