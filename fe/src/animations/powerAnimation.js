import { gsap } from 'gsap'

export default function powerAnimation() {
    let powerTL = gsap.timeline({paused: true})

    const totalGrid = [...Array(50).keys()]
    const availGrid = [...totalGrid]
    const flicker = []

    //max 50 tiles
    for (let i = 1; i <= 50 && availGrid.length > 0; i++) {
        let idx = Math.floor(Math.random() * availGrid.length)
        flicker.push(availGrid.splice(idx,1)[0])
    }

    powerTL
    //glow
    .to('.lower-section', {
        duration: 0.05,
        filter: 'drop-shadow(0px 0px 1.5vh rgb(255, 255, 255))',
    }, 'start-0')
    //shrink subtitle and sub-subtitles
    .to('.landing-subtitle', {
        duration: 0.15,
        fontSize: '1px',
        ease: 'power2.out'
    }, 'start-0')
    .to('.sub-subtitle', {
        duration: 0.15,
        fontSize: '1px',
        ease: 'power2.out'
    }, 'start-0')
    .to('.landing-subtitle', {
        delay: 0.15,
        duration: 0.1,
        fontSize: '0px',
    }, 'start-0')
    .to('.sub-subtitle', {
        delay: 0.15,
        duration: 0.1,
        fontSize: '0px',
    }, 'start-0')
    //shrink power button
    .to('.power-button', {
        duration: 0.15,
        marginLeft: '-1.5px',
        marginTop: '0',
        width: '3px',
        height: '3px',
    }, 'start-0')
    .to('.power-button', {
        delay: 0.15,
        duration: 0.15,
        marginLeft: '0px',
        width: '0px',
        height: '0px',
    }, 'start-0')
    //slide down
    .to('.lower-section', {
        duration: 0.4,
        top: '50vh',
        ease: 'power2.in'
    }, 'start-0')
    //white spark appear
    .set('.lower-section', {
        delay: 0.15,
        marginLeft: '-1.5px',
        width: '3px',
        backgroundColor: 'rgb(210, 210, 210)',
        boxShadow: '0px 0px 10px 4px rgba(255, 255, 255, 0.8)',
        borderRadius: `1vh`
    }, 'start-0')
    //spark trail from right appears
    .to('.spark', {
        delay: 0.3,
        duration: 1,
        left: '-100%',
        ease: 'power2.out'
    }, 'start-0.1')

    totalGrid.forEach(tile => {
        powerTL
        .to('.landing-banner .row img', {
            duration: 0.75,
            filter: 'brightness(1)',
            ease: 'power2.in'
        }, 'phase-0')
        .to('.landing-banner .row img', {
            duration: 1.5,
            filter: 'drop-shadow(0px 0px 1.5vh rgb(255, 255, 255))',
            ease: 'power2.out'
        }, 'phase-0.1')
    })

    flicker.forEach(tile => {
        const row = Math.ceil((tile+1)/5)
        const col = (tile+1)%5 ? (tile+1)%5 : 5
        const delay = Math.floor(Math.random()*10)
        powerTL
        //off
        .to(`.row:nth-child(${row}) img:nth-child(${col})`, {
            duration: 0.05,
            filter: 'invert(0.7)'
        }, `phase-1.${delay}`)
        //on
        .to(`.row:nth-child(${row}) img:nth-child(${col})`, {
            duration: 0.5,
            filter: 'drop-shadow(0px 0px 1.5vh rgb(255, 255, 255))'
        }, `phase-1.${delay+1}`)
        //off
        .to(`.row:nth-child(${row}) img:nth-child(${col})`, {
            duration: 0.05,
            filter: 'invert(0.7)'
        }, `phase-1.${delay+2}`)
        //on
        .to(`.row:nth-child(${row}) img:nth-child(${col})`, {
            duration: 0.4,
            filter: 'drop-shadow(0px 0px 1.5vh rgb(255, 255, 255))'
        }, `phase-1.${delay+3}`)
        //off
        .to(`.row:nth-child(${row}) img:nth-child(${col})`, {
            duration: 0.05,
            filter: 'invert(0.8)'
        }, `phase-1.${delay+4}`)
        //on
        .to(`.row:nth-child(${row}) img:nth-child(${col})`, {
            duration: 0.25,
            filter: 'drop-shadow(0px 0px 1.5vh rgb(255, 255, 255))'
        }, `phase-1.${delay+5}`)
        //off
        .to(`.row:nth-child(${row}) img:nth-child(${col})`, {
            duration: 0.05,
            filter: 'invert(0.8)'
        }, `phase-1.${delay+6}`)
        //on
        .to(`.row:nth-child(${row}) img:nth-child(${col})`, {
            duration: 0.05,
            filter: 'drop-shadow(0px 0px 1.5vh rgb(255, 255, 255))'
        }, `phase-1.${delay+9}`)
        //off
        .to(`.row:nth-child(${row}) img:nth-child(${col})`, {
            duration: 0.05,
            filter: 'invert(0.8)'
        }, `phase-1.${delay+10}`)
        //on
        .to(`.row:nth-child(${row}) img:nth-child(${col})`, {
            duration: 0.25,
            filter: 'drop-shadow(0px 0px 1.5vh rgb(255, 255, 255))'
        }, `phase-1.${delay+11}`)
        //off
        .to(`.row:nth-child(${row}) img:nth-child(${col})`, {
            duration: 0.05,
            filter: 'invert(0.8)'
        }, `phase-1.${delay+12}`)
    })

    powerTL
    .to('.landing-banner .row img',{
        delay: 0.7,
        duration: 0.05,
        filter: 'invert(0.8)',
        ease: 'power2.in'
    },'phase-2.1')
    .to('.landing-banner .row img',{
        delay: 0.5,
        duration: 0.5,
        opacity: 0
    },'phase-2.2')

    return powerTL
}
