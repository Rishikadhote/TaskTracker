import React, { useState } from "react";
import API from "../services/api";

function TimerButton({ taskId }) {
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [loggedTime, setLoggedTime] = useState(null); // ⬅ to store total time

  const handleStart = async () => {
    await API.post(`/tasks/${taskId}/start`);
    setStartTime(new Date());
    setIsRunning(true);
  };

  const handleStop = async () => {
    const res = await API.post(`/tasks/${taskId}/stop`);
    const totalTime = res.data?.total_time || "00:00:00";
    setLoggedTime(totalTime); // ⬅ update time for UI
    setStartTime(null);
    setIsRunning(false);
  };

  return (
    <div>
      {isRunning ? (
        <button onClick={handleStop} style={stopStyle}>Stop Timer</button>
      ) : (
        <button onClick={handleStart} style={startStyle}>Start Timer</button>
      )}
      {loggedTime && (
        <p style={{ marginTop: "6px", fontSize: "14px", color: "#333" }}>
           Last Time Logged: {loggedTime}
        </p>
      )}
    </div>
  );
}

const startStyle = {
  background: "#43a047",
  color: "#fff",
  padding: "8px 14px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  marginTop: "10px"
};

const stopStyle = {
  ...startStyle,
  background: "#e53935"
};

export default TimerButton;
