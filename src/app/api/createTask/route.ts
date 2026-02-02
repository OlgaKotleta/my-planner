import { query } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
export async function POST(request: NextRequest) {
  try {
    const { userId, title, description } = await request.json();
    if (!userId || !title) {
      return NextResponse.json(
        { error: 'ID пользователя и заголовок обязательны' },
        { status: 400 }
      );
    }

    if (title.length < 1) {
      return NextResponse.json(
        { error: 'Заголовок не может быть пустым' },
        { status: 400 }
      );
    }

    // Создаем задачу со статусом 'todo' (не выполнена)
    const result = await query(
      `INSERT INTO tasks (user_id, title, description, status, created_at) 
       VALUES ($1, $2, $3, 'todo', CURRENT_TIMESTAMP) 
       RETURNING task_id, user_id, title, description, status, created_at`,
      [userId, title, description || null]
    );

    const newTask = result.rows[0];
    console.log('✅ Backend: Task created:', newTask);

    return NextResponse.json(
      {
        message: 'Задача успешно создана',
        task: {
          id: newTask.task_id,
          userId: newTask.user_id,
          title: newTask.title,
          description: newTask.description,
          status: newTask.status,
          createdAt: newTask.created_at
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('❌ Backend: Error creating task:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}