import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [status, setStatus] = useState({});
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes

  // ✅ Load questions from MongoDB API
  useEffect(() => {
  axios.get(`${import.meta.env.VITE_API_BASE}/api/questions`)
    .then((res) => {
      const data = res.data;
      if (Array.isArray(data) && data.length > 0) {
        setQuestions(data);
        const initialStatus = {};
        data.forEach((q) => {
          initialStatus[q.id] = "blue"; // Not seen
        });
        setStatus(initialStatus);
        setQuizStarted(false);
        setQuizSubmitted(false);
        setAnswers({});
        setTimeLeft(1800);
        setCurrentQuestion(0);
      } else {
        console.error("❌ No questions received from server.");
      }
    })
    .catch((err) => {
      console.error("❌ Failed to load questions:", err.message);
    });
}, []);
  // ✅ Timer logic
  useEffect(() => {
    if (!quizStarted || quizSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setQuizSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizStarted, quizSubmitted]);

  // ✅ Actions
  const startQuiz = () => {
    if (questions.length === 0) return;
    setQuizStarted(true);
    setQuizSubmitted(false);
    setTimeLeft(1800);
    setAnswers({});
    setCurrentQuestion(0);
  };

  const selectAnswer = (questionId, option) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
    setStatus((prev) => ({ ...prev, [questionId]: "green" }));
  };

  const visitQuestion = (id) => {
    setCurrentQuestion(id - 1);
    setStatus((prev) => {
      const current = prev[id];
      if (current === "blue") {
        return { ...prev, [id]: "red" };
      }
      return prev;
    });
  };

  const markCurrentAsYellow = () => {
    const qid = questions[currentQuestion]?.id;
    if (qid) {
      setStatus((prev) => ({
        ...prev,
        [qid]: prev[qid] === "green" ? "green" : "yellow",
      }));
    }
  };

  const submitQuiz = () => setQuizSubmitted(true);

  return (
    <QuizContext.Provider
      value={{
        questions,
        currentQuestion,
        setCurrentQuestion,
        answers,
        selectAnswer,
        status,
        visitQuestion,
        quizStarted,
        startQuiz,
        quizSubmitted,
        submitQuiz,
        timeLeft,
        markCurrentAsYellow,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);