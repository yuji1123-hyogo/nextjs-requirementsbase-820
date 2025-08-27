"use server";
import { ZodSchema } from "zod";
import { TaskFormState } from "../types/tasks.type";
import { CreateTaskSchema, UpdateTaskSchema } from "../schema/task_schema";
import { revalidatePath } from "next/cache";

function validateSchema<T>(
  schema: ZodSchema<T>,
  data: unknown
):
  | { success: true; data: T }
  | { success: false; error: Record<string, string[] | undefined> } {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  } else {
    const errorResult = result.error.flatten().fieldErrors;
    return { success: false, error: errorResult };
  }
}

export async function createTaskAction(
  prevState: TaskFormState,
  formData: FormData
): Promise<TaskFormState> {
  const input = {
    title: formData.get("title"),
    description: formData.get("description"),
    status: formData.get("status"),
  };
  const validationResult = validateSchema(CreateTaskSchema, input);

  if (!validationResult.success) {
    return {
      success: false,
      errors: validationResult.error,
      message: "バリデーションエラー",
    };
  }

  try {
    const res = await fetch("http://localhost:3000/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: validationResult.data }),
    });

    if (!res.ok) {
      return {
        success: false,
        errors: {},
        message: "API呼び出しに失敗しました",
      };
    }

    revalidatePath("/tasks");
    return {
      success: true,
      data: validationResult.data,
      message: "タスクの作成に成功しました",
    };
  } catch {
    return {
      success: false,
      errors: {},
      message: "タスクの作成に失敗しました",
    };
  }
}

export async function updateTaskAction(
  prevState: TaskFormState,
  formData: FormData
): Promise<TaskFormState> {
  const id = formData.get("id") as string; // hidden から取得

  const formInput = {
    title: formData.get("title"),
    description: formData.get("description"),
    status: formData.get("status"),
  };

  const validationResult = validateSchema(UpdateTaskSchema, formInput);

  if (!validationResult.success) {
    return {
      success: false,
      errors: validationResult.error,
      message: "バリデーションエラー",
    };
  }

  try {
    const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: validationResult.data }),
    });
    if (!res.ok) {
      return {
        success: false,
        errors: {},
        message: "タスクの更新に失敗しました",
      };
    }

    revalidatePath("/tasks");
    revalidatePath(`/tasks/${id}`);
    return {
      success: true,
      data: validationResult.data,
      message: "タスクの更新に成功しました",
    };
  } catch {
    return {
      success: false,
      errors: {},
      message: "タスクの更新に失敗しました",
    };
  }
}
