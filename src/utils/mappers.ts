import type { Task, TaskData } from '@/interfaces/interfaces';

export function mapTask(task: TaskData): Task {
  return {
    id: task._id,
    title: task.title,
    description: task.description,
    completed: task.completed,
    images: task.images,
    createdAt: new Date(task.createdAt),
    updatedAt: new Date(task.updatedAt),
    __v: task.__v ?? 0,
  };
}
