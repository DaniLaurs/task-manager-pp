import { Loader } from 'lucide-react';

export function Loading() {
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center gap-3 bg-background text-muted-foreground'>
      <Loader size={30} className='Animate-spin' />
      <p>Estamos preparando tudo...</p>
    </div>
  );
}
