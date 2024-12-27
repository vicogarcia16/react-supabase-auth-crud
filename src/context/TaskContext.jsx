import { createContext, useContext, useState } from "react";
import { supabase } from "../supabase/client";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskContextProvider");
  }
  return context;
};

export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  };

  const getTasks = async (done = false) => {
    setLoading(true);
    const user = await getUser();
    if (!user){ 
      setLoading(false);
      return;
    }
    try {
      const { data, error } = await supabase
        .from("tasks")
        .select()
        .eq("userId", user.id)
        .eq("done", done)
        .order("id", { ascending: true });
      if (error) throw error;
      setTasks(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async (taskName) => {
    setAdding(true);
    const user = await getUser();
    if (!user){
      setAdding(false);
      return;
    }
    try {
      const { error, data } = await supabase
        .from("tasks")
        .insert([
          {
            name: taskName,
            userId: user.id,
          },
        ])
        .select();
      if (error) throw error;
      setTasks([...tasks, ...data]);
    } catch (error) {
      console.log(error);
    }
    setAdding(false);
  };

  const deleteTask = async (id) => {
    const user = await getUser();
    if (!user){
      return;
    }
    try {
      const { error } = await supabase
        .from("tasks")
        .delete()
        .eq("userId", user.id)
        .eq("id", id);
      if (error) throw error;
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (id, updateFields) => {
    const user = await getUser();
    if (!user){
      return;
    }
    try {
      const { error } = await supabase
        .from("tasks")
        .update(updateFields)
        .eq("userId", user.id)
        .eq("id", id);
      if (error) throw error;
    } catch (error) {
      console.log(error);
    }
    setTasks(tasks.filter(tasks => tasks.id !== id))
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        getTasks,
        createTask,
        adding,
        loading,
        deleteTask,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
