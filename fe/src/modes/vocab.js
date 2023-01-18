import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { nextVocab } from "../store/kanji/vocabLists";
import { updateScore } from "../store/tracker/tracking";

function Vocab() {
  const dispatch = useDispatch();
  const level = useSelector((state) => state.menuSlice.level);
  const difficulty =
    level === 1 ? "beginner" : level === 2 ? "intermediate" : "advanced";
  const vocab = useSelector((state) => state.vocabSlice.next1[difficulty]);
  const score = useSelector((state) => state.trackingSlice[difficulty]);
  const answerPool = useSelector(
    (state) => state.vocabSlice.answerPool[difficulty]
  );
  const [attempted, setAttempted] = useState(false);
  const [questionNum, setQuestionNum] = useState(1);
  const [wrongIdx, setWrongIdx] = useState(99);
  const [correctIdx, setCorrectIdx] = useState(99);

  useEffect(() => {
    dispatch(nextVocab(difficulty));
  }, [difficulty, questionNum]); // eslint-disable-line

  function checkAnswer(e, input, idx) {
    if (input === vocab[0]) {
      dispatch(updateScore([difficulty, 1]));
      setCorrectIdx(idx);
    } else {
      dispatch(updateScore([difficulty, 0]));
      setWrongIdx(idx);
      const correctIndex = answerPool.indexOf(vocab[0]);
      setCorrectIdx(correctIndex);
    }
    setAttempted(true);
  }

  function goNext() {
    setAttempted(false);
    setWrongIdx(99);
    setCorrectIdx(99);
    setQuestionNum(questionNum + 1);
  }

  return (
    <div className="sub-display">
      <div className="vocab-word">{vocab[1]["meaning"]}</div>
      <div className="vocab-bot">
        <div className="vocab-instructions">
          choose the vocab from the choices below that best matches the english
          definition above
        </div>
        <div className="vocab-answer-pool">
          {answerPool.map((choice, idx) => {
            return (
              <div
                className={
                  idx === correctIdx
                    ? "vocab-correct-choice"
                    : idx === wrongIdx
                    ? "vocab-wrong-choice"
                    : "vocab-answer-choice"
                }
                key={`choice-${idx}`}
                onClick={
                  attempted
                    ? null
                    : (e) => {
                        checkAnswer(e, choice, idx);
                      }
                }
              >
                {choice}
              </div>
            );
          })}
        </div>
        {attempted && (
          <>
            <div
              className="vocab-next-button"
              onClick={() => {
                goNext();
              }}
            >
              next
            </div>
            <div className="score-box">
              {difficulty}: {score.correct} / {score.total}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Vocab;
