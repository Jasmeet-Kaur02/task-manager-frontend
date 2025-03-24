import { ApiClient } from "./ApiClient";

const api = new ApiClient();

export const getTasks = async () => await api.get("tasks");
export const addTasks = async (body) => await api.post("tasks", body);

export const updateTasks = async (body) =>
  await api.put(`tasks/${body.taskId}`, body);

export const deleteTasks = async (body) => await api.delete("tasks", body);

export const getTaskById = async (taskId) => await api.get(`tasks/${taskId}`);
