import TaskDetail from "@/app/components/tasks/TaskDetail";
import { ApiResponse, Task, TaskStatus } from "@/app/types/tasks.type";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function fetchTask(id: string): Promise<Task | null> {
  try {
    const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) return null;

    const result: ApiResponse<Task> = await response.json();
    if (!result.success) return null;
    console.log(`☑☑fetchTask result`, result);
    return result.data || null;
  } catch (error) {
    console.error("タスク得エラー", error);
    return null;
  }
}

async function updateTaskStatus(
  taskId: string,
  newStatus: TaskStatus
): Promise<void> {
  "use server";
  const response = await fetch(
    `http://localhost:3000/api/tasks/${taskId}/status`,
    {
      method: "PUT",
      body: JSON.stringify({ status: newStatus }),
    }
  );

  if (!response.ok) {
    throw new Error("ステータスの更新に失敗しました");
  }

  const result: ApiResponse<Task> = await response.json();

  if (!result.success) {
    throw new Error("ステータスの更新に失敗しました");
  }

  revalidatePath("/tasks");
  revalidatePath(`/tasks/${taskId}`);
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const task = await fetchTask(id);
  if (!task) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/tasks"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          ← タスク一覧に戻る
        </Link>
      </div>
      <TaskDetail
        task={task}
        onStatusUpdate={updateTaskStatus.bind(null, id)}
      />
    </div>
  );
}
