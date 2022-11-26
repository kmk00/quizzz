import React, { useState, useEffect } from "react";
import Question from "./components/Question";
import "./style.css";
import uniqid from "uniqid";

function App() {
  const [isQuiz, setIsQuizz] = useState(false);
  const [questions, setQuestions] = useState(null);
  const [category, setCategory] = useState(10);
  const [generateNew, setGenerateNew] = useState(false);

  // --- Helper functions ---

  function encode(toEncode) {
    toEncode = toEncode
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&rsquo;/g, "’")
      .replace(/&amp;/g, "&")
      .replace(/&uuml;/g, "ü")
      .replace(/&ldquo;/g, "”")
      .replace(/&aacute/g, "á");

    return toEncode;
  }

  function shuffle(array) {
    //used for shuffling answer options
    return array.sort(() => Math.random() - 0.5);
  }

  // --- Handle functions ---

  function handleQuiz() {
    setIsQuizz((prev) => !prev);
  }

  function handleAnswer(ans) {
    //check answer
    setQuestions((oldQuestions) =>
      oldQuestions.map((question) => {
        return ans === question.id
          ? { ...question, is_answered: true }
          : question;
      })
    );
  }

  function handleCategory(event) {
    setCategory(event.target.value);
  }

  function handleGenerateNew() {
    setGenerateNew((prev) => !prev);
  }

  useEffect(() => {
    if (isQuiz) {
      fetch(`https://opentdb.com/api.php?amount=5&category=${category}`)
        .then((res) => res.json())
        .then((data) => data.results)
        .then((data) => {
          const newArray = data.map((singleQuestion) => {
            const { question, correct_answer, incorrect_answers } =
              singleQuestion;
            let allAnswers = shuffle([
              ...incorrect_answers,
              correct_answer,
            ]).map((answer) => encode(answer));
            return {
              id: uniqid(),
              question: encode(question),
              correct_answer: correct_answer,
              all_answers: allAnswers,
              is_answered: false,
              correct: false,
            };
          });
          return newArray;
        })
        .then((data) => setQuestions(data));
    } else {
      setQuestions(null);
    }
  }, [isQuiz, generateNew, category]);

  return (
    <main>
      {questions !== null &&
        questions.map((item) => (
          <Question
            key={item.id}
            item={item}
            handleAnswer={() => handleAnswer(item.id)}
          />
        ))}
      {!isQuiz && (
        <>
          <h1>Select Topic</h1>
          <form>
            <select
              value={category}
              onChange={handleCategory}
              name="category"
              id="topic"
            >
              <option value={21}>Sport</option>
              <option value={22}>Geography</option>
              <option value={11}>Books</option>
              <option value={12}>Music</option>
              <option value={14}>Television</option>
              <option value={15}>Video Games</option>
            </select>
          </form>
        </>
      )}
      <div className="btn-container">
        <button id="main-btn" onClick={handleQuiz}>
          {isQuiz ? "Go Back" : "Generate Questions"}
        </button>
        {isQuiz && (
          <button id="generate-btn" onClick={handleGenerateNew}>
            Generate New
          </button>
        )}
      </div>
    </main>
  );
}

export default App;
