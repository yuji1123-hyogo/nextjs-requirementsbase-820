import TaskList from '@/app/components/tasks/TaskList';
import { ApiResponse, Task } from '@/app/types/tasks.type';
import Link from 'next/link';

async function fetchFilteredTasks(filters) {
  const params = new URLSearchParams();

  if (filters.search) {
    params.append('search', filters.search);
  }
  if (filters.sortBy) {
    params.append('sortBy', filters.sortBy);
  }
  if (filters.order) {
    params.append('order', filters.sortBy);
  }
  const url = `http://localhost:3000/api/tasks${params.toString() && `?${params.toString()}`}`;

  try {
    const response = await fetch(url, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      throw new Error(`HTTP ERROR in fetchFilteredTasks`);
    }

    return await response.json();
  } catch (error) {
    console.error('データ取得エラー:', error);
    return {
      data: [],
      totalCount: 0,
      filteredCount: 0,
      success: false,
      message: 'データの取得に失敗しました',
    };
  }
}

export default async function Page() {
  const tasks = await fetchTasks();
  console.log('📝📝📝fetch-tasks', tasks);
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">タスク一覧</h1>
        <p className="text-gray-600">{tasks.length}件のタスクがあります</p>
      </div>
      <Link
        href="/tasks/new"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
      >
        新しいタスクを作成
      </Link>

      <TaskList tasks={tasks} />
    </div>
  );
}
