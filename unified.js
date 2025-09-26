// allow pasting

(async () => {
  // Credentials and tasks array
  const email = "vishwanath@intecai.in";
  const password = "Vish#2004";
  const tasks = [
    {
      name: "TEST 2",
      des: "TEST 2",
      st_time: "2025-09-26T08:10:00.000Z",
      en_time: "2025-09-26T08:12:00.000Z",
      type: "66fe8d12c33f43731d10f9ce",
      status: "completed",
      timespent: "2025-09-26T00:01:00.000Z",
      priority: "high",
      project: "66ffd19bc33f43731d114f47"
    },
    {
      name: "TEST 3",
      des: "TEST 3",
      st_time: "2025-09-26T08:13:00.000Z",
      en_time: "2025-09-26T08:15:00.000Z",
      type: "66fe8d12c33f43731d10f9ce",
      status: "completed",
      timespent: "2025-09-26T00:01:00.000Z",
      priority: "high",
      project: "66ffd19bc33f43731d114f47"
    }
  ];

  // Helper: login and return token
  async function loginAndGetToken() {
    console.log("Logging in...");
    const response = await fetch("https://zoneapi.intecai.in/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });
    if (!response.ok) throw new Error(`Login failed: ${response.status}`);
    const data = await response.json();
    if (!data.token) throw new Error("No token in login response");
    localStorage.setItem("undefined", data.token);
    console.log("Login successful, token saved");
    return data.token;
  }

  // Helper: add a single task
  async function addTask(token, task) {
    const response = await fetch("https://zoneapi.intecai.in/task/add/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Holder": `holder ${token} Organization-tasks-traffic`,
      },
      body: JSON.stringify(task)
    });
    if (!response.ok) throw new Error(`Add task failed: ${response.status}`);
    const data = await response.json();
    console.log("Task created successfully:", data);
    return data;
  }

  try {
    let token = localStorage.getItem("undefined");
    if (!token) {
      token = await loginAndGetToken();
    } else {
      console.log("Token found in localStorage, skipping login.");
    }

    for (let i = 0; i < tasks.length; i++) {
      try {
        await addTask(token, tasks[i]);
      } catch (err) {
        console.error(`Error adding task ${i + 1}:`, err);
      }
    }
    console.log("All tasks processed.");
  } catch (error) {
    console.error("Error in unified flow:", error);
  }
})();
