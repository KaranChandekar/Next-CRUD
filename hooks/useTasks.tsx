import { useMemo, useState } from "react";
import { Task, TaskFilters } from "../types/task";

// Mock data for demonstration
const mockTasks: Task[] = [
  {
    id: "1",
    title: "Design System Implementation",
    description:
      "Create a comprehensive design system for the new product line with reusable components and documentation.",
    status: "in-progress",
    priority: "high",
    dueDate: "2025-01-25",
    createdAt: "2025-01-15",
    updatedAt: "2025-01-20",
    tags: ["design", "frontend"],
  },
  {
    id: "2",
    title: "API Integration Testing",
    description:
      "Test all API endpoints and ensure proper error handling across the application.",
    status: "todo",
    priority: "medium",
    dueDate: "2025-01-30",
    createdAt: "2025-01-18",
    updatedAt: "2025-01-18",
    tags: ["backend", "testing"],
  },
  {
    id: "3",
    title: "User Authentication Flow",
    description:
      "Implement secure user authentication with JWT tokens and password recovery.",
    status: "completed",
    priority: "high",
    dueDate: "2025-01-20",
    createdAt: "2025-01-10",
    updatedAt: "2025-01-19",
    tags: ["security", "backend"],
  },
  {
    id: "4",
    title: "Mobile Responsive Updates",
    description:
      "Optimize the application for mobile devices and tablet viewing.",
    status: "todo",
    priority: "low",
    dueDate: "2025-02-05",
    createdAt: "2025-01-19",
    updatedAt: "2025-01-19",
    tags: ["frontend", "mobile"],
  },
];

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [filters, setFilters] = useState<TaskFilters>({
    status: "all",
    priority: "all",
    search: "",
    sortBy: "dueDate",
    sortOrder: "asc",
  });

  const filteredTasks = useMemo(() => {
    let filtered = tasks.filter((task) => {
      const matchesStatus =
        filters.status === "all" || task.status === filters.status;
      const matchesPriority =
        filters.priority === "all" || task.priority === filters.priority;
      const matchesSearch =
        task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        task.description.toLowerCase().includes(filters.search.toLowerCase());

      return matchesStatus && matchesPriority && matchesSearch;
    });

    // Sort tasks
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (filters.sortBy) {
        case "title":
          comparison = a.title.localeCompare(b.title);
          break;
        case "dueDate":
          comparison =
            new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
          break;
        case "priority":
          const priorityOrder = { low: 1, medium: 2, high: 3 };
          comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
          break;
        case "createdAt":
          comparison =
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
      }

      return filters.sortOrder === "desc" ? -comparison : comparison;
    });

    return filtered;
  }, [tasks, filters]);

  const addTask = async (
    taskData: Omit<Task, "id" | "createdAt" | "updatedAt">,
  ) => {
    const formData = new FormData();
    formData.append("title", taskData.title);
    formData.append("description", taskData.description || "");
    formData.append("status", taskData.status);
    formData.append("priority", taskData.priority);
    formData.append("dueDate", taskData.dueDate || "");
    formData.append("tags", JSON.stringify(taskData.tags || []));

    try {
      const response = await fetch("/api/add_task", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to add task");
      }
      const newTask = await response.json();
      setTasks((prev) => [...prev, newTask]);
    } catch (error) {
      // Optionally handle error (e.g., show notification)
      console.error(error);
    }
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, ...updates, updatedAt: new Date().toISOString() }
          : task,
      ),
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const getTaskById = (id: string) => {
    return tasks.find((task) => task.id === id);
  };

  return {
    tasks: filteredTasks,
    allTasks: tasks,
    filters,
    setFilters,
    addTask,
    updateTask,
    deleteTask,
    getTaskById,
  };
};
