import type { ContextProps, ContextProviderProps } from "@/interfaces/interfaces";
import { getAllTasks } from "@/routes/get-all-tasks";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";


const StateContext = createContext<ContextProps>({})

export const TasksDataContextProvider = ({
  children
 } : ContextProviderProps) => {
   const {  data, isLoading, isError, error, refetch} = useQuery({
      queryKey: ['tasksData'],
      queryFn: getAllTasks,
      staleTime: 60000

   });

   if (isLoading) {
    return <div>carregando..</div>;
   }

   if (isError) {
    console.error(error);
    return <div>Deu erro...</div>
   }

   if (!data) {
    return;
   }

   return (
    <StateContext.Provider value={{
      data,
      isLoading,
      isError,
      refetchTaskData: refetch
    }}>

      {children}
    </StateContext.Provider>

   )

 }

 export const useTasksContext = () => useContext(StateContext);

 