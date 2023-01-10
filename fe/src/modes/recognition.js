import { Fragment, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { nextKanji } from "../store/kanji/kanjiLists"

function Recognition() {
    const dispatch = useDispatch()
    const level = useSelector(state => state.menuSlice.level)
    const difficulty = level === 1 ? 'beginner' : level === 2 ? 'intermediate' : 'advanced'
    const kanjiRow = useSelector(state => state.kanjiSlice.next5[difficulty])
    const fillerKanji = useSelector(state => state.kanjiSlice.Qs[difficulty])
    const kanjiDict = useSelector(state => state.kanjiSlice.kanjiDict)

    useEffect(()=>{
        //on component clean up, refresh list of kanji (e.g. when switching to new page)
        return () => {
            dispatch(nextKanji(difficulty))
        }
    },[]) // eslint-disable-line

    const kunAnswerKey = [...kanjiRow].map(kanji => kanjiDict[kanji][0])
    const onAnswerKey = [...kanjiRow].map(kanji => kanjiDict[kanji][1])

    const dropLocations = {
        pool: [...kunAnswerKey].concat([...onAnswerKey]).filter(reading => reading !== null)
    }

    const filler = [...Array(fillerKanji.length).keys()]
        //take random sampling of 20 kanji from remaining queue
        .sort((a, b) => 0.5 - Math.random())
        .splice(0,20)
        .map(num => kanjiDict[fillerKanji[num]].slice(0,2))
        //remove kanji with null kun or on readings
        .filter(pair => pair[0] && pair[1])
        .flat()

    while (dropLocations["pool"].length < 20) {
        dropLocations["pool"].push(filler.shift())
    }
    //shuffle pool
    dropLocations["pool"].sort((a, b) => 0.5 - Math.random())

    dropLocations["kunAnswerBoxes"] = [null, null, null, null, null]
    dropLocations["onAnswerBoxes"] = [null, null, null, null, null]

    // note the starting location and its index (e.g. (kunAnswerBoxes, 3))
    // function handleDragStart(e, startCoord) {

    // }

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
                {dropLocations["kunAnswerBoxes"].map((item, idx) => {
                    return (
                        <div className="answer-box"
                            key={`box-${idx}`}>
                            {item &&
                                <div className="pool-item">
                                    {item}
                                </div>}
                        </div>
                    )
                })}
                <div className="labels">on</div>
                {dropLocations["onAnswerBoxes"].map((item, idx) => {
                    return (
                        <div className="answer-box"
                            key={`box-${idx}`}>
                            {item &&
                                <div className="pool-item">
                                    {item}
                                </div>}
                        </div>
                    )
                })}
            </div>
            <div className="recognition-instructions">
                From below, drag and drop the correct kun and on readings for the kanji above (some may have only one)
            </div>
            <div className="answer-pool">
                {dropLocations["pool"].map((item,idx) => {
                    return (
                    <Fragment key={`${idx}-${item}`}>
                        {!(idx%5) &&
                            <div className="labels" key={`label-${idx}`}>
                            </div>}
                        <div className="pool-item"
                            draggable
                            onDragStart={e=>{console.log("THIS GON BE GOOD")}}
                            onDragEnd={e=>{console.log(e.target)}}
                            onDrop={e=>{console.log("oopsie")}}>
                            {item}
                        </div>
                    </Fragment>
                    )
                })}
            </div>
        </>
    )
}

export default Recognition
