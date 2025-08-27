"use client";
import { updateTaskAction } from "@/app/actions/task_actions";
import { Task } from "@/app/types/tasks.type";
import React, { useActionState } from "react";

export default function EditTaskForm({ task }: { task: Task }) {
  const [state, formAction, pending] = useActionState(updateTaskAction, {
    success: false,
    errors: {},
    message: "",
    data: {},
  });
  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">タスクを編集</h2>

      {state.message && (
        <p
          className={`mb-4 ${
            state.success ? "text-green-600" : "text-red-600"
          }`}
        >
          {state.message}
        </p>
      )}

      <form action={formAction} className="flex flex-col gap-4">
        <input type="hidden" name="id" value={task.id} />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            タイトル
          </label>
          <input
            type="text"
            name="title"
            defaultValue={task.title}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
          />
          {state.errors?.title && (
            <p className="text-red-500 text-sm mt-1">{state.errors.title[0]}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            説明
          </label>
          <textarea
            name="description"
            defaultValue={task.description}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
          />
          {state.errors?.description && (
            <p className="text-red-500 text-sm mt-1">
              {state.errors.description[0]}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ステータス
          </label>
          <select
            name="status"
            defaultValue={task.status}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="todo">未着手</option>
            <option value="in_progress">進行中</option>
            <option value="completed">完了</option>
          </select>
          {state.errors?.status && (
            <p className="text-red-500 text-sm mt-1">
              {state.errors.status[0]}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={pending}
          className={`w-full py-2 px-4 rounded-lg text-white font-semibold transition ${
            pending
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {pending ? "更新中..." : "更新"}
        </button>
      </form>
    </div>
  );
}
