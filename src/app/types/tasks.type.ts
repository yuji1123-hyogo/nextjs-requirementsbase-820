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
