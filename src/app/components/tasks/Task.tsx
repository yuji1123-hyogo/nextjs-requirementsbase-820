import { Task as TaskType } from "@/app/types/tasks.type";
import React from "react";

export default function Task({ task }: { task: TaskType }) {
  return (
    <div>
      <div>
        <h2>{task.title}</h2>
        <p>{task.status}</p>
      </div>
      <div>{task.description}</div>
    </div>
  );
}
