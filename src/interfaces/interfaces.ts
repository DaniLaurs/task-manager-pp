import type { ReactNode } from 'react';

export interface PageContainerProps {
  children: ReactNode;
}

export interface PageContentProps {
  children: ReactNode;
}

export interface Task {
  _id: string;
  id: string;
  title: string;
  description: string;
  completed: boolean;
  images : [string];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface TaskData {
  tasks: Array<Task>
}

export interface ContextProps {
  isLoading?: boolean;
  isError?: boolean;
  data?: TaskData;
  refetchTaskData?: () => void;

}

export interface ContextProviderProps {
  children: ReactNode;
}


