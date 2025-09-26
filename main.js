// save this as task-runner.js

const axios = require("axios");

const BASE_URL = "https://zoneapi.intecai.in";

// Login credentials
const email = "";
const password = "";
const todayDate = new Date().toISOString().split('T')[0];

// Tasks array
const tasks = [
  {
    name: "ARCHITECTURE REFRAMING",
    des: "TEST 2",
    st_time: "T10:10:00.000Z",
    en_time: "T10:12:00.000Z",
    type: "66fe8d12c33f43731d10f9ce",
    status: "completed",
    priority: "high",
    project: "66ffd19bc33f43731d114f47"
  },
  {
    name: "ARCHITECTURE REFRAMING 2",
    des: "TEST 3",
    st_time: "T10:13:00.000Z",
    en_time: "T10:15:00.000Z",
    type: "66fe8d12c33f43731d10f9ce",
    status: "completed",
    priority: "high",
    project: "66ffd19bc33f43731d114f47"
  }
];

// Helper to format duration as ISO 8601 string (e.g., "PT1M30S" or "2025-09-26T00:01:00.000Z")
function getTimespentISO(stDate, enDate) {
  // Calculate the difference in milliseconds
  const diffMs = enDate - stDate;
  if (diffMs < 0) return null;
  // Convert to total seconds
  const totalSeconds = Math.floor(diffMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  // Format as "YYYY-MM-DDT00:MM:SS.000Z" with today's date
  const datePart = stDate.toISOString().split('T')[0];
  const pad = n => n.toString().padStart(2, '0');
  return `${datePart}T${pad(hours)}:${pad(minutes)}:${pad(seconds)}.000Z`;
}

// Prefix todayDate to st_time and en_time for all tasks before requesting, and generate timespent dynamically
function prepareTasks(tasks, todayDate) {
  return tasks.map(task => {
    const st_time_full = `${todayDate}${task.st_time}`;
    const en_time_full = `${todayDate}${task.en_time}`;
    const stDate = new Date(st_time_full);
    const enDate = new Date(en_time_full);
    const timespent = getTimespentISO(stDate, enDate);
    return {
      ...task,
      todayDate,
      st_time: st_time_full,
      en_time: en_time_full,
      timespent
    };
  });
}

async function login() {
  try {
    const res = await axios.post(`${BASE_URL}/auth/signin`, { email, password });
    if (!res.data.token) throw new Error("No token returned");
    console.log("Login successful. Token obtained.");
    return res.data.token;
  } catch (err) {
    console.error("Login error:", err.response ? err.response.data : err.message);
    process.exit(1);
  }
}

async function addTask(token, task) {
  try {
    const res = await axios.post(`${BASE_URL}/task/add/task`, task, {
      headers: {
        "Content-Type": "application/json",
        "Holder": `holder ${token} Organization-tasks-traffic`,
      }
    });
    console.log("Task added:", res.data);
  } catch (err) {
    console.error("Add task error:", err.response ? err.response.data : err.message);
  }
}

(async () => {
  const token = await login();

  const tasksWithDateAndTimespent = prepareTasks(tasks, todayDate);

  for (let i = 0; i < tasksWithDateAndTimespent.length; i++) {
    await addTask(token, tasksWithDateAndTimespent[i]);
  }

  console.log("All tasks processed.");
})();
