import type { PageContentProps } from '@/interfaces/interfaces';

export function PageContent({ children }: PageContentProps) {
  return (
    <div className='w-full max-w-screen-lg flex flex-col items-center gap-3 px-2 py-4'>
      {children}
    </div>
  );
}
