import React from "react";
import { AlertTriangle, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: "danger" | "warning" | "info";
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "danger",
}) => {
  if (!isOpen) return null;

  const getColors = () => {
    switch (type) {
      case "danger":
        return {
          icon: "text-red-600",
          iconBg: "bg-red-100",
          button: "bg-red-600 hover:bg-red-700",
          border: "border-red-200",
        };
      case "warning":
        return {
          icon: "text-orange-600",
          iconBg: "bg-orange-100",
          button: "bg-orange-600 hover:bg-orange-700",
          border: "border-orange-200",
        };
      default:
        return {
          icon: "text-blue-600",
          iconBg: "bg-blue-100",
          button: "bg-blue-600 hover:bg-blue-700",
          border: "border-blue-200",
        };
    }
  };

  const colors = getColors();

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader className="hidden">
          <AlertDialogTitle className="text-lg font-semibold text-gray-900">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600">
            {message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex items-start space-x-4">
          <div className={`p-3 rounded-full ${colors.iconBg}`}>
            <AlertTriangle className={`w-6 h-6 ${colors.icon}`} />
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {title}
            </h3>
            <p className="text-gray-600 leading-relaxed">{message}</p>
          </div>

          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="border-t border-gray-100 flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`flex-1 px-4 py-2.5 text-white rounded-lg transition-colors cursor-pointer ${colors.button}`}
          >
            {confirmText}
          </button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
