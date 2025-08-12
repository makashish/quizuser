import React from "react";
import { useQuiz } from "../context/QuizContext";

export default function QuestionGrid() {
  const { questions, status, visitQuestion, currentQuestion } = useQuiz();

  const getColorClass = (qid) => {
    const currentId = questions[currentQuestion]?.id;
    if (qid === currentId) return "yellow";
    return status[qid] || "blue";
  };

  return (
    <div className="question-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, .1fr)", gap: "3px" }}>
      {questions.map((q) => (
        <button
          key={q.id}
          onClick={() => visitQuestion(q.id)}
          style={{
            padding: "0.1rem",
            fontWeight: "bold",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            backgroundColor: getButtonColor(getColorClass(q.id)),
            color: "white"
          }}
        >
          {q.id}
        </button>
      ))}
    </div>
  );
}

// Helper to convert status to color
const getButtonColor = (status) => {
  switch (status) {
    case "green":
      return "#4caf50"; // Answered
    case "yellow":
      return "#dbc608ff"; // Currently selected
    case "red":
      return "#f44336"; // Seen but not answered
    case "blue":
    default:
      return "#2196f3"; // Not seen
  }
};