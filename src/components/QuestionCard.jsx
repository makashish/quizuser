import React from "react";
import { useQuiz } from "../context/QuizContext";
import { useTranslation } from "react-i18next";

export default function QuestionCard({ question }) {
  const { answers, selectAnswer } = useQuiz();
  const { i18n, t } = useTranslation();

  if (!question) return null;

  const lang = i18n.language;
  const selected = answers[question.id];
  const questionText = question.question[lang] || question.question["en"];
  const options = question.options[lang] || question.options["en"];

  const isSelected = (opt) => selected === opt;

  return (
    <div style={{ maxWidth: "1200px", margin: "auto", padding: "1rem" }}>
      <h2>
        {t("question")} {question.id}:
      </h2>
      <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>{questionText}</p>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => selectAnswer(question.id, opt)}
            style={{
              padding: "0.75rem 1rem",
              textAlign: "left",
              backgroundColor: isSelected(opt) ? "#4caf50" : "#f1f1f1",
              color: isSelected(opt) ? "white" : "black",
              border: "1px solid #ccc",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}