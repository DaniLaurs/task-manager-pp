import { api } from '@/api/api';
import type { TaskData } from '@/interfaces/interfaces';

export async function getAllTasks(): Promise<TaskData[]> {
  const response = await api.get('/tasks');

  // Se vier { tasks: [...] }, retorna o array correto
  const data = response.data?.tasks ?? response.data;

  return Array.isArray(data) ? data : [];
}
