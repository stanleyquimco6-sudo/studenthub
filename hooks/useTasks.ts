import { useState } from "react";
import type { Task } from "../types";
import { mockTasks } from "../constants/mockData";

/**
 * Custom hook for task management
 * Handles all task state and operations
 * Created by: Member 2
 */
export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  const addTask = (title: string) => {
    if (title.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        title,
        completed: false,
      };
      setTasks([...tasks, newTask]);
    }
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const getStats = () => {
    const completed = tasks.filter((t) => t.completed).length;
    const pending = tasks.length - completed;
    return { completed, pending, total: tasks.length };
  };

  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    getStats,
  };
};
