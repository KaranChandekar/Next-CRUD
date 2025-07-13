import { useEffect, useMemo, useState } from "react";
import { Task, TaskFilters } from "../types/task";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<TaskFilters>({
    status: "all",
    priority: "all",
    search: "",
    sortBy: "dueDate",
    sortOrder: "asc",
  });

  // Fetch initial tasks from the server
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/get_tasks");
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

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
    loading,
  };
};
