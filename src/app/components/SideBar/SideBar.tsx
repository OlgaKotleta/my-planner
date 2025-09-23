import { Avatar, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ChevronRight, ChevronLeft, ArrowLeft, ArrowBack, ArrowForward } from '@mui/icons-material'
import router, { Router } from "next/router";
import { useRouter } from "next/navigation";
import { getUser } from "@/app/services/authService";
interface UserData {
  id: number
  name: string
  email: string
  avatar?: string
}
export default function SideBar() {
  const router = useRouter()
    const [isOpen,SetIsOpen] = useState(false)
    const [userData,SetUserData] = useState<UserData | null> (null)
    const toggleSidebar = () =>{
      SetIsOpen(!isOpen)
     
    }
    const LogOut =()=> {
     router.push('/auth/login')
    }
    useEffect(()=>{
const FetchUserData = async () =>{
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  if (!user.id) {
    router.push('auth/login')
    return
  }
   try{
    const resp =  await getUser(user.id)
    SetUserData(resp)
   }
   catch(error){
    console.error('Error:', error)
   }
}
    FetchUserData()
    }, [])
    return <div> 
         {isOpen && (
        <Box 
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
          }}
        />
      )}
         {/* ЯРЛЫК */}
     <Box sx={{
        position:"absolute",
        backgroundColor:"#F3F5FF",
        marginLeft:"12vw",
        marginTop:"16px",
        zIndex: 1001,
     }}>
         <Box
         onClick={toggleSidebar}
      sx={{
        cursor: 'pointer',
        position:"fixed",
        left: isOpen ? '16vw' : 0,
        backgroundColor:'#8BA0D7',
       padding:"4px 10px 0px 12px",
       '& svg': {
      fill: 'white',
      transition: 'fill 0.3s ease',
      width:'20px'
    },
       '&:hover': {
        backgroundColor:'#FFFFFF',
        '& svg': {
            fill: '#8BA0D7'
          }
       },
      
      }}
      >
         {isOpen ? <ArrowBack /> : <ArrowForward />}
      </Box>


        </Box>
      <Box sx={{
         display: isOpen ? 'block' : 'none',
         zIndex: 1000,
        height:'100vh',
        width:'16vw',
        backgroundColor:'#FFFFFF',
        position: 'fixed',
        left: isOpen ? 0 : '-12vw',
        padding:'10px'
      }}>
      {/* АВАТАР */}
       <Avatar src = {userData?.avatar}>

       </Avatar>
       <Typography sx={{
        color:'#8C92A2',
        fontWeight:'Bold',
        marginTop:'12px'
        
       }}>
        {/* Котик Котович */}
        {userData?.name}
       </Typography>
       <Typography sx={{
        color:'#8C92A2',
        marginTop:'52px'

       }}>
        настройки
       </Typography>
       <Typography
       onClick={LogOut}
       sx={{
        color:'red',
        '& svg':{
          paddingTop:'8px'
        },
        cursor:'pointer'

       }}>
        Выйти <ArrowForward />
       </Typography>
      </Box>


    </div>
}