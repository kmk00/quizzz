import React from "react";

function Answer(props) {
  const styles = {
    backgroundColor: props.disable
      ? props.answer === props.correct_answer
        ? "var(--correct)"
        : "var(--wrong)"
      : "var(--white)",
  };

  return (
    <button
      className={`answer-btn`}
      style={styles}
      key={props.answer}
      value={props.answer}
      disabled={props.disable}
      onClick={props.fun}
    >
      {props.answer}
    </button>
  );
}

export default Answer;
