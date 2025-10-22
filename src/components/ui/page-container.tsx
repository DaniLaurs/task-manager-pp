import type { PageContainerProps } from '@/interfaces/interfaces';

export function PageContainer({ children }: PageContainerProps) {
  return (
    <div className='w-full min-h-screen flex justify-center'>{children}</div>
  );
}
