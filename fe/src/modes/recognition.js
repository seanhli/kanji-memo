import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { nextKanji } from "../store/kanji/kanjiLists"
import { useGetKanjiDetailQuery } from "../store/kanjiAPI"

function Recognition() {
    const dispatch = useDispatch()
    const level = useSelector(state => state.menuSlice.level)
    const difficulty = level === 1 ? 'beginner' : level === 2 ? 'intermediate' : 'advanced'
    const kanjiRow = useSelector(state => state.kanjiSlice.next5[difficulty])

    useEffect(()=>{
        //on component clean up, refresh list of kanji (e.g. when switching to new page)
        return () => {
            dispatch(nextKanji(difficulty))
        }
    },[])

    // const answerKey = [
    //     useGetKanjiDetailQuery(kanjiRow[0]).data,
    //     useGetKanjiDetailQuery(kanjiRow[1]).data,
    //     useGetKanjiDetailQuery(kanjiRow[2]).data,
    //     useGetKanjiDetailQuery(kanjiRow[3]).data,
    //     useGetKanjiDetailQuery(kanjiRow[4]).data
    // ]
    // console.log(answerKey)

    console.log(kanjiRow)

    const kunAnswerBoxes = [...Array(5).keys()]
    const onAnswerBoxes = [...Array(5).keys()]

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
                {kunAnswerBoxes.map(box => {
                    return (
                        <div className="answer-box"
                            key={`box-${box}`}>
                        </div>
                    )
                })}
                <div className="labels">on</div>
                {onAnswerBoxes.map(box => {
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
