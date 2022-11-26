import React, { useState, useEffect } from "react";
import Question from "./components/Question";
import "./style.css";
import uniqid from "uniqid";

function App() {
  const [isQuiz, setIsQuizz] = useState(false);
  const [questions, setQuestions] = useState(null);

  useEffect(() => {
    //Fetch data from API and exclude determine question and answers
    if (isQuiz) {
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
              is_answered: false,
              point: 0,
            };
          });
          return newArray;
        })
        .then((data) => setQuestions(data));
    } else {
      setQuestions(null);
    }

    console.log(isQuiz);
  }, [isQuiz]);

  function handleQuiz() {
    setIsQuizz((prev) => !prev);
  }

  function log(correct_answer) {
    // setQuestions(prevQuestions => prevQuestions.map(question =>{
    //   return question.
    // }))

    console.log(correct_answer);
  }

  return (
    <main>
      {questions !== null &&
        questions.map((item) => (
          <Question
            key={item.id}
            item={item}
            log={() => log(item.correct_answer)}
          />
        ))}
      <button id="main-btn" onClick={handleQuiz}>
        {isQuiz ? "Submit" : "Generate Questions"}
      </button>
    </main>
  );
}

export default App;
