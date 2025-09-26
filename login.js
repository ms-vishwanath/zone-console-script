(async () => {
    try {
      console.log("Submitting...");
  
      const response = await fetch("https://zoneapi.intecai.in/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: "vishwanath@intecai.in",
          password: "Vish#2004"
        })
      });
  
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  
      const data = await response.json();
      console.log("Response:", data);
      window.location.href = "https://zone.intecai.in/add-task";
      localStorage.setItem("undefined", data.token);
      console.log("Login successful, token saved");
    } catch (error) {
      console.error("Form submission error:", error);
    }
  })();