import { useState } from "react";
import { useNavigate } from "react-router-dom";

const vocab = [
  { de: "Hund", ar: "كلب" },
  { de: "Katze", ar: "قطة" },
  { de: "Haus", ar: "منزل" },
  { de: "Apfel", ar: "تفاحة" },
];

export default function VocabularyGame() {
  const [matches, setMatches] = useState({});
  const [showScore, setShowScore] = useState(false);
  const navigate = useNavigate();

  const handleMatch = (de, ar) => {
    setMatches({ ...matches, [de]: ar });
  };

  const handleFinish = async () => {
    let score = 0;
    vocab.forEach(({ de, ar }) => {
      if (matches[de] === ar) score++;
    });
    const name = localStorage.getItem("userName");
    await fetch("http://localhost:5000/api/users/score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, score }),
    });
    setShowScore(score);
  };

  return (
    <div>
      <h3>Match German with Arabic</h3>
      {vocab.map(({ de }) => (
        <div key={de}>
          {de} →
          <select onChange={(e) => handleMatch(de, e.target.value)} defaultValue="">
            <option disabled value="">
              Choose Arabic
            </option>
            {vocab.map(({ ar }) => (
              <option key={ar} value={ar}>
                {ar}
              </option>
            ))}
          </select>
        </div>
      ))}
      <button onClick={handleFinish}>Finish</button>
      {showScore !== false && <p>Your score: {showScore}/{vocab.length}</p>}
    </div>
  );
}
