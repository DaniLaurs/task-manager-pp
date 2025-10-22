import type { ReactNode } from 'react';

export interface PageContainerProps {
  children: ReactNode;
}

export interface PageContentProps {
  children: ReactNode;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  images :string[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface TaskData {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  images: string[];
  createdAt: string; // normalmente string quando vem do backend
  updatedAt: string;
  __v?: number;
}



export interface ContextProps {
  data: TaskData[];
  isLoading: boolean;
  isError: boolean;
  refetchTaskData: () => void;
}


export interface ContextProviderProps {
  children: ReactNode;
}


export interface TaskCardProps {
  task: Task;
}

export interface NewTaskProps {
  title: string;
  description: string;
  images: Array<string>;

}

export interface CreateNewTaskProps {
  task: NewTaskProps;
}
      