import { useGetJoyoKanjiQuery } from "../store/kanjiAPI"

function Recognition() {
    const { data } = useGetJoyoKanjiQuery()
    console.log("data::: ", data)

    return (
        <>
            HIHIHI
        </>
    )
}

export default Recognition
