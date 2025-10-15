import { CheckCircle, Circle, Edit, Trash } from 'lucide-react';
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
import { Button } from './ui/button';
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cn } from "@/lib/utils"

type TaskCardProps = {
  task: Task;
};

export function TaskCard({ task }: TaskCardProps) {
  console.log('TaskCard: task object:', task);
  console.log('TaskCard: images prop:', task.images);

  const fallbackImages = [
    'https://media.istockphoto.com/id/520700958/pt/foto/bonito-flores-de-fundo.jpg?s=612x612&w=0&k=20&c=u34VaLeCyQhHs6nM3BQnOFxFRc-Kd3YCA6DEitRmcdQ=',
    'https://media.istockphoto.com/id/474058580/pt/foto/bonito-abstrato-fundo-colorido-com-flores-e-tons-suaves-e-t%C3%BAlipas.jpg?s=612x612&w=0&k=20&c=EODt-E4rW3H0oedyMdLe9TljtV6Y4fK0KrASqAd-vng=',
    'https://wallpapers.com/images/hd/color-pictures-0n8ffp8kxxvr3kh8.jpg',
    'https://img.freepik.com/fotos-gratis/um-design-colorido-com-um-design-em-espiral_188544-9588.jpg',
    'https://static.vecteezy.com/ti/fotos-gratis/t2/22154540-explosao-do-colori-po-abstrato-colori-fundo-multicolorido-respingo-do-particulas-festival-do-cores-po-rebentar-explodindo-e-espirrando-po-piedosos-festival-foto.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtJcb9uSF2TUgtiTgFmJTJ_JAVG0XZd5Y95A&s',
  ];

  const imagesToUse =
    Array.isArray(task.images) && task.images.length > 0
      ? task.images
      : fallbackImages;

      const toggleVariants = cva(
        "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors hover:bg-muted hover:bg-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-fo [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        {
          variants: {
            variant: {
              default: "bg-transparent",
              outline:
                "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
            },
            size: {
              default: "h-9 px-2 min-w-9",
              sm: "h-8 px-1.5 min-w-8",
              lg: "h-10 px-2.5 min-w-10",
            },
          },
          defaultVariants: {
            variant: "default",
            size: "default",
          },
        }
      )
      
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
      ))
      
      Toggle.displayName = TogglePrimitive.Root.displayName
      

      
  return (
    <Card
      className={`w-[280px] min-h-[180px] p-4 rounded-lg shadow-md bg-card text-card-foreground ${
        task.completed ? 'border-primary' : 'border'
      } relative`}
    >
      {/* Botões editar / deletar */}
      <div className='absolute right-2 top-2 flex items-center gap-3 z-20'>
        <Dialog>
          <DialogTrigger asChild>
            <Button size='icon' variant='ghost'>
              <Edit />
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Editar</DialogTitle>
              <DialogDescription>
                Edite as informações da sua tarefa.
              </DialogDescription>
            </DialogHeader>
            <div>Aqui será o formulário</div>
          </DialogContent>
        </Dialog>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size='icon' variant='ghost'>
              <Trash />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Tem certeza que deseja deletar essa tarefa?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Essa ação não poderá ser desfeita futuramente.
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
        <CardDescription className='text-sm'>
          {task.description}
        </CardDescription>
      </CardHeader>

      {/* Conteúdo (Carrossel ou fallback) */}
      <CardContent className='p-0 mt-2 flex justify-center overflow-hidden'>
        <div className='relative w-full'>
          <Carousel className='w-full'>
            <CarouselContent>
              {imagesToUse.map(image => {
                console.log('Rendering carousel image:', image);
                return (
                  <CarouselItem
                    key={image} // usar a URL da imagem como chave — presumindo que seja única
                    className='basis-full' /* define que cada slide ocupa toda a largura */
                  >
                    <img
                      src={image}
                      alt={`Imagem da tarefa: ${task.title}`}
                      className='w-full h-[150px] object-cover rounded'
                      onError={() =>
                        console.warn('Erro ao carregar a imagem:', image)
                      }
                    />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className='absolute left-2 top-1/2 -translate-y-1/2 z-10' />
            <CarouselNext className='absolute right-2 top-1/2 -translate-y-1/2 z-10' />
          </Carousel>
        </div>
      </CardContent>

      {/* Rodapé */}
      <CardFooter className='p-0 mt-4 '>
        <Toggle pressed={task.completed}>
          {task.completed ?  <CheckCircle /> : <Circle/> }
          {task.completed ? 'Marcar como pendente' : 'Marcar como concluída'}
          </Toggle>
      </CardFooter>
    </Card>
  );
}
