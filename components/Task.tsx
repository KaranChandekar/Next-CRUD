import { TaskType } from "@/app/type";
import { Badge } from "./ui/badge";

const statusLabels: Record<string, string> = {
  backlog: "Backlog",
  "to-do": "Todo",
  "in-progress": "In Progress",
  done: "Done",
};

const Task = ({ task }: { task: TaskType }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md mb-4 flex justify-between items-start">
      <div>
        <h2 className="font-semibold text-lg">{task.title}</h2>
        <p className="text-sm text-gray-600">{task.description}</p>
      </div>
      <Badge>{statusLabels[task.status] || task.status}</Badge>
    </div>
  );
};

export default Task;
