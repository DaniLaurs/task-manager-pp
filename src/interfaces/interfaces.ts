import type { ReactNode } from 'react';

// Componentes de layout
export interface PageContainerProps {
  children: ReactNode;
}
export interface PageContentProps {
  children: ReactNode;
}

// Estrutura da tarefa
export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

// Estrutura recebida do backend (strings para datas)
export interface TaskData {
  id: any;
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  images: string[];
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

// Contextos
export interface ContextProps {
  data: TaskData[];
  isLoading: boolean;
  isError: boolean;
  refetchTaskData: () => void;
}

export interface ContextProviderProps {
  children: ReactNode;
}

// Card de tarefa
export interface TaskCardProps {
  task: Task;
}

// ✏️ Dados para criar tarefa
export interface NewTaskProps {
  title: string;
  description: string;
  images: string[];
}

// 🧩 Props do formulário de criação
export interface CreateTaskFormProps {
  task?: NewTaskProps; // opcional (modo edição)
  onClose: () => void; // usado no componente
}

// 📡 Payload enviado à API na criação
export interface CreateTaskPayload {
  newTask: NewTaskProps;
}

// 🔁 Dados para update
export interface UpdateTask {
  id: string;
  title: string;
  description: string;
  images: string[];
}

// 🧩 Props do formulário de edição
export interface UpdateTaskFormProps {
  task: UpdateTask;
  onClose: () => void;
}

// 📡 Payload enviado à API no update
export interface UpdateTaskProps {
  updatedTask: UpdateTask;
}

// Payload enviado para a API de update
export interface UpdateTaskPayload {
  updatedTask: UpdateTask;
}

export interface DeleteTaskProps {
  taskId: string;
}
export interface ChangeTaskCompletion {
  taskId: string;
}
