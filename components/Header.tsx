import { CalendarCheck } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full border-b px-10 mx-auto h-12 flex items-center">
      <div className="flex items-center gap-2 font-bold text-lg max-w-5xl mx-auto w-full">
        <CalendarCheck />
        Task Manager
      </div>
    </header>
  );
};

export default Header;
