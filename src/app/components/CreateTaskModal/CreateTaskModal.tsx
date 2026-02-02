import { Box, Modal, TextField, Button, Typography } from "@mui/material";
import { useState } from "react";

interface CreateTaskModalProps {
  open: boolean;
  onClose: () => void;
  onCreateTask: (title: string, description: string) => void;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

export default function CreateTaskModal({ open, onClose, onCreateTask }: CreateTaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (title.trim()) {
      onCreateTask(title.trim(), description.trim());
      setTitle('');
      setDescription('');
      onClose();
    }
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="create-task-modal"
    >
      <Box sx={style}>
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Новая задача
        </Typography>
        
        <TextField
          fullWidth
          label="Название задачи"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          required
          autoFocus
        />
        
        <TextField
          fullWidth
          label="Описание (необязательно)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
          multiline
          rows={3}
        />
        
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', mt: 3 }}>
          <Button onClick={handleClose}>
            Отмена
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSubmit}
            disabled={!title.trim()}
            sx={{
              backgroundColor: '#8BA0D7',
              '&:hover': {
                backgroundColor: '#7A90C7',
              }
            }}
          >
            Создать
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}