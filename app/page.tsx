"use client";

import { Plus, CheckSquare } from "lucide-react";
import { useTasks } from "@/hooks/useTasks";
import { TaskCard } from "@/components/TaskCard";
import { useState } from "react";
import { Task } from "@/types/task";
import { FilterBar } from "@/components/FilterBar";
import { EmptyState } from "@/components/EmptyState";
import { AddTaskSheet } from "@/components/AddTaskSheet";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { TaskDetail } from "@/components/TaskDetail";
import TasksListSkeleton from "@/components/TasksListSkeleton";

type ViewType = "list" | "detail";

export default function Home() {
  const {
    tasks,
    allTasks,
    filters,
    setFilters,
    addTask,
    updateTask,
    deleteTask,
    getTaskById,
    loading,
  } = useTasks();

  const [currentView, setCurrentView] = useState<ViewType>("list");
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    taskId: string | null;
  }>({ isOpen: false, taskId: null });

  const selectedTask = selectedTaskId ? getTaskById(selectedTaskId) : null;

  const handleTaskClick = (taskId: string) => {
    setSelectedTaskId(taskId);
    setCurrentView("detail");
  };

  const handleBackToList = () => {
    setCurrentView("list");
    setSelectedTaskId(null);
  };

  const handleAddTask = (
    taskData: Omit<Task, "id" | "createdAt" | "updatedAt">,
  ) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
      setEditingTask(null);
    } else {
      addTask(taskData);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsAddTaskOpen(true);
  };

  const handleDeleteTask = (taskId: string) => {
    setDeleteDialog({ isOpen: true, taskId });
  };

  const confirmDelete = () => {
    if (deleteDialog.taskId) {
      deleteTask(deleteDialog.taskId);
      if (selectedTaskId === deleteDialog.taskId) {
        handleBackToList();
      }
    }
  };

  const handleStatusChange = (taskId: string, status: Task["status"]) => {
    updateTask(taskId, { status });
  };

  const closeAddTaskSheet = () => {
    setIsAddTaskOpen(false);
    setEditingTask(null);
  };

  // List View
  if (currentView === "list") {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <CheckSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Task Manager
                  </h1>
                  <p className="text-gray-600">Stay organized and productive</p>
                </div>
              </div>

              <button
                onClick={() => setIsAddTaskOpen(true)}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              >
                <Plus className="w-5 h-5" />
                <span>Add Task</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-8">
          <FilterBar
            filters={filters}
            onFiltersChange={setFilters}
            totalTasks={allTasks.length}
            filteredCount={tasks.length}
          />

          {loading ? (
            <TasksListSkeleton />
          ) : tasks.length === 0 ? (
            filters.search ||
            filters.status !== "all" ||
            filters.priority !== "all" ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No tasks found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your filters to see more tasks.
                </p>
              </div>
            ) : (
              <EmptyState onAddTask={() => setIsAddTaskOpen(true)} />
            )
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onClick={() => handleTaskClick(task.id)}
                  onStatusChange={(status) =>
                    handleStatusChange(task.id, status)
                  }
                  onDelete={() => handleDeleteTask(task.id)}
                  onEdit={() => handleEditTask(task)}
                />
              ))}
            </div>
          )}
        </main>

        {/* Add Task Sheet */}
        <AddTaskSheet
          isOpen={isAddTaskOpen}
          onClose={closeAddTaskSheet}
          onSubmit={handleAddTask}
          editTask={editingTask}
        />

        {/* Delete Confirmation */}
        <ConfirmDialog
          isOpen={deleteDialog.isOpen}
          onClose={() => setDeleteDialog({ isOpen: false, taskId: null })}
          onConfirm={confirmDelete}
          title="Delete Task"
          message="Are you sure you want to delete this task? This action cannot be undone."
          confirmText="Delete"
          type="danger"
        />
      </div>
    );
  }

  // Detail View
  if (currentView === "detail" && selectedTask) {
    return (
      <>
        <TaskDetail
          task={selectedTask}
          onBack={handleBackToList}
          onEdit={() => handleEditTask(selectedTask)}
          onDelete={() => handleDeleteTask(selectedTask.id)}
          onStatusChange={(status) =>
            handleStatusChange(selectedTask.id, status)
          }
        />

        {/* Add Task Sheet */}
        <AddTaskSheet
          isOpen={isAddTaskOpen}
          onClose={closeAddTaskSheet}
          onSubmit={handleAddTask}
          editTask={editingTask}
        />

        {/* Delete Confirmation */}
        <ConfirmDialog
          isOpen={deleteDialog.isOpen}
          onClose={() => setDeleteDialog({ isOpen: false, taskId: null })}
          onConfirm={confirmDelete}
          title="Delete Task"
          message="Are you sure you want to delete this task? This action cannot be undone."
          confirmText="Delete"
          type="danger"
        />
      </>
    );
  }

  return null;
}
