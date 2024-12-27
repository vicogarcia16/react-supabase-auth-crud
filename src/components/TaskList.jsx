import React, { useEffect } from "react";
import { useTasks } from "../context/TaskContext";
import { TaskCard } from "./TaskCard";

export const TaskList = ({done = false}) => {
  const { tasks, getTasks, loading } = useTasks();
  useEffect(() => {
    getTasks(done);
  }, [done]);

  const renderTasks = () => {
    if (loading) {
      return <p>Loading...</p>;
    } else if (tasks.length === 0) {
      return (
        <div>
          <p>No tasks found</p>
        </div>
      );
    } else {
      return (
        <div>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      );
    }
  };

  return <div>{renderTasks()}</div>;
};
