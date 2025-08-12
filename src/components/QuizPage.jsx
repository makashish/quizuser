import React from "react";
import { useQuiz } from "../context/QuizContext";
import QuestionCard from "./QuestionCard";
import QuestionGrid from "./QuestionGrid";
import { useTranslation } from "react-i18next";

export default function QuizPage() {
  const {
    questions,
    currentQuestion,
    setCurrentQuestion,
    timeLeft,
    markCurrentAsYellow,
    submitQuiz,
  } = useQuiz();
  const { t } = useTranslation();

  const current = questions[currentQuestion];

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleFinalSubmit = () => {
    const confirmSubmit = window.confirm(
      t("confirm_submit") || "Are you sure you want to submit?"
    );
    if (confirmSubmit) {
      submitQuiz();
    }
  };

  const goToPrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const goToNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  return (
    <div className="quiz-page-container">
      {/* Left panel: Grid and Timer */}
      <div className="quiz-left-panel">
        <h3>{t("question_grid")}</h3>
        <QuestionGrid />
        <div className="time-display">{formatTime(timeLeft)}</div>
      </div>

      {/* Right panel: Question, Nav and Actions */}
      <div className="quiz-right-panel">
        <QuestionCard question={current} />

        {/* Prev/Next Buttons */}
        <div className="quiz-nav-buttons">
          <button onClick={goToPrev} disabled={currentQuestion === 0}>
            ⬅️ {t("previous")}
          </button>
          <button
            onClick={goToNext}
            disabled={currentQuestion === questions.length - 1}
          >
            {t("next")} ➡️
          </button>
        </div>

        {/* Mark and Submit */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
          <button
            onClick={markCurrentAsYellow}
            style={{
              padding: "1rem 2rem",
              backgroundColor: "orange",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            {t("mark_as_reminder") || "Mark as Reminder"}
          </button>

          {currentQuestion === questions.length - 1 && (
            <button
              onClick={handleFinalSubmit}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "green",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              {t("submit_quiz") || "Submit Quiz"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}