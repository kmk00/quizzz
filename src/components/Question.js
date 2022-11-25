import React from "react";

function Question(props) {
  const { question, all_answers, correct_answer } = props.item;
  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  const answers = shuffle(all_answers).map((answer) => (
    <button className="answer-btn" key={answer}>
      {answer}
    </button>
  ));

  return (
    <div className="question-container">
      <h1>{question}</h1>
      <div className="answer-container">{answers}</div>
    </div>
  );
}

export default Question;
