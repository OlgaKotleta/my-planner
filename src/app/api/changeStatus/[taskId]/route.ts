import { query } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ taskId: string }> }
) {
  try {
    const { taskId } = await params;
    const { status } = await request.json();

    console.log('🔄 Backend: Updating task', taskId, 'to status:', status);

    // Валидация статуса
    if (!['todo', 'in_progress', 'done'].includes(status)) {
      return NextResponse.json(
        { error: 'Неверный статус. Допустимые значения: todo, in_progress, done' },
        { status: 400 }
      );
    }

    const result = await query(
      `UPDATE tasks 
       SET status = $1 
       WHERE task_id = $2 
       RETURNING task_id, user_id, title, description, status, created_at`,
      [status, taskId]
    );

    console.log('📊 Backend: Update result:', result.rows);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Задача не найдена' },
        { status: 404 }
      );
    }

    const updatedTask = result.rows[0];

    return NextResponse.json({
      message: 'Статус задачи обновлен',
      task: {
        id: updatedTask.task_id,
        userId: updatedTask.user_id,
        title: updatedTask.title,
        description: updatedTask.description,
        status: updatedTask.status,
        createdAt: updatedTask.created_at
      }
    });

  } catch (error) {
    console.error('❌ Backend: Error updating task:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}