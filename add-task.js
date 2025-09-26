

(async () => {
    try {
      const token = localStorage.getItem("undefined");
      if (!token) throw new Error("No auth token found in localStorage");
  
      const response = await fetch("https://zoneapi.intecai.in/task/add/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Holder": `holder ${token} Organization-tasks-traffic`,
        },
        body: JSON.stringify({
          name: "COOL",
          des: "COOL",
          st_time: "2025-09-26T08:04:00.000Z",
          en_time: "2025-09-26T08:06:00.000Z",
          type: "66fe8d12c33f43731d10f9ce",
          status: "completed",
          timespent: "2025-09-26T00:01:00.000Z",
          priority: "high",
          project: "66ffd19bc33f43731d114f47"
        })
      });
  
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  
      const data = await response.json();
      console.log("Task created successfully:", data);
  
    } catch (error) {
      console.error("Error creating task:", error);
    }
  })();
  