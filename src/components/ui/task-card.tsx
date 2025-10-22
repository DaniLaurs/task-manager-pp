import * as TogglePrimitive from '@radix-ui/react-toggle';
import type { VariantProps } from 'class-variance-authority';
import { CheckCircle, Circle, Edit, Trash } from 'lucide-react';
import * as React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import type { Task } from '@/interfaces/interfaces';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { toggleVariants } from './toggle';

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

type TaskCardProps = {
  task: Task;
};

export function TaskCard({ task }: TaskCardProps) {
  const fallbackImages = [
    'https://media.istockphoto.com/id/520700958/pt/foto/bonito-flores-de-fundo.jpg?s=612x612&w=0&k=20&c=u34VaLeCyQhHs6nM3BQnOFxFRc-Kd3YCA6DEitRmcdQ=',
    'https://media.istockphoto.com/id/474058580/pt/foto/bonito-abstrato-fundo-colorido-com-flores-e-tons-suaves-e-t%C3%BAlipas.jpg?s=612x612&w=0&k=20&c=EODt-E4rW3H0oedyMdLe9TljtV6Y4fK0KrASqAd-vng=',
  ];

  const imagesToUse =
    Array.isArray(task.images) && task.images.length > 0
      ? task.images
      : fallbackImages;

  return (
    <Card
      className={cn(
        'w-[280px] min-h-[180px] p-4 rounded-lg shadow-md bg-card text-card-foreground relative overflow-hidden transition-all',
        task.completed
          ? 'border-green-500'
          : 'border-zinc-700 hover:border-zinc-500',
      )}
    >
      {/* Botões editar / deletar */}
      <div className='absolute right-2 top-2 flex items-center gap-3 z-20'>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size='icon'
              variant='default'
              className='bg-green-600 hover:bg-green-700'
            >
              <Edit className='w-4 h-4' />
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Editar tarefa</DialogTitle>
              <DialogDescription>
                Edite as informações da sua tarefa.
              </DialogDescription>
            </DialogHeader>
            <div>Aqui será o formulário de edição</div>
          </DialogContent>
        </Dialog>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size='icon' variant='destructive'>
              <Trash className='w-4 h-4' />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Deseja excluir esta tarefa?</AlertDialogTitle>
              <AlertDialogDescription>
                Essa ação não poderá ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction className='bg-red-600 hover:bg-red-700 text-white'>
                Deletar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* Cabeçalho */}
      <CardHeader className='p-0'>
        <CardTitle>{task.title}</CardTitle>
        <CardDescription className='text-sm text-gray-400'>
          {task.description}
        </CardDescription>
      </CardHeader>

      {/* Carrossel de imagens */}
      <CardContent className='p-0 mt-3 flex justify-center'>
        <div className='relative w-full rounded-md overflow-hidden'>
          <Carousel className='w-full'>
            <CarouselContent>
              {imagesToUse.map((image, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <>
                <CarouselItem key={index} className='basis-full'>
                  <img
                    src={image}
                    alt={`Imagem ${index + 1} da tarefa ${task.title}`}
                    className='w-full h-[150px] object-cover rounded-md'
                    onError={() =>
                      console.warn('Erro ao carregar a imagem:', image)
                    }
                  />
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Setas de navegação */}
            <CarouselPrevious className='absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 rounded-full p-2 transition'>
              ‹
            </CarouselPrevious>
            <CarouselNext className='absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 rounded-full p-2 transition'>
              ›
            </CarouselNext>
          </Carousel>
        </div>
      </CardContent>

      {/* Rodapé */}
      <CardFooter className='p-0 mt-4'>
        <Toggle pressed={task.completed} className='flex items-center gap-2'>
          {task.completed ? (
            <>
              <CheckCircle className='text-green-500' /> Marcar como pendente
            </>
          ) : (
            <>
              <Circle className='text-gray-400' /> Marcar como concluída
            </>
          )}
        </Toggle>
      </CardFooter>
    </Card>
  );
}
