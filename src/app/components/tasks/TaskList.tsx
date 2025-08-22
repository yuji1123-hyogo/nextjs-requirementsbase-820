import React from "react";
import Task from "./Task";
import { Task as TaskType } from "@/app/types/tasks.type";

interface TaskLIstProps {
  tasks: TaskType[];
}

export default function TaskList({ tasks }: TaskLIstProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">タスクはありません</p>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
}
