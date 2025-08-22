import { render, screen } from "@testing-library/react";
import { Task } from "@/app/types/tasks.type";
import TaskDetail from "../components/tasks/TaskDetail";

const mockTask: Task = {
  id: "1",
  title: "サンプルタスク",
  description: "説明文",
  status: "todo",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

describe("TaskDetail", () => {
  it("タイトルが表示される", () => {
    render(<TaskDetail task={mockTask} onStatusUpdate={jest.fn()} />);
    expect(screen.getByText("サンプルタスク")).toBeInTheDocument();
  });
});
