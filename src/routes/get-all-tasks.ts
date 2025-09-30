import { api } from "@/api/api";
import type { TaskData } from "@/interfaces/interfaces";

export async function getAllTasks() : Promise<TaskData> {
  const response = await api.get('./tasks')

  return response.data?? [];
}