import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectPriorityProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function SelectPriority({ value, onValueChange }: SelectPriorityProps) {
  return (
    <Select value={value} onValueChange={onValueChange} name="priority">
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select task priority" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="high">High</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
