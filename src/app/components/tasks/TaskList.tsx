import React from "react";
import Task from "./Task";
import { Task as TaskType } from "@/app/types/tasks.type";

export default function TaskList({ tasks }: { tasks: TaskType[] }) {
  return (
    <div>
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
}
