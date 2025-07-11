import { TaskType } from "../type";

const Task = ({ task }: { task: TaskType }) => {
  return (
    <div>
      <h2>{task.title}</h2>
      <p>{task.descreption}</p>
      <p>{task.status}</p>
    </div>
  );
};

export default Task;
