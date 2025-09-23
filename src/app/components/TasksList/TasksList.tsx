import { Box } from "@mui/material";
import Task from "../task/Task";

export default function TasksList(){
    return <>
    <Box sx={{display:'flex',gap:'12px',flexDirection:'column'}}>
    <Task/>
    <Task/>
    </Box>
    </>
}