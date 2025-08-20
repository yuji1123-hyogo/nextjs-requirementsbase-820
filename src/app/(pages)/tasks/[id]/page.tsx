import TaskDetail from "@/app/components/tasks/TaskDetail";
import { notFound } from "next/navigation";

async function fetchTask(id: string): Promise<Task | null> {
  try {
    const response = await fetch(`http://localhost:3000/api/tasks${id}`, {
      cache: "no-store",
    });

    if (!response.ok) return null;
  } catch (error) {
    // not-foundを出したいため例外の伝播を止める
    console.error("タスク取得エラー", error);
    return null;
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    notFound();
  }

  const data = await response.json();

  if (!data.task) {
    notFound();
  }

  return (
    <>
      <TaskDetail task={data.task} />
    </>
  );
}
