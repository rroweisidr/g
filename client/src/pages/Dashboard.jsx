import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={() => navigate("/game")}>Start Vocabulary Game</button>
      <button onClick={() => navigate("/leaderboard")}>View Leaderboard</button>
    </div>
  );
}
