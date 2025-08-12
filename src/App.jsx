import React from "react";
import StartPage from "./components/StartPage";
import QuizPage from "./components/QuizPage";
import ResultPage from "./components/ResultPage";
import { useQuiz } from "./context/QuizContext";
import { useTranslation } from "react-i18next";

export default function App() {
  const { questions, quizStarted, quizSubmitted } = useQuiz();
  const { i18n, t } = useTranslation();

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  // ✅ Show loader until questions are fetched
  if (questions.length === 0) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <p>{t("loading") || "Loading quiz..."}</p>
      </div>
    );
  }

  // ✅ Page routing based on quiz state
  let CurrentPage = <StartPage />;
  if (quizStarted && !quizSubmitted) {
    CurrentPage = <QuizPage />;
  } else if (quizSubmitted && questions.length > 0) {
    CurrentPage = <ResultPage />;
  }

  return (
    <div className="app-container" style={{ padding: "1rem" }}>
      <div style={{ textAlign: "right", marginBottom: "1rem" }}>
        <label htmlFor="lang" style={{ marginRight: "0.5rem" }}>
          🌐 {t("language_select")}:
        </label>
        <select
          id="lang"
          onChange={changeLanguage}
          defaultValue={i18n.language}
        >
          <option value="en">English</option>
          <option value="hi">हिन्दी</option>
          <option value="gu">ગુજરાતી</option>
          <option value="bn">বাংলা</option>
          <option value="ta">தமிழ்</option>
          <option value="te">తెలుగు</option>
          <option value="pa">ਪੰਜਾਬੀ</option>
          <option value="or">ଓଡ଼ିଆ</option>
          <option value="as">অসমীয়া</option>   
          <option value="kn">ಕನ್ನಡ</option>     
          <option value="ml">മലയാളം</option>    
          <option value="mr">मराठी</option>       
          <option value="ne">नेपाली</option>      
          <option value="ur">اردو</option>        
          <option value="sa">संस्कृतम्</option>    
        </select>
      </div>

      {CurrentPage}
    </div>
  );
}