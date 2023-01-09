import { useSelector } from "react-redux"

function Recognition() {
    const difficulty = useSelector(state => state.menuSlice.level)
    const kanjiLists = useSelector(state => state.kanjiSlice.kanjiLists)

    const kanjiRow =
        difficulty === 1 ?
            kanjiLists.beginner.slice(1,6) :
        difficulty === 2 ?
            kanjiLists.intermediate.slice(1,6) :
        kanjiLists.advanced.slice(1,6)

    const kunAnswers = [...Array(5).keys()]
    const onAnswers = [...Array(5).keys()]

    return (
        <>
            <div className="kanji-recognition">
                <div className="labels"></div>
                {kanjiRow.map(kanji => {
                    return (
                        <div className="kanji-word"
                            key={kanji}>
                            {kanji}
                        </div>
                    )
                })}
                <div className="labels">kun</div>
                {kunAnswers.map(box => {
                    return (
                        <div className="answer-box"
                            key={`box-${box}`}>
                        </div>
                    )
                })}
                <div className="labels">on</div>
                {onAnswers.map(box => {
                    return (
                        <div className="answer-box"
                            key={`box-${box}`}>
                        </div>
                    )
                })}
            </div>
            <div className="recognition-instructions">
                From below, drag and drop the correct kun and on readings for the kanji above (some may have only one)
            </div>
        </>
    )
}

export default Recognition
