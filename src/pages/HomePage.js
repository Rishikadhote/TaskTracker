import React, { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import API from "../services/api";

function HomePage() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container">
      <h1> Task Timer Tracker</h1>
      <TaskForm onTaskCreated={fetchTasks} />
      <TaskList tasks={tasks} onTaskUpdated={fetchTasks} />
    </div>
  );
}

export default HomePage;
