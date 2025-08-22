"use client";

import { Task, TaskStatus } from "@/app/types/tasks.type";
import React, { useState } from "react";
import { getStatusConfig } from "./Task";

interface TaskDetailProps {
  task: Task;
  onStatusUpdate: (newStatus: TaskStatus) => Promise<void>;
}
export default function TaskDetail({ task, onStatusUpdate }: TaskDetailProps) {
  const statusConfig = getStatusConfig(task.status);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStatusChange = async (newStatus: TaskStatus) => {
    if (newStatus === task.status) return;

    setIsUpdating(true);
    setError(null);

    try {
      await onStatusUpdate(newStatus);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "ステータスの更新に失敗しました"
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const statusOptions: { value: TaskStatus; label: string }[] = [
    { value: "todo", label: "未着手" },
    { value: "in_progress", label: "進行中" },
    { value: "completed", label: "完了" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{task.title}</h1>
        <div className="flex items-center gap-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${statusConfig.className}`}
          >
            {statusConfig.label}
          </span>
          {isUpdating && (
            <span className="text-xs text-blue-600 animate-pulse">
              更新中...
            </span>
          )}
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">説明</h2>
        <p className="text-gray-700 leading-relaxed">{task.description}</p>
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          ステータス変更
        </h2>
        <select
          value={task.status}
          className="block w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled::opacity-50"
          onChange={(e) => handleStatusChange(e.target.value as TaskStatus)}
          disabled={isUpdating}
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
      <div className="text-sm text-gray-500 space-y-1">
        <p>作成日: {new Date(task.createdAt).toLocaleDateString()}</p>
        <p>更新日: {new Date(task.updatedAt).toLocaleDateString()}</p>
        <p>タスクID:{task.id}</p>
      </div>
    </div>
  );
}
