export interface TaskType {
  id: string;
  title: string;
  description?: string;
  status: string;
  completed: boolean;
  dueDate?: Date | undefined;
  priority: string;
}
