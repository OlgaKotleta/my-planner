import { query } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ userId: string }> }
){
try{
    const { userId } = await params
    console.log('=== TASK API CALLED ===')
    const result = await query(
        `SELECT task_id, user_id, title, description, status, created_at 
        FROM tasks 
        WHERE user_id = $1 
        ORDER BY created_at DESC`,
       [userId]
    )
    console.log(result)
    const tasks = result.rows.map(task =>({
        id: task.task_id,
      userId: task.user_id,
      title: task.title,
      description: task.description,
      status: task.status,
      createdAt: task.created_at
    }))
    return NextResponse.json(tasks)

} catch (error) {
  console.error('Tasks fetch error:', error)
  return NextResponse.json(
    { error: 'Ошибка сервера' },
    { status: 500 }
  )
}
}
// import { NextResponse } from 'next/server';

// export async function GET(
//   request: Request,
//   { params }: { params: { userId: string } }
// ) {
//   console.log('🎯 TASK API CALLED!');
  
//   // Простой ответ без БД
//   return NextResponse.json([
//     { id: 1, title: 'Тестовая задача 1', status: false },
//     { id: 2, title: 'Тестовая задача 2', status: true }
//   ]);
// }