# 🕒 **Task Timer Tracker – Productivity Monitor**

A full-stack productivity app to track time spent on various tasks. Includes features like task categorization, real-time timer logging, daily summaries, and charts.

---

## 📸 **Live Demo**

🔗 **Frontend:** [https://rishikadhote.github.io/TaskTracker](https://rishikadhote.github.io/TaskTracker)  
🔗 **Backend API:** _Coming Soon (Render/Railway link)_

---

## 📌 **Features**

- ✅ Add, Edit, Delete tasks
- ✅ Start/Stop task timer with automatic time log creation
- ✅ View total time spent per task
- ✅ Categorize tasks (Work, Study, Break)
- ✅ Pie/Bar chart for category-wise time spent
- ✅ Calendar view and summary table (optional)
- ✅ Fully responsive and clean UI

---

## 🔧 **Tech Stack**

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | React, Axios, Chart.js, React Router |
| Backend   | Node.js, Express.js               |
| Database  | MySQL (via MySQL Workbench)       |
| Hosting   | GitHub Pages (Frontend), Render/Railway (Backend) |

---

## 🏗️ **Folder Structure**

TaskTracker/
├── backend/
│ ├── db/
│ ├── routes/
│ ├── controllers/
│ ├── index.js
│ └── .env
├── frontend/
│ ├── components/
│ ├── pages/
│ ├── services/
│ ├── App.js
│ ├── index.js
│ └── index.css
└── README.md

---

## 🗃️ **Database Schema**

```sql
CREATE DATABASE task_tracker;

USE task_tracker;

CREATE TABLE tasks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE time_logs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  task_id INT NOT NULL,
  task_name VARCHAR(255),
  start_time DATETIME,
  end_time DATETIME,
  FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE
);
```

## 📦 Setup Instructions

### 🖥️ Frontend

```bash
cd frontend
npm install
npm start

```
---

###  **Author Section (Code Version)**

```markdown
##  Author

**Rishika Dhote**  
📧 rishikadhote@example.com  
🔗 [GitHub](https://github.com/Rishikadhote)
```