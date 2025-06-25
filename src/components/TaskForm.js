import React, { useState } from "react";
import API from "../services/api";

function TaskForm({ onTaskCreated }) {
  const [task, setTask] = useState({
    name: "",
    description: "",
    category: "",
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.name) return;

    await API.post("/tasks", task);
    onTaskCreated(); // refresh task list
    setTask({ name: "", description: "", category: "" });
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <input
        type="text"
        name="name"
        placeholder="Task name"
        value={task.name}
        onChange={handleChange}
        required
        style={inputStyle}
      />
      <input
        type="text"
        name="category"
        placeholder="Category (Work, Study, etc.)"
        value={task.category}
        onChange={handleChange}
        style={inputStyle}
      />
      <textarea
        name="description"
        placeholder="Task description"
        value={task.description}
        onChange={handleChange}
        style={textareaStyle}
      ></textarea>
      <button type="submit" style={buttonStyle}>Add Task</button>
    </form>
  );
}

const formStyle = { marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "1rem" };
const inputStyle = { padding: "10px", fontSize: "16px", border: "1px solid #ccc", borderRadius: "6px" };
const textareaStyle = { ...inputStyle, minHeight: "60px" };
const buttonStyle = { background: "#1976d2", color: "#fff", padding: "10px", border: "none", borderRadius: "6px", cursor: "pointer" };

export default TaskForm;
