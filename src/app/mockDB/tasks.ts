import { Task } from "@/app/types/tasks.type";

// モックデータベース
export const tasks: Task[] = [
  {
    id: "1",
    title: "Next.jsコーディング",
    description: "",
    status: "in_progress",
    createdAt: "2025-08-20T09:15:30.000Z",
    updatedAt: "2025-08-20T09:15:30.000Z",
  },
  {
    id: "2",
    title: "Railsコーディング",
    status: "completed",
    description: "",
    createdAt: "2025-08-20T09:15:30.000Z",
    updatedAt: "2025-08-20T09:15:30.000Z",
  },
  {
    id: "3",
    title: "Docker学習",
    status: "todo",
    description: "",
    createdAt: "2025-08-20T09:15:30.000Z",
    updatedAt: "2025-08-20T09:15:30.000Z",
  },
  {
    id: "4",
    title: "技術面接対策",
    status: "todo",
    description: "",
    createdAt: "2025-08-20T09:15:30.000Z",
    updatedAt: "2025-08-20T09:15:30.000Z",
  },
];
