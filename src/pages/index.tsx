import React from 'react'
import PageComponent from '../components/page'
import styles from './index.module.scss'

export type Props = unknown
export type State = unknown

export default class IndexPage extends React.Component<Props, State> {
    public render() {
        const star = findBoundaries(place(system.star, { x : 0, y : 0 }))
        const arrangedPlanets = arrangePlanets(system.planets)
        const boundaries = minMaxBoundaries([ star, ...arrangedPlanets ])
        const scale = 100
        const { left, top, right, bottom } = boundaries
        const width = right - left
        const height = bottom - top

        console.log({ left, top, right, bottom, width, height })

        let { scaleX, scaleY } = width > height
            ? { scaleX : 1, scaleY : height / width }
            : { scaleX : width / height, scaleY : 1 }

        scaleX *= scale / width
        scaleY *= scale / height

        const scaleFactor = Math.min(scaleX, scaleY)
        // const {} =
        // const view = {
        //     left : -scale / 2,
        //     top : -scale / 2,
        //     width : scale,
        //     height : scale,
        // }

        return (
            <PageComponent title={`Solar System Scale`}>
                <svg
                    className={styles.map}
                    viewBox={`0 0 ${scaleX * width} ${scaleY * height}`}
                >
                    <circle
                        className={styles.star}
                        cx={(star.position.x - left) * scaleX}
                        cy={(star.position.y - top) * scaleY}
                        r={star.radius * scaleFactor}
                    />
                    {
                        arrangedPlanets.map((planet, i) => {
                            return (
                                <React.Fragment key={`planet-${i}`}>
                                    <circle
                                        className={styles.planet}
                                        cx={(planet.position.x - left) * scaleX}
                                        cy={(planet.position.y - top) * scaleY}
                                        r={planet.radius * scaleFactor}
                                    />
                                </React.Fragment>
                            )
                        })
                    }
                </svg>
            </PageComponent>
        )
    }
}

type System = {
    star : Star
    planets : Planet[]
}
type Star = Celestial
type Planet = Celestial
type Celestial = {
    name : string
    symbol? : string
    /** Radius in km */
    radius : number
    /** Mass in kg */
    mass : number
}
type Position = {
    x : number
    y : number
}
type Boundaries = {
    left : number
    right : number
    top : number
    bottom : number
}

const system : System = {
    star : {
        name : `Sun`,
        symbol : `☉`,
        radius : 696_342,
        mass : 1.9885e30,
    },
    planets : [
        {   name : `Mercury`,
            symbol : `☿`,
            radius : 2_439.7,
            mass : 3.3011e23,
        },
        {   name : `Venus`,
            symbol : `♀`,
            radius : 6_051.8,
            mass : 4.8675e24,
        },
        {   name : `Earth`,
            symbol : `🜨`,
            radius : 6_371.0,
            mass : 5.97237e24,
        },
        {   name : `Mars`,
            symbol : `♂`,
            radius : 3_389.5,
            mass : 6.4171e23,
        },
        {   name : `Jupiter`,
            symbol : `♃`,
            radius : 69_911,
            mass : 1.8982e27,
        },
        {   name : `Saturn`,
            symbol : `♄`,
            radius : 58_232,
            mass : 5.6834e26,
        },
        {   name : `Uranus`,
            symbol : `⛢`,
            radius : 25_362,
            mass : 8.6810e25,
        },
        {   name : `Neptune`,
            symbol : `♆`,
            radius : 24_622,
            mass : 1.02413e26,
        },
    ],
}

function place<Something>(something : Something, position : Position) {
    return {
        ...something,
        position,
    }
}
function findBoundaries<Something extends { radius : number, position : Position }>(something : Something) : Something & { boundaries : Boundaries } {
    const { radius } = something

    return {
        ...something,
        boundaries : {
            left : -radius,
            right : +radius,
            top : -radius,
            bottom : +radius,
        },
    }
}
function minMaxBoundaries(boundaries : { boundaries : Boundaries }[]) : Boundaries {
    return boundaries.reduce((minMax, { boundaries : { left, right, top, bottom } }) => ({
        left : Math.min(minMax.left, left),
        right : Math.max(minMax.right, right),
        top : Math.min(minMax.top, top),
        bottom : Math.max(minMax.bottom, bottom),
    }), {
        left : +Infinity,
        right : -Infinity,
        top : +Infinity,
        bottom : -Infinity,
    })
}
function arrangePlanets(planets : Planet[], gapFactor = 0.1) {
    // find max radius (gap depends on it)
    const max = planets.reduce((max, { radius }) => Math.max(max, radius), -Infinity)
    const gap = max * gapFactor
    // find total planets set width (gap included)
    const width = planets.reduce((width, { radius }) => width + radius * 2, 0) + (planets.length - 1) * gap

    let left = -width / 2

    return planets.map((planet, i) => {
        const { radius } = planet
        const x = left + radius
        const y = 0

        left += radius * 2 + gap

        return {
            ...planet,
            position : {
                x,
                y,
            },
            boundaries : {
                left : x - radius,
                right : x + radius,
                top : y - radius,
                bottom : y + radius,
            },
        }
    })
}
