import { useSelector } from "react-redux"

function Recognition() {
    let kanjiLists = useSelector(state => state.kanjiSlice.kanjiLists)

    return (
        <>
            <div onClick={()=>{console.log(kanjiLists)}}>
                kekeke
            </div>
        </>
    )
}

export default Recognition
