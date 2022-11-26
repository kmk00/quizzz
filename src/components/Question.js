import React from "react";
//import Answer from "./Answer";

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

// import React from "react";
// import Answer from "./Answer";

// function Question(props) {
//   const { question, all_answers, correct_answer, is_answered } = props.item;

//   function shuffle(array) {
//     return array.sort(() => Math.random() - 0.5);
//   }

//   const displayAnswers = shuffle(all_answers).map((answer) => (
//     <Answer
//       key={answer}
//       answer={answer}
//       correct_answer={correct_answer}
//       disable={is_answered ? true : false}
//       fun={props.log}
//     ></Answer>
//   ));

//   return (
//     <div className="question-container">
//       <h1>{question}</h1>
//       <div className="answer-container">{displayAnswers}</div>
//     </div>
//   );
// }

// export default Question;
