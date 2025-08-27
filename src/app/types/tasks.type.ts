import z from "zod";
import { CreateTaskSchema, UpdateTaskSchema } from "../schema/task_schema";

export type TaskStatus = "todo" | "in_progress" | "completed";

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
};

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export type TaskUpdateRequest = {
  status: TaskStatus;
};

export type TaskActionResult =
  | { success: true; data: Task }
  | { success: false; error: string };

export type TaskFormData = {
  title: string;
  description: string;
  status: TaskStatus;
};

export type ValidationErrors = {
  title?: string;
  description?: string;
  status?: string;
};

type CreateTask = z.infer<typeof CreateTaskSchema>;
type UpdateTask = z.infer<typeof UpdateTaskSchema>;

export type TaskFormState = {
  success: boolean;
  errors?: ValidationErrors;
  data?: CreateTask | UpdateTask;
  message?: string;
};
