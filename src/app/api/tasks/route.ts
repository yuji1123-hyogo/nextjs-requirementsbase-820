import { NextResponse } from "next/server";
import { tasks } from "../../mockDB/tasks";

// タスク一覧の取得
export async function GET() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return NextResponse.json({
      message: "タスク一覧を取得しました",
      success: true,
      data: tasks,
    });
  } catch {
    return NextResponse.json(
      {
        data: [],
        success: false,
        message: "タスクの取得に失敗しました",
      },
      { status: 500 }
    );
  }
}
