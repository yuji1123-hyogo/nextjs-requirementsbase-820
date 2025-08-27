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

// タスクの作成
export async function POST(req: Request) {
  const formInput = await req.json();
  const newTask = {
    ...formInput,
    id: Date.now(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  try {
    tasks.push(newTask);
    return NextResponse.json(
      {
        message: "タスクの作成に成功しました",
        success: true,
        data: newTask,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      {
        data: [],
        success: false,
        message: "タスクの作成に失敗しました",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const { id } = await params;
  const formInput = await req.json();

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

  return NextResponse.json(
    {
      message: "タスクの更新に成功しました",
      success: true,
      data: updatedTask,
    },
    { status: 200 }
  );
}
