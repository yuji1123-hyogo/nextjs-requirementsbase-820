import { tasks } from "@/app/mockDB/tasks";
import { Task, TaskUpdateRequest } from "@/app/types/tasks.type";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body: TaskUpdateRequest = await request.json();

    if (!["todo", "in_progress", "completed"].includes(body.status)) {
      return NextResponse.json(
        {
          data: {} as Task,
          success: false,
          message: "無効なステータスです",
        },
        { status: 400 }
      );
    }

    const task = tasks.find((task) => task.id === id);
    if (!task) {
      return NextResponse.json(
        {
          data: {} as Task,
          success: false,
          message: "タスクが見つかりません",
        },
        { status: 404 }
      );
    }

    const updatedTask: Task = {
      ...task,
      status: body.status,
      updatedAt: new Date().toISOString(),
    };

    const index = tasks.findIndex((t) => t.id === id);
    if (index !== -1) {
      tasks[index] = updatedTask;
    }

    await new Promise((resolve) => setTimeout(resolve, 300));

    return NextResponse.json({
      data: updatedTask,
      success: true,
      message: "ステータスを更新しました",
    });
  } catch {
    return NextResponse.json(
      {
        data: {} as Task,
        success: false,
        message: "ステータスの更新に失敗しました",
      },
      { status: 500 }
    );
  }
}
