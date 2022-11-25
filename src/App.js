import React, { useState, useEffect } from "react";
import Question from "./components/Question";
import "./style.css";
import uniqid from "uniqid";

function App() {
  const [questions, setQuestions] = useState(null);
  const [isQuiz, setIsQuizz] = useState(true);

  useEffect(() => {
    //Fetch data from API and exclude determine question and answers

    fetch("https://opentdb.com/api.php?amount=10")
      .then((res) => res.json())
      .then((data) => data.results)
      .then((que) => {
        const newArray = que.map((q) => {
          const { question, correct_answer, incorrect_answers } = q;
          let allAnswers = [...incorrect_answers, correct_answer];
          return {
            id: uniqid(),
            question: question,
            correct_answer: correct_answer,
            all_answers: allAnswers,
          };
        });
        return newArray;
      })
      .then((data) => setQuestions(data));
  }, [isQuiz]);

  function handleQuiz() {
    setIsQuizz((prev) => !prev);
  }

  return (
    <main>
      {questions !== null &&
        questions.map((item) => <Question key={item.id} item={item} />)}
      <button id="main-btn" onClick={handleQuiz}>
        {isQuiz ? "Submit" : "Generate Questions"}
      </button>
    </main>
  );
}

export default App;
