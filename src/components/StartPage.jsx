import React, { useEffect, useState } from "react";
import { useQuiz } from "../context/QuizContext";
import { useTranslation } from "react-i18next";

export default function StartPage() {
  const { startQuiz, questions } = useQuiz();
  const { t } = useTranslation();

  const [quizTime, setQuizTime] = useState(null); // quiz duration from public JSON

  // Fetch quiz time from public folder
  useEffect(() => {
    fetch("/quiz-time.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load quiz-time.json");
        return res.json();
      })
      .then((data) => {
        if (data.QUIZ_DURATION) {
          setQuizTime(data.QUIZ_DURATION);
        }
      })
      .catch((err) => console.error("❌ Error loading quiz-time.json:", err));
  }, []);

  return (
    <div style={{ padding: "4rem", maxWidth: "800px", margin: "auto" }}>
      <h1>{t("quiz_instructions")}</h1>
      <h5>{t("app_instructions")}</h5>

      <p>
        {t("total_questions")}: <strong>{questions.length}</strong>
      </p>
      <p>
        {t("total_time")}:{" "}
        <strong>
          {quizTime !== null ? quizTime : t("quiz_duration")} {t("minutes")}
        </strong>
      </p>

      <ul>
        <li>
          <span style={{ color: "green" }}>🟩 {t("status_answered")}</span>
        </li>
        <li>
          <span style={{ color: "darkgoldenrod" }}>
            🟨 {t("status_current")}
          </span>
        </li>
        <li>
          <span style={{ color: "blue" }}>🟦 {t("status_not_seen")}</span>
        </li>
        <li>
          <span style={{ color: "red" }}>
            🟥 {t("status_seen_not_answered")}
          </span>
        </li>
      </ul>

      <button
        onClick={startQuiz}
        style={{
          marginTop: "2rem",
          padding: "1rem 2rem",
          alignItems: "center",
          fontSize: "1.5rem",
          backgroundColor: "#679105ff",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        {t("start quiz")}
      </button>
    </div>
  );
}