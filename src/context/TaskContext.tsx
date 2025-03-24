import React, { createContext, useState, useContext, useEffect } from "react";
import { getTasks } from "../api/tasks";

const TaskContext = createContext({
  tasks: [],
  fetchTasks: () => null,
});

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    await getTasks()
      .then((res) => {
        console.log(res);
        if (res.status) {
          setTasks(res.data);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, fetchTasks }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTask = () => {
  return useContext(TaskContext);
};
