import React from "react";
import { CheckCircle, Plus } from "lucide-react";

interface EmptyStateProps {
  onAddTask: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onAddTask }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-blue-600" />
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No tasks yet
        </h3>

        <p className="text-gray-600 mb-8 leading-relaxed">
          Get started by creating your first task. Stay organized and track your
          progress with our modern task management system.
        </p>

        <button
          onClick={onAddTask}
          className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Create Your First Task</span>
        </button>
      </div>
    </div>
  );
};
