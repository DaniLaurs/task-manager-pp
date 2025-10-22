import { useQuery } from '@tanstack/react-query';
import { createContext, type ReactNode, useContext } from 'react';
import type { Task, TaskData } from '@/interfaces/interfaces';
import { ErrorPage } from '@/pages/error.page';
import { Loading } from '@/pages/loading';
import { getAllTasks } from '@/routes/get-all-tasks';
import { mapTask } from '@/utils/mappers'; // você pode criar esse arquivo se ainda não existir

// Tipagem do contexto
export interface ContextProps {
  tasks: Task[];           // mudou de 'data' para 'tasks'
  isLoading: boolean;
  isError: boolean;
  refetchTaskData: () => void;
}

// Props do provider
export interface ContextProviderProps {
  children: ReactNode;
}

// Valores padrão (não é usado ativamente, mas evita erro de undefined)
const defaultContext: ContextProps = {
  tasks: [],
  isLoading: false,
  isError: false,
  refetchTaskData: () => {},
};

// Criação do contexto
const StateContext = createContext<ContextProps>(defaultContext);

// Provider
export const TasksDataContextProvider = ({ children }: ContextProviderProps) => {
  const { data, isLoading, isError, error, refetch } = useQuery<TaskData[]>({
    queryKey: ['tasksData'],
    queryFn: getAllTasks,
    staleTime: 60000,
  });

  if (isLoading) return <Loading />;
  if (isError) {
    console.error(error);
    return <ErrorPage />;
  }

  // Mapeia os dados de TaskData para Task
  const tasks = (data ?? []).map(mapTask);

  return (
    <StateContext.Provider
      value={{
        tasks,           // renomeado aqui para tasks
        isLoading,
        isError,
        refetchTaskData: refetch,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

// Hook para usar o contexto
export const useTasksContext = () => useContext(StateContext);
