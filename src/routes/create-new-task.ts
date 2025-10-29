import { api } from '@/api/api';
import type { CreateTaskPayload } from '@/interfaces/interfaces';

export async function createNewTask({ newTask }: CreateTaskPayload) {
  const response = await api.post('/tasks', newTask);
  return response.data;
}
