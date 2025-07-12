import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Circle, CircleCheck, CircleDashed, Clock } from "lucide-react";

interface SelectStatusProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function SelectStatus({ value, onValueChange }: SelectStatusProps) {
  return (
    <Select value={value} onValueChange={onValueChange} name="status">
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select task status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="backlog">
            <CircleDashed size={12} />
            Backlog
          </SelectItem>
          <SelectItem value="to-do">
            <Circle size={12} className="text-black" />
            Todo
          </SelectItem>
          <SelectItem value="in-progress">
            <Clock size={12} className="text-yellow-500" />
            In Progress
          </SelectItem>
          <SelectItem value="done">
            <CircleCheck size={12} className="text-blue-500" /> Done
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
