import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { useState } from "react";

export default function Task(){
    const [isChecked,setIsChecked] = useState(false)
    const [isVisible, setIsVisible] = useState(true)
    const handleChange = (e: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
        setIsChecked(e.target.checked)
        if (e.target.checked){
            setTimeout(()=>{
                setIsVisible(false)
            },500)
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
            <Typography sx={{
              
            textDecoration: isChecked?'line-through' : 'none'

            }}> Постирать носки</Typography>
        
        <Box>
      <FormControlLabel
        control={<Checkbox 
            checked={isChecked}
            onChange={handleChange}
        />}
        label=""
      />
    </Box>
    </Box>
    

    </>
}