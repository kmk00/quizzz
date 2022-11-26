import React from "react";

function Question(props) {
  const { question, all_answers, is_answered, correct_answer } = props.item;

  const displayAnswers = all_answers.map((answer) => (
    <button
      className="answer-btn"
      key={answer}
      value={answer}
      onClick={props.handleAnswer}
      disabled={is_answered}
      style={
        is_answered
          ? answer === correct_answer
            ? { backgroundColor: "var(--correct)" }
            : { backgroundColor: "var(--wrong)" }
          : { backgroundColor: "var(--white)" }
      }
    >
      {answer}
    </button>
  ));

  return (
    <div className="question-container">
      <h2>{question}</h2>
      <div className="answer-container">{displayAnswers}</div>
    </div>
  );
}

export default Question;
