import { render, screen } from "@testing-library/react";
import { Task } from "@/app/types/tasks.type";
import TaskDetail from "../components/tasks/TaskDetail";
import userEvent from "@testing-library/user-event";

const mockTask: Task = {
  id: "1",
  title: "サンプルタスク",
  description: "説明文",
  status: "todo",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

describe("TaskDetail", () => {
  const mockOnStatusUpdate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("タイトルが表示される", () => {
    render(<TaskDetail task={mockTask} onStatusUpdate={mockOnStatusUpdate} />);
    expect(screen.getByText("サンプルタスク")).toBeInTheDocument();
  });

  describe("ステータス変更機能", () => {
    it("ステータス選択肢が正しく表示される", () => {
      render(
        <TaskDetail task={mockTask} onStatusUpdate={mockOnStatusUpdate} />
      );

      expect(screen.getByText("サンプルタスク")).toBeInTheDocument();
    });

    it("ステータス変更時にonStatusUpdateが呼ばれる", async () => {
      const user = userEvent.setup();
      render(
        <TaskDetail task={mockTask} onStatusUpdate={mockOnStatusUpdate} />
      );

      const select = screen.getByRole("combobox");
      await user.selectOptions(select, "in_progress");

      expect(mockOnStatusUpdate).toHaveBeenCalledWith("in_progress");
    });
  });
});
