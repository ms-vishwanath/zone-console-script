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
    name: "PRE PROD TEST 2",
    des: "TEST 2",
    st_time: "T08:10:00.000Z",
    en_time: "T08:12:00.000Z",
    type: "66fe8d12c33f43731d10f9ce",
    status: "completed",
    timespent: "2025-09-26T00:01:00.000Z",
    priority: "high",
    project: "66ffd19bc33f43731d114f47"
  },
  {
    name: "PRE PROD TEST 2",
    des: "TEST 3",
    st_time: "T08:13:00.000Z",
    en_time: "T08:15:00.000Z",
    type: "66fe8d12c33f43731d10f9ce",
    status: "completed",
    timespent: "2025-09-26T00:01:00.000Z",
    priority: "high",
    project: "66ffd19bc33f43731d114f47"
  }
];

// Prefix todayDate to st_time and en_time for all tasks before requesting
function prefixTasksWithDate(tasks, todayDate) {
  return tasks.map(task => ({
    ...task,
    todayDate,
    st_time: `${todayDate}${task.st_time}`,
    en_time: `${todayDate}${task.en_time}`
  }));
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

  const tasksWithDate = prefixTasksWithDate(tasks, todayDate);

  for (let i = 0; i < tasksWithDate.length; i++) {
    await addTask(token, tasksWithDate[i]);
  }

  console.log("All tasks processed.");
})();
