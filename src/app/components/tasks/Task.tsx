import { TaskStatus, Task as TaskType } from "@/app/types/tasks.type";
import Link from "next/link";
import React from "react";

export const getStatusConfig = (status: TaskStatus) => {
  const configs = {
    todo: {
      label: "未着手",
      className: "bg-gray-100 text-gray-800 border border-gray-300",
    },
    in_progress: {
      label: "進行中",
      className: "bg-blue-100 text-blue-800 border border-blue-300",
    },
    completed: {
      label: "完了",
      className: "bg-green-100 text-green-800 border border-green-300",
    },
  };
  return configs[status];
};

interface TaskProps {
  task: TaskType;
}

export default function Task({ task }: TaskProps) {
  const statusConfig = getStatusConfig(task.status);
  return (
    <div className="border corder-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {task.title}
          </h3>
          <p className="text-gray-600 mb-3 line-clamp-2">{task.description}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>作成日:{new Date(task.createdAt).toLocaleDateString()}</span>
            <span>更新日:{new Date(task.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="ml-4 flex flex-col items-end gap-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig.className}`}
          >
            {statusConfig.label}
          </span>
          <Link
            href={`/tasks/${task.id}`}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            詳細を見る
          </Link>
        </div>
      </div>
    </div>
  );
}
