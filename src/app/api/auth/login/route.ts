import { query } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs'

export async function POST(request:NextRequest) {
    try{
      console.log(request, "реквест")
      const { email, password} = await request.json()
   console.log(email, "тут")
      if (  !email || !password){
        return NextResponse.json(
            {error:'Ошибка'},
            // {status:400}
        
        )
    }

    const result = await query(
      `SELECT user_id, name, email, password_hash 
       FROM users 
       WHERE email = $1`,
      [email]
    );

    //  Проверяем, найден ли пользователь
    if (result.rows.length === 0) {
      return Response.json(
        { message: 'Пользователь с таким email не найден' },
        { status: 401 }
      );
    }
    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    
    if (!isPasswordValid) {
      return Response.json(
        { message: 'Неверный пароль' },
        { status: 401 }
      );
    }
   
    return Response.json({
      message: 'Успешный вход',
      user: {
        id: user.user_id,
        name: user.name,
        email: user.email
      }
      
    });
    
  }

    catch(error){
      console.error('Login error:', error);
return NextResponse.json(
    { error: 'Внутренняя ошибка сервера' },
    { status: 500 }
  )
    }
}