import { Task } from "@/app/types/tasks.type";
import React from "react";

export default function TaskDetail({ task }: { task: Task }) {
  return <div>{task.title}</div>;
}
