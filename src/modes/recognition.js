import { Fragment, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { nextKanji } from "../store/kanji/kanjiLists";

function Recognition() {
  const dispatch = useDispatch();
  const [dragging, setDragging] = useState(false);
  // for tracking how many guesses a user takes
  const [tries, setTries] = useState(0);
  // tracks whether a user is doing first attempt, still attempting, has succeeded, or given up
  const [attempted, setAttempted] = useState(0);
  // used for moving to next set of 5 kanji
  const [switchA, setSwitchA] = useState(3);
  const [switchB, setSwitchB] = useState(1);
  const level = useSelector((state) => state.menuSlice.level);
  const difficulty =
    level === 1 ? "beginner" : level === 2 ? "intermediate" : "advanced";
  const kanjiRow = useSelector((state) => state.kanjiSlice.next5[difficulty]);
  const fillerKanji = useSelector((state) => state.kanjiSlice.Qs[difficulty]);
  const kanjiDict = useSelector((state) => state.kanjiSlice.kanjiDict);
  const dragItem = useRef();
  const dragNode = useRef();
  const prevDifficultyLevel = useRef(level);

  const successMessages = {
    perfect: [
      "i'm starting to suspect you actually like kanji",
      "impossibru, a perfect clear?!",
      "feelsgoodman",
    ],
    great: ["so good, much wow", "omega goodo jobu", "ha! kanji nerd"],
    good: ["so you think you know kanji now", "not bad - asian parent"],
    bad: [
      "i didn't want rice tonight anyways",
      "doctor, it hurts in my kokoro",
      "feelsbadman",
    ],
    wtf: ["pain... desu", "today's fortune: kanji may not be the one for you"],
  };

  let kunAnswerKey = [...kanjiRow].map((kanji) => kanjiDict[kanji][0]);
  let onAnswerKey = [...kanjiRow].map((kanji) => kanjiDict[kanji][1]);

  const holder = {
    pool: [],
    kunAnswerBoxes: [[], [], [], [], []],
    onAnswerBoxes: [[], [], [], [], []],
  };

  const [dropLocations, setDropLocations] = useState(holder);

  useEffect(() => {
    const refreshPool = () => {
      const temp = {
        pool: [...kunAnswerKey]
          .concat([...onAnswerKey])
          .filter((reading) => reading !== null),
        kunAnswerBoxes: [[], [], [], [], []],
        onAnswerBoxes: [[], [], [], [], []],
      };
      const filler = [...Array(fillerKanji.length).keys()]
        //take random sampling of 20 kanji from remaining queue
        .sort((a, b) => 0.5 - Math.random())
        .splice(0, 20)
        .map((num) => kanjiDict[fillerKanji[num]].slice(0, 2))
        //remove kanji with null kun or on readings
        .filter((pair) => pair[0] && pair[1])
        .flat();
      while (temp["pool"].length < 10 + level * 5) {
        temp["pool"].push(filler.shift());
      }
      //shuffle pool
      temp["pool"].sort((a, b) => 0.5 - Math.random());
      setDropLocations(temp);
    };
    refreshPool();
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

    //on component clean up, refresh list of kanji (e.g. when switching to new page)
    return () => {
      if (switchA === switchB) {
        dispatch(nextKanji(difficulty));
      }
    };
  }, [difficulty, switchA]); // eslint-disable-line

  // note the starting location and its index (e.g. (kunAnswerBoxes, 3))
  function handleDragStart(e, [loc, idx, innerIdx]) {
    dragItem.current = [loc, idx, innerIdx];
    dragNode.current = e.target;
    dragNode.current.addEventListener("dragend", handleDragEnd);
    setDragging(true);
  }

  // governs what happens when drag and droppable spots intersect
  function handleDragEnter(e, [loc, idx, innerIdx]) {
    if (
      !(
        dragItem.current[0] === loc &&
        dragItem.current[1] === idx &&
        dragItem.current[2] === innerIdx
      )
    ) {
      if (e.target.id) {
        const box = document.getElementById(e.target.id);
        if (box) {
          box.classList.add("shiny");
        }
      }

      setDropLocations((oldDrop) => {
        let newDrop = JSON.parse(JSON.stringify(oldDrop));

        if (dragItem.current) {
          // non-pool drop spots
          // insert into beginning of list if empty otherwise insert before current drop spot item
          if (loc !== "pool") {
            newDrop[loc][idx].splice(
              oldDrop[loc][idx].length === 0 ? 0 : innerIdx,
              0,
              dragItem.current[0] === "pool"
                ? // cutting from pool
                  newDrop[dragItem.current[0]].splice(dragItem.current[1], 1)
                : // cutting from other locations
                  newDrop[dragItem.current[0]][dragItem.current[1]].splice(
                    dragItem.current[2],
                    1
                  )
            );
            // clean up then update dragItem and dragNode
            // clean up has to be in this block (or things get wonky)
            dragNode.current = null;
            dragNode.current = e.target;
            dragItem.current = [loc, idx, innerIdx];
          }
          // for pool drop spot
          // similar logic to above, but only with idx, no inneridx
          else {
            if (idx !== null || oldDrop[loc].length === 0) {
              newDrop[loc].splice(
                oldDrop[loc].length === 0 ? 0 : idx,
                0,
                dragItem.current[0] === "pool"
                  ? // cutting from pool
                    newDrop[dragItem.current[0]].splice(dragItem.current[1], 1)
                  : // cutting from other locations
                    newDrop[dragItem.current[0]][dragItem.current[1]].splice(
                      dragItem.current[2],
                      1
                    )
              );
              // clean up then update dragItem and dragNode
              // clean up has to be in this block (or things get wonky)
              dragNode.current = null;
              dragNode.current = e.target;
              dragItem.current = [loc, idx, innerIdx];
            }
          }
        }

        return newDrop;
      });
    }
  }

  function handleDragLeave(e) {
    const box = document.getElementById(e.target.id);
    if (box && box.classList.contains("shiny")) {
      box.classList.remove("shiny");
    }
  }

  function handleDragEnd() {
    setDragging(false);
    dragItem.current = null;
    dragNode.current = null;
  }

  function checkAnswers(e) {
    e.preventDefault();
    let counter = 0;
    // wrong 'rgba(171, 63, 63, 0.4)'
    // correct 'rgba(72, 181, 66, 0.6)'
    dropLocations["kunAnswerBoxes"].forEach((box, idx) => {
      const element = document.getElementById(`kun-${idx}`);
      if (!kunAnswerKey[idx] && box.length === 0) {
        element.style.backgroundColor = "rgba(72, 181, 66, 0.6)";
        counter++;
      } else if (
        [...box].flat(Infinity)[0] === kunAnswerKey[idx] &&
        box.length <= 1
      ) {
        element.style.backgroundColor = "rgba(72, 181, 66, 0.6)";
        counter++;
      } else {
        element.style.backgroundColor = "rgba(171, 63, 63, 0.4)";
      }
    });
    dropLocations["onAnswerBoxes"].forEach((box, idx) => {
      const element = document.getElementById(`on-${idx}`);
      if (!onAnswerKey[idx] && box.length === 0) {
        element.style.backgroundColor = "rgba(72, 181, 66, 0.6)";
        counter++;
      } else if (
        [...box].flat(Infinity)[0] === onAnswerKey[idx] &&
        box.length <= 1
      ) {
        element.style.backgroundColor = "rgba(72, 181, 66, 0.6)";
        counter++;
      } else {
        element.style.backgroundColor = "rgba(171, 63, 63, 0.4)";
      }
    });
    if (counter >= 10) {
      // success!
      setAttempted(2);
    } else {
      setAttempted(1);
    }
    setTries(tries + 1);
  }

  function showAnswers() {
    const boxes = document.getElementsByClassName("answer-box");
    for (let box of boxes) {
      box.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
    }
    setDropLocations((oldDrop) => {
      let newDrop = JSON.parse(JSON.stringify(oldDrop));
      newDrop["kunAnswerBoxes"] = kunAnswerKey.map((answer) =>
        answer ? [answer] : []
      );
      newDrop["onAnswerBoxes"] = onAnswerKey.map((answer) =>
        answer ? [answer] : []
      );
      return newDrop;
    });
    setAttempted(3);
  }

  function goNext() {
    const boxes = document.getElementsByClassName("answer-box");
    for (let box of boxes) {
      box.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
    }
    setAttempted(0);
    setTries(0);
    setSwitchA(switchA + 3);
  }

  return (
    <div className="sub-display">
      <div className="kanji-recognition">
        <div className="labels"></div>
        {kanjiRow.map((kanji) => {
          return (
            <div className="kanji-word" key={kanji}>
              {kanji}
            </div>
          );
        })}
        <div className="labels">kun</div>
        {dropLocations["kunAnswerBoxes"].map((col, idx) => {
          return (
            <div
              className="answer-box"
              key={`box-${idx}`}
              id={`kun-${idx}`}
              onDragEnter={(e) =>
                handleDragEnter(e, ["kunAnswerBoxes", idx, null])
              }
              onDragLeave={(e) => handleDragLeave(e)}
            >
              {col.map((item, itemIdx) => {
                return (
                  <div
                    className="pool-item"
                    draggable
                    id={`pi-kun-${idx}-${itemIdx}`}
                    key={`pi-kun-${idx}-${itemIdx}`}
                    onDragStart={(e) => {
                      handleDragStart(e, ["kunAnswerBoxes", idx, itemIdx]);
                    }}
                    onDragEnter={(e) =>
                      handleDragEnter(e, ["kunAnswerBoxes", idx, itemIdx])
                    }
                    onDragLeave={(e) => handleDragLeave(e)}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          );
        })}
        <div className="labels">on</div>
        {dropLocations["onAnswerBoxes"].map((col, idx) => {
          return (
            <div
              className="answer-box"
              key={`box-${idx}`}
              id={`on-${idx}`}
              onDragEnter={(e) =>
                handleDragEnter(e, ["onAnswerBoxes", idx, null])
              }
              onDragLeave={(e) => handleDragLeave(e)}
            >
              {col.map((item, itemIdx) => {
                return (
                  <div
                    className="pool-item"
                    draggable
                    id={`pi-on-${idx}-${itemIdx}`}
                    key={`pi-on-${idx}-${itemIdx}`}
                    onDragStart={(e) => {
                      handleDragStart(e, ["onAnswerBoxes", idx, itemIdx]);
                    }}
                    onDragEnter={(e) =>
                      handleDragEnter(e, ["onAnswerBoxes", idx, itemIdx])
                    }
                    onDragLeave={(e) => handleDragLeave(e)}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      {attempted < 2 && (
        <>
          <div className="recognition-instructions">
            From below, drag and drop the correct kun and on readings for the
            kanji above (some may have only one)
          </div>
          <div
            className="answer-pool"
            onDragEnter={(e) => handleDragEnter(e, ["pool", null, null])}
          >
            {dropLocations["pool"].map((item, idx) => {
              return (
                <Fragment key={`${idx}-${item}`}>
                  {!(idx % 5) && (
                    <div className="labels" key={`label-${idx}`}></div>
                  )}
                  <div
                    className="pool-item"
                    draggable
                    onDragStart={(e) => {
                      handleDragStart(e, ["pool", idx, null]);
                    }}
                    onDragEnter={
                      dragging
                        ? (e) => {
                            handleDragEnter(e, ["pool", idx, null]);
                          }
                        : null
                    }
                  >
                    {item}
                  </div>
                </Fragment>
              );
            })}
          </div>
          {/* for first try */}
          {attempted < 1 && (
            <div
              className="recognition-submit-button"
              onClick={(e) => {
                checkAnswers(e);
              }}
            >
              submit
            </div>
          )}
          {/* for 2nd+ try but still not complete */}
          {attempted === 1 && (
            <>
              <div
                className="recognition-submit-button"
                onClick={(e) => {
                  checkAnswers(e);
                }}
              >
                try again
              </div>
              {/* on click show next button */}
              <div
                className="recognition-submit-button"
                onClick={() => {
                  showAnswers();
                }}
              >
                give up
              </div>
            </>
          )}
        </>
      )}
      {attempted === 2 && (
        <>
          <div className="recognition-instructions">
            {
              successMessages[
                tries <= 1
                  ? "perfect"
                  : tries <= 3
                  ? "great"
                  : tries <= 5
                  ? "good"
                  : tries <= 10
                  ? "bad"
                  : "wtf"
              ][
                Math.floor(
                  Math.random() *
                    successMessages[
                      tries <= 1
                        ? "perfect"
                        : tries <= 3
                        ? "great"
                        : tries <= 5
                        ? "good"
                        : tries <= 10
                        ? "bad"
                        : "wtf"
                    ].length
                )
              ]
            }
          </div>
          <div
            className="recognition-submit-button"
            onClick={() => {
              goNext();
            }}
          >
            next set
          </div>
        </>
      )}
      {attempted === 3 && (
        <>
          <div className="recognition-instructions">
            no shame. i'd do the same :)
          </div>
          <div
            className="recognition-submit-button"
            onClick={() => {
              goNext();
            }}
          >
            next set
          </div>
        </>
      )}
    </div>
  );
}

export default Recognition;
