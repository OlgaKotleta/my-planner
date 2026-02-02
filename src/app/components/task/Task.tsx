import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { useState } from "react";



export default function Task({ id, title, description, status, createdAt, onStatusChange  }: TaskProps){
    const [isChecked,setIsChecked] = useState(false)
    const [isVisible, setIsVisible] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const handleChange = async (e: { target: { checked: boolean } }) => {
        const newChecked = e.target.checked;
        setIsLoading(true);
        
        try {
            // Сначала делаем запрос к беку
            const newStatus = newChecked ? 'done' : 'todo';
            await onStatusChange(id, newStatus);
            
            // Если успешно - обновляем состояние
            setIsChecked(newChecked);
            
            // Прячем задачу если она выполнена
            if (newChecked) {
                setTimeout(() => {
                    setIsVisible(false);
                }, 500);
            }
        } catch (error) {
            console.error('Ошибка изменения статуса:', error);
            // Откатываем чекбокс если ошибка
            setIsChecked(!newChecked);
        } finally {
            setIsLoading(false);
        }
    }
    return <>
    <Box sx={{
        
        backgroundColor:'#F3F5FF',
        width:'64vw',
        minHeight:'40px',
        borderRadius:'10px',
        color:'#383838',
        alignItems:'center',
        padding:'8px 0px 8px 16px',
        justifyContent:'space-between',
        display:isVisible? 'flex':'none',
        
        }}>
             <Box>
                <Typography sx={{
                    textDecoration: isChecked ? 'line-through' : 'none',
                    fontWeight: 'bold'
                }}>
                    {title}
                </Typography>
                </Box>
        <Box>
            {status=='todo'?
       <FormControlLabel
       control={<Checkbox 
           checked={isChecked}
           onChange={handleChange}
           
       />}
        label=""
      />:<></>}
    </Box>
    </Box>
    

    </>
}