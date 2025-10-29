import { api } from '@/api/api';
import type { UpdateTaskPayload } from '@/interfaces/interfaces';

export async function updateTask({ updatedTask }: UpdateTaskPayload) {
  const response = await api.put(`/tasks/${updatedTask.id}`, {
    title: updatedTask.title,
    description: updatedTask.description,
    images: updatedTask.images,
  });

  return response.data;
}
