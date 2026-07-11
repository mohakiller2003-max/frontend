import { cn } from '@/lib/utils';

type SectionShellProps = {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  background?: 'white' | 'pearl' | 'ivory' | 'transparent' | 'mocha' | 'ink';
  id?: string;
  /** Skip paint until near viewport — big scroll win on long pages */
  lazy?: boolean;
};

const bgMap = {
  white: 'bg-white',
  pearl: 'bg-pearl',
  ivory: 'bg-ivory',
  transparent: '',
  mocha: 'bg-mocha',
  ink: 'bg-ink',
};

export function SectionShell({
  children,
  className,
  innerClassName,
  background = 'transparent',
  id,
  lazy = false,
}: SectionShellProps) {
  return (
    <section id={id} className={cn('py-16 md:py-24', bgMap[background], lazy && 'section-lazy', className)}>
      <div className={cn('max-w-content mx-auto px-4 md:px-6', innerClassName)}>
        {children}
      </div>
    </section>
  );
}
