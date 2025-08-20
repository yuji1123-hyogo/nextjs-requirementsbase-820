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
