'use client'
import { authService } from "@/app/services/authService"
import { Box, Button, TextField, Typography } from "@mui/material"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

export default function Register() {
    const router = useRouter()
    const {register, handleSubmit, formState:{errors}} = useForm<RegisterForm>()
        //временное решение
        useEffect(() => {
            localStorage.removeItem('user')
            console.log('Данные пользователя очищены')
          }, [])
    const onSubmit = async (data:RegisterForm) =>{
       try{
        console.log('Отправляемые данные (original):', data);
        console.log('Отправляемые данные (JSON):', JSON.stringify(data));
        const result = await authService.register(data)
        console.log('Успешно отправлены данные',data)
 
            router.push('/auth/login')
     
    }
        catch(error){
         console.error("Ошибка при отправке ",error)
        }
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

                    <Typography sx={{ m: 2 }}>Регистрация</Typography>
            <TextField
           
             type = "text"
            {...register('name')}
            placeholder="Введите имя"
            /> 
             <TextField
           
           type = "email"
          {...register('email')}
          placeholder="Введите email"
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
          <Button type="submit" sx={{ mt: 2 }}>Зарегистрироваться</Button>
          
          <Box><Link style={{color:'grey', fontSize:'12px'}} 
          href= "login">Есть аккаунт?</Link></Box>

          </Box>
          </Box>
        </form>
        </div>)
}
