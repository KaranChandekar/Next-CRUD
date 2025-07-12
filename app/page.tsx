"use client";

import AddTask from "@/components/AddTask";
import { TaskTable } from "@/components/TaskTable";
import { useState } from "react";
import { TaskType } from "./type";

export default function Home() {
  const [tasks, setTasks] = useState([] as TaskType[]);

  return (
    <main className="mt-20 mx-auto max-w-5xl w-full p-4 ">
      <div className="flex justify-end">
        <AddTask tasks={tasks} setTasks={setTasks} />
      </div>
      <TaskTable tasks={tasks} />
    </main>
  );
}
