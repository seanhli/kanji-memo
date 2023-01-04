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
        "yeah right",
        null,
    ]
    const roll = Math.floor(Math.random()*subtitles.length)

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
            <div className="power-button">
                <img src={require(`./assets/power-button.png`)} alt="start button"/>
            </div>
        </>
    )
}

export default LandingPage
