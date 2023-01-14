import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { nextKanji } from "../store/kanji/kanjiLists";
import { updateScore } from "../store/tracker/tracking";

function Comprehension() {
  const dispatch = useDispatch();
  const level = useSelector((state) => state.menuSlice.level);
  const difficulty =
    level === 1 ? "beginner" : level === 2 ? "intermediate" : "advanced";
  const kanji = useSelector((state) => state.kanjiSlice.next1[difficulty]);
  const kanjiDict = useSelector((state) => state.kanjiSlice.kanjiDict);
  const score = useSelector((state) => state.trackingSlice[difficulty]);
  const [answerOptions, setAnswerOptions] = useState([]);
  const [clues, setClues] = useState(["clue 1", "clue 2", null]);
  const [revealedClues, setRevealedClues] = useState([false, false, false]);
  const [attempted, setAttempted] = useState(false);
  // used for moving to next set of 5 kanji
  const prevDifficultyLevel = useRef(level);
  const [switchA, setSwitchA] = useState(3);
  const [switchB, setSwitchB] = useState(1);

  useEffect(() => {
    const kanjiVal = kanjiDict[kanji];
    const pool = [kanjiVal[2]];
    const vals = Object.values(kanjiDict);
    while (pool.length < 9) {
      const k = Math.floor(Math.random() * vals.length);
      if (!pool.includes(vals[k][2])) {
        pool.push(vals[k][2]);
      }
    }
    setAnswerOptions(pool.sort((a, b) => 0.5 - Math.random()));
    setClues([kanjiVal[0], kanjiVal[1], null]);
    if (prevDifficultyLevel.current === level) {
      setSwitchB(switchB + 1);
      if (switchA > switchB) {
        setSwitchA(switchA - 1);
      }
    } else {
      prevDifficultyLevel.current = level;
      setSwitchA(3);
      setSwitchB(1);
    }

    return () => {
      if (switchA === switchB) {
        dispatch(nextKanji(difficulty));
        setRevealedClues([false, false, false]);
        setAttempted(false)
      }
    };
  }, [difficulty, switchA]); // eslint-disable-line

  async function getVariants(kanji) {
    const url = `https://kanjiapi.dev/v1/words/${kanji}`;
    try {
      const response = await fetch(url, {
        method: "get",
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (e) {
      return null;
    }
  }

  function checkAnswer(e, input) {
    const element = document.getElementById(e.target.id);
    if (input === kanjiDict[kanji][2]) {
      dispatch(updateScore([difficulty, 1]));
      element.style.backgroundColor = "rgba(72, 181, 66, 0.6)";
      element.style.color = 'white'
    } else {
      dispatch(updateScore([difficulty, 0]));
      element.style.backgroundColor = "rgba(171, 63, 63, 0.4)";
      element.style.color = 'white'
      const index = answerOptions.indexOf(kanjiDict[kanji][2]);
      const correctBox = document.getElementById(`mc-${index}`);
      correctBox.style.backgroundColor = "rgba(72, 181, 66, 0.6)";
      correctBox.style.color = 'white'
    }
    setAttempted(true);
  }

  return (
    <div className="sub-display">
      <div className="comp-top">
        <div className="comp-kanji">{kanji}</div>
        <div className="comp-kanji-clues">
          <div className="kanji-clue">
            <div className="clue-label">kun reading(s)</div>
            {!revealedClues[0] && (
              <div
                className="hidden-clue"
                onClick={() => {
                  setRevealedClues((oldClues) => {
                    const newClues = [...oldClues];
                    newClues[0] = true;
                    return newClues;
                  });
                }}
              >
                click to reveal clue
              </div>
            )}
            {revealedClues[0] && (
              <div className="clue-text">{clues[0] ? clues[0] : "none"}</div>
            )}
          </div>
          <div className="kanji-clue">
            <div className="clue-label">on reading(s)</div>
            {!revealedClues[1] && (
              <div
                className="hidden-clue"
                onClick={() => {
                  setRevealedClues((oldClues) => {
                    const newClues = [...oldClues];
                    newClues[1] = true;
                    return newClues;
                  });
                }}
              >
                click to reveal clue
              </div>
            )}
            {revealedClues[1] && (
              <div className="clue-text">{clues[1] ? clues[1] : "none"}</div>
            )}
          </div>
          <div className="kanji-clue">
            <div className="clue-label">variants / vocabulary</div>
            {!revealedClues[2] && (
              <div
                className="hidden-clue"
                onClick={() => {
                  const showVariants = async () => {
                    const newVal = await getVariants(kanji);
                    const updatedClues = [...clues];
                    const output = [];
                    for (let i = 0; i < Math.min(4, newVal.length); i++) {
                      output.push(newVal[i]["variants"][0]["written"]);
                    }
                    updatedClues[2] = output.join(", ");
                    setClues(updatedClues);
                  };
                  showVariants();
                  setRevealedClues((oldClues) => {
                    const newClues = [...oldClues];
                    newClues[2] = true;
                    return newClues;
                  });
                }}
              >
                click to reveal clue
              </div>
            )}
            {revealedClues[2] && (
              <div className="clue-text">
                {clues[2] ? clues[2] : "loading..."}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="comp-bot">
        <div className="comp-instructions">
          choose the correct english meaning from the choices below
        </div>
        <div className="comp-answer-pool">
          {answerOptions.map((choice, idx) => {
            return (
              <div className="comp-mc-option" key={choice} id={`mc-${idx}`}
              onClick={!attempted ? e=>{checkAnswer(e, choice)} : null}>
                {choice}
              </div>
            );
          })}
        </div>
        {attempted && (
          <>
            <div
              className="comp-next-button"
              onClick={() => {
                setSwitchA(switchA + 3);
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

export default Comprehension;
