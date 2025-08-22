// src/app/test/TaskList.test.tsx
import { render, screen } from "@testing-library/react";
import { Task } from "@/app/types/tasks.type";
import TaskList from "../components/tasks/TaskList";

const mockTasks: Task[] = [
  {
    id: "1",
    title: "タスク1",
    description: "説明1",
    status: "todo",
    createdAt: "2025-08-20T09:15:30.000Z",
    updatedAt: "2025-08-20T09:15:30.000Z",
  },
  {
    id: "2",
    title: "タスク2",
    description: "説明2",
    status: "completed",
    createdAt: "2025-08-20T09:15:30.000Z",
    updatedAt: "2025-08-20T09:15:30.000Z",
  },
];

describe("TaskList コンポーネント", () => {
  it("タスクリストが正しく表示される", () => {
    render(<TaskList tasks={mockTasks} />);

    expect(screen.getByText("タスク1")).toBeInTheDocument();
    expect(screen.getByText("タスク2")).toBeInTheDocument();
  });

  it("空のタスクリストの場合、適切なメッセージが表示される", () => {
    render(<TaskList tasks={[]} />);

    expect(screen.getByText("タスクはありません")).toBeInTheDocument();
  });

  it("各タスクに詳細リンクが存在する", () => {
    render(<TaskList tasks={mockTasks} />);

    const detailLinks = screen.getAllByText("詳細を見る");
    expect(detailLinks).toHaveLength(2);

    expect(detailLinks[0]).toHaveAttribute("href", "/tasks/1");
    expect(detailLinks[1]).toHaveAttribute("href", "/tasks/2");
  });
});
