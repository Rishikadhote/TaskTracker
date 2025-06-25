import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Bar, Pie } from "react-chartjs-2";
import TimeSummaryTable from "../components/TimeSummaryTable";
import {
  Chart,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function AnalyticsPage() {
  const [summary, setSummary] = useState([]);
  const [categorySummary, setCategorySummary] = useState([]);

  useEffect(() => {
    API.get("/tasks/summary").then((res) => {
      const formatted = res.data.map((task) => {
        const [h = 0, m = 0, s = 0] = task.total_time
          ?.split(":")
          .map((x) => parseInt(x)) || [0, 0, 0];
        const total_minutes = (h * 60 + m + s / 60).toFixed(2);
        return { ...task, total_minutes };
      });
      setSummary(formatted);
    });

    API.get("/tasks/category-summary").then((res) => {
      setCategorySummary(res.data);
    });
  }, []);

  const barData = {
    labels: summary.map((task) => task.name),
    datasets: [
      {
        label: "Total Time Spent (minutes)",
        data: summary.map((task) => task.total_minutes),
        backgroundColor: "#42a5f5",
        borderRadius: 6,
      },
    ],
  };

  const pieData = {
    labels: categorySummary.map((cat) => cat.category),
    datasets: [
      {
        label: "Time per Category (minutes)",
        data: categorySummary.map((cat) => cat.total_minutes),
        backgroundColor: [
          "#ff6384",
          "#36a2eb",
          "#ffcd56",
          "#4bc0c0",
          "#9966ff",
          "#f67019",
        ],
      },
    ],
  };

  return (
    <div className="container">
      <h2>Productivity Analytics</h2>
      <Bar data={barData} options={{ responsive: true }} />
      <hr />
      <h3>Time Spent per Category</h3>
      <Pie data={pieData} options={{ responsive: true }} />
      <hr />
      <TimeSummaryTable summary={summary} />
    </div>
  );
}

export default AnalyticsPage;
