export interface Task {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

export interface TaskFilters {
  status: string;
  priority: string;
  search: string;
  sortBy: "dueDate" | "priority" | "createdAt" | "title";
  sortOrder: "asc" | "desc";
}
