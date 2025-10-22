import { useTasksContext } from '@/contexts/tasks-context';
import { Header } from './components/ui/header';
import { PageContainer } from './components/ui/page-container';
import { PageContent } from './components/ui/page-content';
import { TaskCard } from './components/ui/task-card';

export function App() {
  const { tasks } = useTasksContext(); // ✅ Pegando as tarefas do contexto

  return (
    <PageContainer>
      <PageContent>
        <Header />
        {tasks.length === 0 ? (
          <p className='text-center text-gray-500 mt-8'>
            Nenhuma tarefa criada ainda.
          </p>
        ) : (
          tasks.map(task => <TaskCard key={task.id} task={task} />)
        )}
      </PageContent>
    </PageContainer>
  );
}
