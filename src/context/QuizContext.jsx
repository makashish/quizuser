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
  const [timeLeft, setTimeLeft] = useState(null); // initially null
  const [defaultTime, setDefaultTime] = useState(3600); // JSON se aayega
  const [apiBaseUrl, setApiBaseUrl] = useState(null);

  // ✅ Load time.json once
  useEffect(() => {
    fetch("/time.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load time.json");
        return res.json();
      })
      .then((data) => {
        if (data.TIME_LEFT) {
          setDefaultTime(data.TIME_LEFT);
          setTimeLeft(data.TIME_LEFT);
        }
      })
      .catch((err) => console.error("❌ Time JSON load error:", err));
  }, []);

  // ✅ Load config.json
  useEffect(() => {
    fetch("/config.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load config.json");
        return res.json();
      })
      .then((config) => {
        setApiBaseUrl(config.API_BASE_URL);
      })
      .catch((err) => console.error(err));
  }, []);

  // ✅ Fetch questions from API
  useEffect(() => {
    if (!apiBaseUrl) return;

    axios
      .get(`${apiBaseUrl}/api/questions`)
      .then((res) => {
        const data = res.data;
        if (Array.isArray(data) && data.length > 0) {
          setQuestions(data);
          const initialStatus = {};
          data.forEach((q) => {
            initialStatus[q.id] = "blue";
          });
          setStatus(initialStatus);
          setQuizStarted(false);
          setQuizSubmitted(false);
          setAnswers({});
          setTimeLeft(defaultTime); // JSON se aaya hua value use karo
          setCurrentQuestion(0);
        } else {
          console.error("❌ No questions received from server.");
        }
      })
      .catch((err) => console.error("❌ Failed to load questions:", err.message));
  }, [apiBaseUrl, defaultTime]);

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
    setTimeLeft(defaultTime); // JSON ka value
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