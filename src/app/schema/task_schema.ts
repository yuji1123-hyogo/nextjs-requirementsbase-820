import z from "zod";

// タスクの基本スキーマ：詳細表示などに使用
export const TaskSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "タイトルは必須です"),
  description: z
    .string()
    .max(500, "最大500文字までで入力してください")
    .optional(),
  status: z.enum(["todo", "in_progress", "completed"]),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// タスクの作成用スキーマ
export const CreateTaskSchema = TaskSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// タスクの編集用スキーマ
export const UpdateTaskSchema = CreateTaskSchema.partial();
