import React from "react";
import { useQuiz } from "../context/QuizContext";
import { useTranslation } from "react-i18next";

export default function ResultPage() {
  const { questions, answers } = useQuiz();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const total = questions.length;

  const correct = questions.filter((q) => {
    const userAnswer = answers[q.id];
    const correctAnswer = q.answer[lang] || q.answer["en"];
    return userAnswer && userAnswer === correctAnswer;
  }).length;

  const incorrectOrEmpty = total - correct;

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
      <h1>🎉 {t("quiz_complete")}</h1>

      <p>{t("total_questions")}: <strong>{total}</strong></p>
      <p>{t("correct_answers")}: <strong>{correct}</strong></p>
      <p>{t("incorrect_answers")}: <strong>{incorrectOrEmpty}</strong></p>

      <h3>📝 {t("summary")}</h3>
      <ul>
        {questions.map((q) => {
          const questionText = q.question[lang] || q.question["en"];
          const correctAns = q.answer[lang] || q.answer["en"];
          const userAns = answers[q.id];

          return (
            <li key={q.id} style={{ marginBottom: "15px" }}>
              <strong>{q.id}. {questionText}</strong><br />
              {t("your_answer")}: <strong>{userAns || t("not_answered")}</strong><br />
              {t("correct_answer")}: <strong>{correctAns}</strong>
            </li>
          );
        })}
      </ul>
    </div>
  );
}