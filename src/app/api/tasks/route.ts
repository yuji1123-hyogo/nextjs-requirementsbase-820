import { NextResponse } from "next/server";
import { tasks } from "../../mockDB/tasks";
import { Task } from "@/app/types/tasks.type";

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

export async function POST(req: Request) {
  try {
    const { data: formInput } = await req.json();

    const newTask: Task = {
      ...formInput,
      id: String(Date.now()),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    tasks.push(newTask);

    return NextResponse.json(
      {
        message: "タスクの作成に成功しました",
        success: true,
        data: newTask,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("タスク作成エラー", error);
    return NextResponse.json(
      {
        data: null,
        success: false,
        message: "タスクの作成に失敗しました",
      },
      { status: 500 }
    );
  }
}
