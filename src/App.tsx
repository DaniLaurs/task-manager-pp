import { X } from 'lucide-react';
import { useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useTasksContext } from '@/contexts/tasks-context';
import { ErrorPage } from '@/pages/error.page';
import { Loading } from '@/pages/loading';
import { Header } from './components/ui/header';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { PageContainer } from './components/ui/page-container';
import { PageContent } from './components/ui/page-content';
import { TaskCard } from './components/ui/task-card';

export function App() {
  const { tasks: contextTasks, isLoading, isError } = useTasksContext();
  const [search, setSearch] = useState('');

  // ✅ Filtragem segura
  const filteredTasks = (!isLoading ? contextTasks : []).filter(task => {
    const searchLower = search.toLowerCase().trim();
    if (!searchLower) return true;
    const title = String(task.title ?? '').toLowerCase();
    const description = String(task.description ?? '').toLowerCase();
    return title.includes(searchLower) || description.includes(searchLower);
  });

  // ✅ Separar tarefas pendentes e concluídas
  const tasksPending = filteredTasks.filter(task => !task.completed);
  const tasksCompleted = filteredTasks.filter(task => task.completed);

  if (isLoading) return <Loading />;
  if (isError) return <ErrorPage />;

  return (
    <TooltipProvider>
      <PageContainer>
        <PageContent>
          <Header />

          {/* 🔎 Campo de pesquisa */}
          <div className='w-full flex items-center gap-3 my-5'>
            <Label htmlFor='search-input'>Pesquisar</Label>

            {/** biome-ignore lint/correctness/useUniqueElementIds: <> */}
            <Input
              id='search-input'
              value={search}
              onChange={e => setSearch(e.target.value)}
              className='max-w-[400px]'
              placeholder='Digite o nome da tarefa...'
            />

            {search && (
              <Tooltip>
                <TooltipTrigger>
                  <X
                    className='cursor-pointer opacity-50'
                    onClick={() => setSearch('')}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Limpar</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>

          {/* 📋 Lista de tarefas */}
          <div className='flex flex-col gap-6 mt-5'>
            {/* 🟡 TAREFAS PENDENTES */}
            {tasksPending.length > 0 && (
              <>
                <div className='flex items-center gap-3'>
                  <h2 className='text-xl font-semibol  text-red-500 whitespace-nowrap bg-transparent'>
                    Pendentes
                  </h2>
                  <div className='flex-1 h-px bg-red-950' />
                </div>

                <div className='grid grid-cols-3 gap-4'>
                  {tasksPending.map(task => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              </>
            )}

            {/* 🟢 TAREFAS CONCLUÍDAS */}
            {tasksCompleted.length > 0 && (
              <>
                <div className='flex items-center gap-3 mt-5'>
                  <h2 className='text-xl font-semibold text-green-500 whitespace-nowrap'>
                    Concluídas
                  </h2>
                  <div className='flex-1 h-px bg-green-500/30' />
                </div>

                <div className='grid grid-cols-3 gap-4'>
                  {tasksCompleted.map(task => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              </>
            )}

            {/* ⚪ Nenhuma tarefa */}
            {tasksPending.length === 0 && tasksCompleted.length === 0 && (
              <p className='text-gray-400 text-center mt-10'>
                Nenhuma tarefa encontrada.
              </p>
            )}
          </div>

          {/* 📝 Mensagem inicial se não existir nenhuma tarefa */}
          {contextTasks.length < 1 && (
            <h2 className='text-lg font-semibold text-center mt-20'>
              Você ainda não criou nenhuma tarefa. Aproveite para criar a
              primeira agora mesmo!
            </h2>
          )}
        </PageContent>
      </PageContainer>
    </TooltipProvider>
  );
}
