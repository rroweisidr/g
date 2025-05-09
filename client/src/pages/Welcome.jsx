import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleStart = async () => {
    if (!name) return;
    await fetch("http://localhost:5000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    localStorage.setItem("userName", name);
    navigate("/dashboard");
  };

  return (
    <div>
      <h1>Welcome</h1>
      <input placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={handleStart}>Start</button>
    </div>
  );
}
