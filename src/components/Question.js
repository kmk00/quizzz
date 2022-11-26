import React from "react";
import Answer from "./Answer";

function Question(props) {
  const { question, all_answers, correct_answer, is_answered } = props.item;

  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  const displayAnswers = shuffle(all_answers).map((answer) => (
    <Answer
      key={answer}
      answer={answer}
      correct_answer={correct_answer}
      disable={is_answered ? true : false}
      fun={props.log}
    ></Answer>
  ));

  return (
    <div className="question-container">
      <h1>{question}</h1>
      <div className="answer-container">{displayAnswers}</div>
    </div>
  );
}

export default Question;
