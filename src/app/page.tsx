'use client'
import { Box, Container, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Tasks from "./components/TasksList/TasksList";
import Ready from "./components/Ready/Ready";
import Idea from "./components/Idea/Idea";


export default function Home() {
  const [activeButton,setActiveButton] = useState(0)
  //временное решение защиты "/"
  const router = useRouter()
  useEffect(() => {
    const userData = localStorage.getItem('user')
  
    try {
      if (!userData) {
         router.push('auth/login')
       console.log('userData', userData)
        return
     }
      const user = JSON.parse(userData)
      console.log('userData, user', userData, user)
      // ПРОВЕРКА НАЛИЧИЯ ID
      if (!user?.id) {
        router.push('auth/login')
        console.log(' user.id', user.id)
        return
      }
    } catch (error) {
      router.push('auth/login')
    }
  }, [router])


  return (
    <div >
<Box>

  <Box sx={{
    display:"flex",
    justifyContent:"center",
    gap:'24px',
    marginTop:'16px',
    
  }}>
    
     <Box 
      onClick={() => setActiveButton(0)}
     sx={{
       display:'flex',
       justifyContent:'center',
       width:'10vw',
      minWidth:'120px',
      cursor:'pointer',
      backgroundColor:activeButton === 0 ? "#8BA0D7" : "#F3F5FF",
      padding:'12px 60px 12px 60px',
      borderRadius:'10px',
      color: activeButton === 0 ? "white" : "#A2A2A2",
      fontWeight:'Bold'
     }}>
      задачи
      </Box>
     <Box
      onClick={() => setActiveButton(1)}
     sx={{
       display:'flex',
       justifyContent:'center',
       width:'10vw',
      cursor:'pointer',
      backgroundColor:activeButton === 1 ? "#8BA0D7" : "#F3F5FF",
      padding:'12px 60px 12px 60px',
      borderRadius:'10px',
      color: activeButton === 1 ? "white" : "#A2A2A2",
      fontWeight:'Bold'
     }}>
      сделано
      </Box>
     <Box
     onClick={() => setActiveButton(2)} 
     sx={{
      display:'flex',
      justifyContent:'center',
      width:'10vw',
      cursor:'pointer',
      backgroundColor:activeButton === 2 ? "#8BA0D7" : "#F3F5FF",
      padding:'12px 60px 12px 60px',
      borderRadius:'10px',
      color: activeButton === 2 ? "white" : "#A2A2A2",
      fontWeight:'Bold'
     }}>
      идеи
      </Box>
<Box sx={{
    color:'white',
    backgroundColor:'#8BA0D7',
    display:'flex',
    justifyContent:'center',
    width:'2vw',
     padding:'0px 0px 0px 0px',
    borderRadius:'10px',
    fontSize:'32px',
    alignItems:'center',
    cursor:'pointer',

}}>
  +
</Box>
     </Box>

{/* -------------tasks */}
<Box sx={{
  display:"flex",
  justifyContent:'center',
  mt:'32px'
}}> {
activeButton == 0 ? <Tasks/>:
activeButton == 1 ? <Ready/>:
<Idea />
}</Box>

</Box>
</div>
  );
}
