import { TaskType } from "@/app/type";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useState } from "react";
import { SelectStatus } from "./SelectStatus";
import { Textarea } from "./ui/textarea";

interface AddTaskProps {
  tasks: TaskType[];
  setTasks: (tasks: TaskType[]) => void;
}

const AddTask = ({ tasks, setTasks }: AddTaskProps) => {
  const [status, setStatus] = useState("");

  const handleAddTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const title = (form.elements.namedItem("title") as HTMLInputElement).value;
    const description = (
      form.elements.namedItem("description") as HTMLInputElement
    ).value;
    // Use status from state
    // const status = (form.elements.namedItem("status") as HTMLInputElement).value;

    const newTask: TaskType = { title, description, status };
    setTasks([...tasks, newTask]);
    form.reset();
    setStatus("");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>
          <Plus size={14} /> Add Task
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form onSubmit={handleAddTask}>
          <AlertDialogHeader>
            <AlertDialogTitle>Add Task</AlertDialogTitle>
            <AlertDialogDescription>
              Enter the title, description, and status of the task you want to
              add.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex flex-col gap-6 mt-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                type="text"
                placeholder="Enter task title"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter task description"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <SelectStatus value={status} onValueChange={setStatus} />
            </div>
          </div>
          <AlertDialogFooter className="mt-6">
            <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <button type="submit">Add Task</button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddTask;
