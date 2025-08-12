import React from "react";
import { useQuiz } from "../context/QuizContext";
import { useTranslation } from "react-i18next";

export default function StartPage() {
  const { startQuiz, questions } = useQuiz();
  const { t } = useTranslation();

  return (
    <div style={{ padding: "4rem", maxWidth: "800px", margin: "auto" }}>
      <h1>{t("quiz_instructions")}</h1>
      <h5>{t("app_instructions")}</h5>
      

      <p>{t("total_questions")}: <strong>{questions.length}</strong></p>
      <p>{t("total_time")}: <strong>{t("quiz_duration")}{t("minutes")}</strong></p>

      <ul>
        <li><span style={{ color: "green" }}>🟩 {t("status_answered")}</span></li>
        <li><span style={{ color: "darkgoldenrod" }}>🟨 {t("status_current")}</span></li>
        <li><span style={{ color: "blue" }}>🟦 {t("status_not_seen")}</span></li>
        <li><span style={{ color: "red" }}>🟥 {t("status_seen_not_answered")}</span></li>
      </ul>

      <button
        onClick={startQuiz}
        style={{
          marginTop: "2rem",
          padding: "1rem 2rem",
          alignItems:"center",
          fontSize: "1.5rem",
          backgroundColor: "#679105ff",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        {t("start quiz")}
      </button>
    </div>
  );
}