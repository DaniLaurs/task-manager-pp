import { TooltipProvider } from '@radix-ui/react-tooltip';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import logo from '../../assets/tasks.png';
import { Button } from '../ui/button';
import { CreateTaskForm } from './create-task-form';
import { ModeToggle } from './mode-toggle';

export function Header() {
  return (
    <header className='w-full flex justify-center items-center h-16'>
      <div className='w-full h-full max-w-screen-lg flex items-center justify-between'>
        {/* Logo e título */}
        <div className='flex items-center'>
          <img className='w-16 h-16' src={logo} alt='Logotipo Task Manager' />
          <h1 className='font-semibold text-2xl'>Task Manager</h1>
        </div>

        {/* TooltipProvider */}
        <TooltipProvider>
          <div className='flex items-center gap-4'>
            <Tooltip>
              <Dialog>
                <TooltipTrigger asChild>
                  <DialogTrigger asChild>
                    <Button
                      size='icon'
                      className='rounded-full bg-green-500 hover:bg-green-600 transition-all duration-200'
                    >
                      <Plus className='text-white' />
                    </Button>
                  </DialogTrigger>
                </TooltipTrigger>

                <TooltipContent className='text-white'>
                  <p>Adicionar nova tarefa</p>
                </TooltipContent>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Criar</DialogTitle>
                    <DialogDescription>Criar nova tarefa.</DialogDescription>
                  </DialogHeader>
                  <div className='grid gap-4 py-4'>
                    <CreateTaskForm />
                  </div>
                </DialogContent>
              </Dialog>
            </Tooltip>
          </div>
        </TooltipProvider>

        {/* Toggle de modo */}
        <ModeToggle />
      </div>
    </header>
  );
}
