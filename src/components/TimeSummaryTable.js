import React from "react";

function TimeSummaryTable({ summary }) {
  return (
    <div>
      <h3> Time Summary Table</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Category</th>
            <th>Total Time Spent (min)</th>
          </tr>
        </thead>
        <tbody>
          {summary.map((task) => (
            <tr key={task.id}>
              <td>{task.name}</td>
              <td>{task.category || "General"}</td>
              <td>{task.total_minutes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px",
  backgroundColor: "#fff",
  borderRadius: "8px",
  overflow: "hidden",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
};

export default TimeSummaryTable;
