import TaskList from "@/app/components/tasks/TaskList";
import { ApiResponse, Task } from "@/app/types/tasks.type";

async function fetchTasks(): Promise<Task[]> {
  try {
    const response = await fetch(`http://localhost:3000/api/tasks`, {
      cache: "no-store",
    });

    console.log("📶📶📶response", response);

    if (!response.ok) {
      throw new Error("タスクの取得に失敗しました");
    }

    const result: ApiResponse<Task[]> = await response.json();

    console.log("📶📶📶result", result);
    if (!result.success) {
      throw new Error("タスクの取得に失敗しました");
    }

    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default async function Page() {
  const tasks = await fetchTasks();
  console.log("📝📝📝fetch-tasks", tasks);
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">タスク一覧</h1>
        <p className="text-gray-600">{tasks.length}件のタスクがあります</p>
      </div>

      <TaskList tasks={tasks} />
    </div>
  );
}
