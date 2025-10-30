import { useQuery } from '@tanstack/react-query';
import { createContext, type ReactNode, useContext } from 'react';
import type { Task, TaskData } from '@/interfaces/interfaces';
import { getAllTasks } from '@/routes/get-all-tasks';
import { mapTask } from '@/utils/mappers';

// Tipagem do contexto
export interface ContextProps {
  tasks: Task[];
  isLoading: boolean;
  isError: boolean;
  refetchTaskData: () => void;
}

// Props do provider
export interface ContextProviderProps {
  children: ReactNode;
}

// Valores padrão (evita erro de undefined)
const defaultContext: ContextProps = {
  tasks: [],
  isLoading: false,
  isError: false,
  refetchTaskData: () => {},
};

// Criação do contexto
const StateContext = createContext<ContextProps>(defaultContext);

// Provider atualizado
export const TasksDataContextProvider = ({
  children,
}: ContextProviderProps) => {
  const { data, isLoading, isError, error, refetch } = useQuery<TaskData[]>({
    queryKey: ['tasksData'],
    queryFn: getAllTasks,
    staleTime: 60000,
    placeholderData: prev => prev,
    // 👈 mantém as tarefas enquanto recarrega
  });

  if (isError) {
    console.error('Erro ao buscar tarefas:', error);
  }

  const tasks = (data ?? []).map(mapTask);

  return (
    <StateContext.Provider
      value={{
        tasks,
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
