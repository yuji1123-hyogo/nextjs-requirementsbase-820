import UpdateTaskForm from "@/app/components/tasks/UpdateTaskForm";
import { fetchTask } from "../page";
import { notFound } from "next/navigation";

export default async function UpdateTaskPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const task = await fetchTask(id);
  if (!task) {
    notFound();
  }
  return <UpdateTaskForm task={task} />;
}
