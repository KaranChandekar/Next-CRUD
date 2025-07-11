"use client";

import { useState } from "react";
import { TaskType } from "./type";
import AddTask from "@/components/AddTask";
import Task from "@/components/Task";

export default function Home() {
  const [tasks, setTasks] = useState([] as TaskType[]);

  return (
    <main className="mt-20 mx-auto max-w-xl border w-full p-4 rounded-lg shadow-lg">
      <div className="flex justify-end">
        <AddTask />
      </div>
      <div className="mt-10">
        {tasks.length > 0 ? (
          tasks.map((task: TaskType, index: number) => (
            <Task key={index} task={task} />
          ))
        ) : (
          <p className="text-center">No tasks found!</p>
        )}
      </div>
    </main>
  );
}
