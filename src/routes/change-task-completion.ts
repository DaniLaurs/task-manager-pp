import { api } from '@/api/api';
import type { ChangeTaskCompletion } from '@/interfaces/interfaces';

export async function changeTaskCompletion({ taskId }: ChangeTaskCompletion) {
  const response = await api.put(`/tasks/change-task-completion/${taskId}`);

  return response.data;
}
