import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";

interface SelectDueDateProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

export function SelectDueDate({ date, setDate }: SelectDueDateProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-64" asChild>
        <Button variant="outline">
          <CalendarIcon />
          Selecte Due Date
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="border-none shadow-none p-0"
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border shadow-sm"
          captionLayout="dropdown"
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
