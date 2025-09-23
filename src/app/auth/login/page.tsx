'use client'

import { loginService } from "@/app/services/authService"
import { Box, Button, TextField, Typography } from "@mui/material"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

import { useForm } from "react-hook-form"

export default function Login() {
    const router = useRouter();
    const {register, handleSubmit, formState:{errors}} = useForm<LoginForm>()
    //временное решение
    useEffect(() => {
        localStorage.removeItem('user')
    
        console.log('Данные пользователя очищены')
      }, [])
    const onSubmit = async (data:LoginForm) =>{
        console.log(data, "из логина приходит с формы")
        const result = await loginService.register(data)
        // alert(` Вошли в аккаунт ${ data.id} `)
       console.log(result,  "из логина приходит с запроса на бек")
        router.push('/');
         localStorage.setItem('user', JSON.stringify(result.user)); 
    } 
    return (<div>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{
                display:'flex',
                justifyContent:'center', 
                alignItems: 'center',
                minHeight: '100vh',
               
                }}>
                    <Box sx={{ 
                        display:'flex',
                        flexDirection:'column',
                        justifyContent:'center',
                        alignItems: 'center',
                        gap:'10px',
                        border:'1px solid black',
                        borderRadius:'20px',
                        padding:"24px"
                        }}>

                    <Typography sx={{ m: 2 }}>Авторизация</Typography>
            <TextField
           
             type = "text"
            {...register('email')}
            placeholder="Введите почту"
            /> 
        
           <TextField
            error={!!errors.password} 
            helperText={errors.password?.message} 
         type = "password"
        {...register('password',{
            required:'Пароль обязателен',
            minLength:{
                value:6,
                message:'Минимум 6 символов.'
            }
        
        })}
        placeholder="Введите пароль"
        /> 
          <Button type="submit" sx={{ mt: 2 }} >Войти</Button>
          <Box><Link style={{color:'grey', fontSize:'12px'}} 
          href= "register">Нет аккаунта?</Link></Box>
          </Box>
          </Box>
        </form>
        </div>)
}
