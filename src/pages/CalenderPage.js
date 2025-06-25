import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import API from "../services/api";

function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const yyyy_mm_dd = selectedDate.toISOString().split("T")[0];

    API.get(`/tasks/logs?date=${yyyy_mm_dd}`)
      .then((res) => setLogs(res.data))
      .catch((err) => console.error("Failed to fetch logs", err));
  }, [selectedDate]);

  return (
    <div className="container">
      <h2> View Time Logs by Date</h2>
      <Calendar onChange={setSelectedDate} value={selectedDate} />

      <h3 style={{ marginTop: "20px" }}>
        Logs for {selectedDate.toDateString()}
      </h3>

      {logs.length === 0 ? (
        <p>No logs found for this day.</p>
      ) : (
        <ul>
          {logs.map((log, index) => (
            <li key={index} style={logStyle}>
              <strong>{log.name}</strong> ({log.category || "General"})<br />
              Start: {new Date(log.start_time).toLocaleTimeString()}<br />
              End: {log.end_time ? new Date(log.end_time).toLocaleTimeString() : "In progress"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const logStyle = {
  background: "#f9f9f9",
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "10px",
  margin: "10px 0",
};

export default CalendarPage;
