import React, { useState } from "react";
import { useTasks } from "../context/TaskContext";

export const TaskForm = () => {
  const [taskName, setTaskName] = useState("");
  const { createTask, adding } = useTasks();

  const handleSubmit = async(e) => {
    e.preventDefault();
    createTask(taskName);
    setTaskName("");
  }
  return (
      <form onSubmit={handleSubmit} className="card card-body">
        <input
          type="text"
          name="taskName"
          placeholder="Write your task"
          onChange={(e) => setTaskName(e.target.value)}
          value={taskName}
          className="form-control mb-2" 
        />
        <div className="ms-auto">
          <button disabled={adding} type="submit" className="btn btn-primary btn-sm">
            {adding ? "Adding..." : "Add Task"}
          </button>
        </div>
       
      </form>
  );
};
