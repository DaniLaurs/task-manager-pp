import { useQuery } from '@tanstack/react-query';
import { createContext, useContext } from 'react';
import type {
  ContextProps,
  ContextProviderProps,
} from '@/interfaces/interfaces';
import { ErrorPage } from '@/pages/error.page';
import { Loading } from '@/pages/loading';
import { getAllTasks } from '@/routes/get-all-tasks';

const StateContext = createContext<ContextProps>({});

export const TasksDataContextProvider = ({
  children,
}: ContextProviderProps) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['tasksData'],
    queryFn: getAllTasks,
    staleTime: 60000,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    console.error(error);
    return <ErrorPage />;
  }

  if (!data) {
    return;
  }

  return (
    <StateContext.Provider
      value={{
        data,
        isLoading,
        isError,
        refetchTaskData: refetch,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useTasksContext = () => useContext(StateContext);
