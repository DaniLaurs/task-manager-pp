import { api } from '@/api/api';
import type { CreateNewTaskProps } from '@/interfaces/interfaces';

export async function createNewTask({ task }: CreateNewTaskProps) {
  const response = await api.post('tasks', { ...task });

  return response.data;
}
