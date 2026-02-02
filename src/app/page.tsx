'use client'
import { Box, Container, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Ready from "./components/Ready/Ready";
import Idea from "./components/Idea/Idea";
import TasksList from "./components/TasksList/TasksList";
import CreateTaskModal from "./components/CreateTaskModal/CreateTaskModal";


export default function Home() {
  const [activeButton,setActiveButton] = useState(0)
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  //временное решение защиты "/"
  const router = useRouter()
  const handleTaskStatusChange = async (taskId: number, newStatus: string) => {
    try {
      const response = await fetch(`/api/changeStatus/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ошибка обновления статуса');
      }
  
      // Обновляем локальное состояние
      setTasks(prev => prev.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      ));
  
    } catch (error) {
      console.error('Ошибка обновления статуса:', error);
      throw error; // Пробрасываем ошибку в компонент Task
    }
  };
  const handleCreateTask = async (title: string, description: string) => {
    try {
      const userData = localStorage.getItem('user');
      
      if (!userData) {
        router.push('auth/login');
        return;
      }

      const user = JSON.parse(userData);
      
      const response = await fetch('/api/createTask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          title: title,
          description: description
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ошибка создания задачи');
      }

      const result = await response.json();
      console.log('✅ Задача создана:', result.task);
      
      // Обновляем список задач
      fetchTasks();
      
    } catch (error) {
      console.error('❌ Ошибка создания задачи:', error);
    }
  };
// Функция загрузки задач
const fetchTasks = async () => {
  
  try {
    setLoading(true);
    const userData = localStorage.getItem('user');
    
    if (!userData) {
      router.push('auth/login');
      return;
    }
    const user = JSON.parse(userData);
    const response = await fetch(`/api/task/${user.id}`);
    console.log(response)
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const tasksData = await response.json();
    setTasks(tasksData);
    
  } catch (error) {
    console.error('❌ Full error in fetchTasks:', error);
  
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchTasks();
}, []);

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
     {/* <Box
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
      </Box> */}
<Box
 onClick={() => setModalOpen(true)}
sx={{
  
    color:'white',
    backgroundColor:'#8BA0D7',
    display:'flex',
    justifyContent:'center',
    width:'50px',
     padding:'0px 0px 0px 0px',
    borderRadius:'10px',
    fontSize:'32px',
    alignItems:'center',
    cursor:'pointer',

}}>
  +
</Box>
     </Box>
 {/* Модалка создания задачи */}
 <CreateTaskModal 
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onCreateTask={handleCreateTask}
        />
{/* -------------tasks */}
<Box sx={{
  display:"flex",
  justifyContent:'center',
  mt:'32px'
}}> {
activeButton == 0 ? <TasksList tasks={tasks}  onTaskStatusChange={handleTaskStatusChange}/>:
activeButton == 1 ? <Ready tasks={tasks} onTaskStatusChange={handleTaskStatusChange}/>:
<Idea />
}</Box>

</Box>
</div>
  );
}
