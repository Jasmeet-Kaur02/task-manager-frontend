import React, { createContext, useState, useContext, useEffect } from "react";
import { getTasks } from "../api/tasks";

const TaskContext = createContext({
  tasks: [],
  fetchTasks: () => null,
  isLoading: false,
  selectedTask: null,
  setSelectedTask: (task: any) => null,
});

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    await getTasks()
      .then((res) => {
        if (res.status) {
          setTasks(res.data);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider
      value={{ tasks, selectedTask, setSelectedTask, isLoading, fetchTasks }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export const useTask = () => {
  return useContext(TaskContext);
};
