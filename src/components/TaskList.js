import React, { useState } from "react";
import TimerButton from "./TimerButton";
import API from "../services/api";

function TaskList({ tasks, onTaskUpdated }) {
  const [times, setTimes] = useState({});
  const [editTaskId, setEditTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState({ name: "", description: "", category: "" });

  const handleTimeLogged = (taskId, timeString) => {
    setTimes((prev) => ({ ...prev, [taskId]: timeString }));
  };

  const handleDelete = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      await API.delete(`/tasks/${taskId}`);
      onTaskUpdated(); // Refresh task list
    }
  };

  const handleEditClick = (task) => {
    setEditTaskId(task.id);
    setEditedTask({ name: task.name, description: task.description, category: task.category });
  };

  const handleEditChange = (e) => {
    setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e, taskId) => {
    e.preventDefault();
    await API.put(`/tasks/${taskId}`, editedTask);
    setEditTaskId(null);
    onTaskUpdated(); // Refresh task list
  };

  return (
    <div>
      {tasks.length === 0 ? (
        <p>No tasks added yet.</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id} style={cardStyle}>
            {editTaskId === task.id ? (
              <form onSubmit={(e) => handleEditSubmit(e, task.id)} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <input
                  type="text"
                  name="name"
                  value={editedTask.name}
                  onChange={handleEditChange}
                  required
                  style={inputStyle}
                />
                <input
                  type="text"
                  name="category"
                  value={editedTask.category}
                  onChange={handleEditChange}
                  style={inputStyle}
                />
                <textarea
                  name="description"
                  value={editedTask.description}
                  onChange={handleEditChange}
                  style={inputStyle}
                />
                <div style={{ display: "flex", gap: "10px" }}>
                  <button type="submit" style={saveBtn}>Save</button>
                  <button type="button" onClick={() => setEditTaskId(null)} style={cancelBtn}>Cancel</button>
                </div>
              </form>
            ) : (
              <>
                <h3>{task.name}</h3>
                <p>{task.description}</p>
                <small><strong>Category:</strong> {task.category || "General"}</small><br />
                <small><strong>Last Time Logged:</strong> {times[task.id] || "—"}</small>
                <TimerButton taskId={task.id} onTimeLogged={handleTimeLogged} />
                <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                  <button onClick={() => handleEditClick(task)} style={editBtn}>Edit</button>
                  <button onClick={() => handleDelete(task.id)} style={deleteBtn}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

// Styles
const cardStyle = {
  background: "#fff",
  border: "1px solid #ddd",
  padding: "1rem",
  marginBottom: "1rem",
  borderRadius: "10px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
};

const inputStyle = {
  padding: "10px",
  fontSize: "16px",
  border: "1px solid #ccc",
  borderRadius: "6px",
};

const editBtn = {
  backgroundColor: "#1976d2",
  color: "#fff",
  padding: "8px 12px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const deleteBtn = {
  backgroundColor: "#e53935",
  color: "#fff",
  padding: "8px 12px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const saveBtn = {
  backgroundColor: "#4caf50",
  color: "#fff",
  padding: "8px 12px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const cancelBtn = {
  backgroundColor: "#9e9e9e",
  color: "#fff",
  padding: "8px 12px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

export default TaskList;
