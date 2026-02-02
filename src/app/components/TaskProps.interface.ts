interface TaskProps {
    id: number;
    title: string;
    description?: string;
    status: string;
    createdAt: string;
    onStatusChange: (taskId: number, newStatus: string) => Promise<void>;
  }
  
