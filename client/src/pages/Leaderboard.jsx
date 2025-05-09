import { useEffect, useState } from "react";

export default function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/users/leaderboard")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setUsers(data);
        else setUsers([]); // fallback if API fails
      });
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      <ol>
        {users.map((user) => (
          <li key={user._id}>
            {user.name}: {user.score}
          </li>
        ))}
      </ol>
    </div>
  );
}
