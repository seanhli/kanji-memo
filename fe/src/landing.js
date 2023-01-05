import powerAnimation from "./animations/powerAnimation"

function LandingPage() {

    const bannerHeight = [...Array(10).keys()]
    const bannerWidth = [...Array(5).keys()]

    const subtitles = [
        "all aboard the kanji pain train",
        "i love kanji, you love kanji",
        "why write letters when you can draw pictures"
    ]
    const subSubtitles = [
        null,
        '— psychopath in the making',
        null,
    ]
    const roll = Math.floor(Math.random()*subtitles.length)

    function powerClick(event) {
        event.preventDefault()
        const powerTL = powerAnimation()
        powerTL.play()
        setTimeout(() => {cleanUp(powerTL)},powerTL.duration()*1000+500)
    }

    function cleanUp(tl) {
        tl.time(0).kill()
        //navigate
    }

    return (
        <>
            <div className="landing-banner">
                {bannerHeight.map(row => {
                return (
                    <div className="row" key={"row-"+String(row)}>
                    {bannerWidth.map(col => {
                        return (
                        <img src={require(`./assets/kanji-banner/${row+1}-${col+1}.png`)}
                            alt="kanji-banner"
                            className="banner-tile"
                            key={String(row)+String(col)}/>
                        )
                    })}
                    </div>
                )
                })}
            </div>
            <div className="landing-subtitle">
                {subtitles[roll]}
                {subSubtitles[roll] &&
                <>
                    <div className="sub-subtitle">
                        {subSubtitles[roll]}
                    </div>
                </>}
            </div>
            <div className="power-button"
                onClick={e=>powerClick(e)}>
                <img src={require(`./assets/power-button.png`)} alt="start button"/>
            </div>
        </>
    )
}

export default LandingPage
