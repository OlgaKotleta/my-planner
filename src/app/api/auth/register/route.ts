import { query } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
export async function POST(request:NextRequest) {
    try{
        
      const { name, email, password} = await request.json()
     
     
      if ( !name || !email || !password){
        return NextResponse.json(
            {error:' Все поля должны быть заполнены'},
            {status:400}
        
        )
      }
      if (password.length <6){
        return NextResponse.json(
            {error:'Пароль должен содержать не меньше 6 символов'},
            {status:400}
        )
      }
      const existingUser = await query(
        'SELECT user_id FROM users WHERE email = $1',[email]
      )
      if (existingUser.rows.length>0){
        return NextResponse.json(
            { error: 'Пользователь с таким email уже существует' },
            { status: 409 }
          )
      }
      
       // 5. Хэшируем пароль
    const saltRounds = 12
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const result = await query(
        `INSERT INTO users (name, email, password_hash) 
         VALUES ($1, $2, $3) 
         RETURNING user_id, name, email`,
        [name, email, passwordHash]
      )
      console.log('Имя полученное:', name);
      console.log('Тип имени:', typeof name);
      
      // Проверка кодировки
      const buffer = Buffer.from(name, 'utf8');
      console.log('Байтовое представление имени:', buffer);
      console.log('HEX представление:', buffer.toString('hex'));
      const newUser = result.rows[0]
      return NextResponse.json(
        {message: 'Регистрация прошла успешно',
            user:{
                id: newUser.user_id,
                name: newUser.name,
                email: newUser.email
            }
        },
        
        {status:201}
      )
    }
    catch(error){
console.error('ошибка регистрации')
return NextResponse.json(
    { error: 'Внутренняя ошибка сервера' },
    { status: 500 }
  )
    }
}