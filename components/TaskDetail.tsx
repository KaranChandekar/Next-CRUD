import React, { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Flag,
  Tag,
  Edit,
  Trash2,
  CheckCircle,
} from "lucide-react";
import { Task } from "../types/task";

interface TaskDetailProps {
  task: Task;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onStatusChange: (status: Task["status"]) => void;
}

export const TaskDetail: React.FC<TaskDetailProps> = ({
  task,
  onBack,
  onEdit,
  onDelete,
  onStatusChange,
}) => {
  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return "text-red-500 bg-red-50";
      case "medium":
        return "text-orange-500 bg-orange-50";
      default:
        return "text-green-500 bg-green-50";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Tasks</span>
            </button>

            <div className="flex items-center space-x-3">
              <button
                onClick={onEdit}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button
                onClick={onDelete}
                className="flex items-center space-x-2 px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Task Header */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {task.title}
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {task.description}
                </p>
              </div>

              <div className="ml-8">
                <select
                  value={task.status}
                  onChange={(e) =>
                    onStatusChange(e.target.value as Task["status"])
                  }
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            {/* Status and Priority Badges */}
            <div className="flex items-center space-x-4 mb-6">
              <span
                className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(task.status)}`}
              >
                {task.status === "in-progress"
                  ? "In Progress"
                  : task.status === "todo"
                    ? "To Do"
                    : "Completed"}
              </span>

              <div
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${getPriorityColor(task.priority)}`}
              >
                <Flag className="w-4 h-4" />
                <span className="text-sm font-medium capitalize">
                  {task.priority} Priority
                </span>
              </div>
            </div>

            {/* Tags */}
            {task.tags.length > 0 && (
              <div className="flex items-center space-x-2 mb-6">
                <Tag className="w-4 h-4 text-gray-400" />
                <div className="flex space-x-2">
                  {task.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Task Details */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Due Date */}
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Due Date</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {formatDate(task.dueDate)}
                  </p>
                </div>
              </div>

              {/* Created */}
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Clock className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Created</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {formatDateTime(task.createdAt)}
                  </p>
                </div>
              </div>

              {/* Last Updated */}
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Edit className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Last Updated
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    {formatDateTime(task.updatedAt)}
                  </p>
                </div>
              </div>

              {/* Task ID */}
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Task ID</p>
                  <p className="text-lg font-semibold text-gray-900 font-mono">
                    #{task.id}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
