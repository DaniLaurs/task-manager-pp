import type { Task } from '@/interfaces/interfaces'; // <- sua interface com id
import { Header } from './components/header';
import { PageContainer } from './components/page-container';
import { PageContent } from './components/page-content';
import { TaskCard } from './components/task-card';

// Função para mapear _id para id
function mapTask(taskFromDb: any): Task {
  return {
    id: taskFromDb._id,
    title: taskFromDb.title,
    description: taskFromDb.description,
    completed: taskFromDb.completed,
    images: taskFromDb.images,
    createdAt: taskFromDb.createdAt,
    updatedAt: taskFromDb.updatedAt,
    __v: taskFromDb.__v ?? 0,
  };
}

export function App() {
  // Simulação de dados do banco
  const dataFromDb = [
    {
      _id: '1',
      title: 'titulo da minha tarefa',
      description: 'Descrição da tarefa 1',
      completed: false,
      images: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  // Convertendo para o formato correto
  const tasks: Task[] = dataFromDb.map(mapTask);

  return (
    <PageContainer>
      <PageContent>
        <Header />
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </PageContent>
    </PageContainer>
  );
}
