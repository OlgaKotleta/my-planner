import { query } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    const { id } = await params 
    const userId = id

    const result = await query(
      `SELECT user_id, name, email, avatar 
       FROM users 
       WHERE user_id = $1`,
      [userId]
    )

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Пользователь не найден' },
        { status: 404 }
      )
    }

    const user = result.rows[0]
    
    return NextResponse.json({
      id: user.user_id,
      name: user.name,
      email: user.email,
      avatar: user.avatar // может быть null или URL
    })

  } catch (error) {
    console.error('User fetch error:', error)
    return NextResponse.json(
      { error: 'Ошибка сервера' },
      { status: 500 }
    )
  }
}