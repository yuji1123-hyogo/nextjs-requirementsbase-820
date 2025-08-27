import { NextRequest, NextResponse } from "next/server";
import { tasks } from "../../../mockDB/tasks";

// タスク詳細取得
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const task = tasks.find((t) => t.id === id);
  if (!task) {
    return NextResponse.json(
      { message: "タスクが見つかりません", success: false },
      { status: 404 }
    );
  }
  const response = NextResponse.json({
    message: "タスクを取得しました",
    success: true,
    data: task,
  });
  return response;
}

export async function PUT(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const { id } = await params;
    const { data: formInput } = await req.json();

    const updateTargetIndex = tasks.findIndex((t) => t.id === id);
    if (updateTargetIndex == -1) {
      return NextResponse.json({
        message: "タスクが存在しません",
        success: false,
      });
    }

    const updatedTask = {
      ...tasks[updateTargetIndex],
      ...formInput,
      updatedAt: new Date().toISOString(),
    };
    tasks[updateTargetIndex] = updatedTask;

    await new Promise((resolve) => setTimeout(resolve, 300));

    return NextResponse.json(
      {
        message: "タスクの更新に成功しました",
        success: true,
        data: updatedTask,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("タスク更新エラー:", error);
    return NextResponse.json(
      {
        data: null,
        success: false,
        message: "タスクの更新に失敗しました",
      },
      { status: 500 }
    );
  }
}
