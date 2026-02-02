import { Box } from "@mui/material";
import Task from "../task/Task";

  
  interface TasksListProps {
    tasks: TaskProps[];
    onTaskStatusChange: (taskId: number, newStatus: string) => Promise<void>;
  }

export default function TasksList({tasks,onTaskStatusChange}:TasksListProps){
  const todoTasks = tasks.filter(task => task.status === 'done');
  
  // Если нет задач, показываем сообщение
  // if (todoTasks.length === 0) {
  //   return (
  //     <Box sx={{ textAlign: 'center', color: '#A2A2A2', mt: 4 }}>
  //       Нет активных задач
  //     </Box>
  //   );
  // }

    return <>
    <Box sx={{display:'flex',gap:'12px',flexDirection:'column'}}>
    { todoTasks.map((task)=>(
       <Task 
       key={task.id}
       id={task.id}
       title={task.title}
       description={task.description}
       status={task.status}
       createdAt={task.createdAt}
       onStatusChange={onTaskStatusChange}
     />
    ))}
    </Box>
    </>
}