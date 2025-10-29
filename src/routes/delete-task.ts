import { api } from '@/api/api';
import type { DeleteTaskProps } from '@/interfaces/interfaces';

export async function deleteTask({ taskId }: DeleteTaskProps) {
  const response = await api.delete(`/tasks/${taskId}`)

  return response.data;
}
