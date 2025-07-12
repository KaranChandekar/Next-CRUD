import { TaskType } from "@/app/type";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Plus } from "lucide-react";
import { useState } from "react";
import { SelectDueDate } from "./SelectDueDate";
import { SelectPriority } from "./SelectPriority";
import { SelectStatus } from "./SelectStatus";
import { Textarea } from "./ui/textarea";

interface AddTaskProps {
  tasks: TaskType[];
  setTasks: (tasks: TaskType[]) => void;
}

const AddTask = ({ tasks, setTasks }: AddTaskProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [dueDate, setDueDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);
  const [priority, setPriority] = useState("low");

  const handleAddTask = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);

      const response = await fetch("/api/add_task", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add task");
      }

      const newTask = await response.json();
      setTasks([...tasks, newTask]);

      setTitle("");
      setDescription("");
      setStatus("");
      setDueDate(new Date());
      setOpen(false);
      setPriority("low");
    } catch (error) {
      console.error("Error handling form submission:", error);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Plus />
          Add Task
        </Button>
      </SheetTrigger>
      <SheetContent className="min-w-[30rem] gap-0">
        <form
          onSubmit={handleAddTask}
          className="flex flex-col h-full justify-between"
        >
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </SheetDescription>
          </SheetHeader>{" "}
          <div className="flex flex-col gap-6 border-t p-4 h-full overflow-y-auto">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                type="text"
                placeholder="Enter task title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter task description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <SelectStatus value={status} onValueChange={setStatus} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="priority">Priority</Label>
              <SelectPriority value={priority} onValueChange={setPriority} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="due-date">Due Date</Label>
              <SelectDueDate date={dueDate} setDate={setDueDate} />
              <input
                type="hidden"
                name="dueDate"
                value={dueDate ? dueDate.toISOString() : ""}
              />
            </div>
          </div>
          <SheetFooter>
            <Button type="submit">Add Task</Button>
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default AddTask;
