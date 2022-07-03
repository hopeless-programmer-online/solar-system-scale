import React from 'react'
import PageComponent from '../components/page'
import styles from './index.module.scss'

export type Props = unknown
export type State = unknown

export default class IndexPage extends React.Component<Props, State> {
    private system = {
        star : findBoundaries(place(system.star, { x : 0, y : 0 })),
        planets : arrangePlanets(system.planets),
    }

    public render() {
        const { star, planets } = this.system
        const boundaries = minMaxBoundaries([ star, ...planets ])
        const scale = 100
        const { left, top, right, bottom } = boundaries
        const width = right - left
        const height = bottom - top

        // console.log({ left, top, right, bottom, width, height })

        let { scaleX, scaleY } = width > height
            ? { scaleX : 1, scaleY : height / width }
            : { scaleX : width / height, scaleY : 1 }

        scaleX *= scale / width
        scaleY *= scale / height

        const scaleFactor = Math.min(scaleX, scaleY)

        const $w = (w : number) => w * scaleX
        const $h = (h : number) => h * scaleY
        const $x = (x : number) => $w(x - left)
        const $y = (y : number) => $h(y - top)

        return (
            <PageComponent title={`Solar System Scale`}>
                <svg
                    className={styles.map}
                    viewBox={`0 0 ${scaleX * width} ${scaleY * height}`}
                >
                    <circle
                        className={styles.star}
                        cx={$x(star.position.x)}
                        cy={$y(star.position.y)}
                        r={star.radius * scaleFactor}
                    />
                    {
                        planets.map((planet, i) => {
                            const { position : { x, y }, radius, rings } = planet

                            return (
                                <React.Fragment key={`planet-${i}`}>
                                    <circle
                                        className={styles.planet}
                                        cx={$x(x)}
                                        cy={$y(y)}
                                        r={radius * scaleFactor}
                                    />
                                    {
                                        rings && rings.map((ring, j) => {
                                            const { radius, width } = ring

                                            return (
                                                <React.Fragment key={`planet-${i}-ring-${j}`}>
                                                    <path
                                                        className={styles.ring}
                                                        d={`
                                                            ${/* M ${$x(x - radius - width)} ${$y(y)} */``}
                                                            M ${$x(x - radius)} ${$y(y)}
                                                            A ${$w(radius)} ${$h(radius)} 0 0 1 ${$x(x + radius)} ${$y(y)}
                                                            L ${$x(x + radius + width)} ${$y(y)}
                                                            A ${-$w(radius + width)} ${$h(radius + width)} 0 0 0 ${$x(x - radius - width)} ${$y(y)}
                                                            A ${+$w(radius + width)} ${-$h(radius + width)} 0 0 0 ${$x(x + radius + width)} ${$y(y)}
                                                            L ${$x(x + radius)} ${$y(y)}
                                                            A ${-$w(radius)} ${-$h(radius)} 0 0 1 ${$x(x - radius)} ${$y(y)}
                                                        `}
                                                        transform={`
                                                            translate(${+$x(x)}, ${+$y(y)})
                                                            scale(1, 0.1)
                                                            translate(${-$x(x)}, ${-$y(y)})
                                                        `}
                                                    />
                                                </React.Fragment>
                                            )
                                        })
                                    }
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
type Planet = Celestial & {
    rings? : Ring[]
}
type Ring = {
    name : string
    radius : number
    width : number
}
type Celestial = {
    name : string
    symbol? : string
    /** Radius in km */
    radius : number
    /** Mass in kg */
    mass : number
    /** See [axial tilt](https://en.wikipedia.org/wiki/Axial_tilt) */
    obliquity : number
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
        obliquity : radians(7.25),
    },
    planets : [
        {   name : `Mercury`,
            symbol : `☿`,
            radius : 2_439.7,
            mass : 3.3011e23,
            obliquity : radians(0.03),
        },
        {   name : `Venus`,
            symbol : `♀`,
            radius : 6_051.8,
            mass : 4.8675e24,
            obliquity : radians(2.64),
        },
        {   name : `Earth`,
            symbol : `🜨`,
            radius : 6_371.0,
            mass : 5.97237e24,
            obliquity : radians(23.44),
        },
        {   name : `Mars`,
            symbol : `♂`,
            radius : 3_389.5,
            mass : 6.4171e23,
            obliquity : radians(25.19),
        },
        {   name : `Jupiter`,
            symbol : `♃`,
            radius : 69_911,
            mass : 1.8982e27,
            obliquity : radians(3.13),
            rings : [
                // {
                //     name : `Halo Ring`,
                //     radius : 92_000,
                //     width : 30_000,
                // },
                {
                    name : `Main Ring`,
                    radius : 122_500,
                    width : 6_500,
                },
                // {
                //     name : `Amalthea gossamer Ring`,
                //     radius : 129_000,
                //     width : 53_000,
                // },
                // {
                //     name : `Thebe gossamer Ring`,
                //     radius : 129_000,
                //     width : 97_000,
                // },
            ],
        },
        {   name : `Saturn`,
            symbol : `♄`,
            radius : 58_232,
            mass : 5.6834e26,
            obliquity : radians(26.73),
            rings : [
                {
                    name : `D Ring`,
                    radius : 66_900,
                    width : 7_500,
                },
                {
                    name : `C Ring`,
                    radius : 74_658,
                    width : 17_500,
                },
                {
                    name : `B Ring`,
                    radius : 92_000,
                    width : 25_500,
                },
                {
                    name : `A Ring`,
                    radius : 122_170,
                    width : 14_600,
                },
                {
                    name : `F Ring`,
                    radius : 140_180,
                    width : 500,
                },
                {
                    name : `Janus/Epimetheus Ring`,
                    radius : 149_000,
                    width : 5_000,
                },
                {
                    name : `G Ring`,
                    radius : 166_000,
                    width : 9_000,
                },
                {
                    name : `Methone Ring Arc`,
                    radius : 194_230,
                    width : 1_000,
                },
                {
                    name : `Anthe Ring Arc`,
                    radius : 197_655,
                    width : 1_000,
                },
                {
                    name : `Pallene Ring`,
                    radius : 211_000,
                    width : 2_500,
                },
                // {
                //     name : `E Ring`,
                //     radius : 180_000,
                //     width : 300_000,
                // },
            ],
        },
        {   name : `Uranus`,
            symbol : `⛢`,
            radius : 25_362,
            mass : 8.6810e25,
            obliquity : radians(82.23),
            rings : [
                {   name : `cc`,
                    radius : 26_840,
                    width : 8_000,
                },
                {   name : `ζc`,
                    radius : 34_890,
                    width : 3_000,
                },
                {   name : `1986U2R`,
                    radius : 37_000,
                    width : 2_500,
                },
                {   name : `ζ`,
                    radius : 37_850,
                    width : 3_500,
                },
                {   name : `6`,
                    radius : 41_837,
                    width : Math.abs((1.6 - 2.2) / 2),
                },
                {   name : `5`,
                    radius : 42_234,
                    width : Math.abs((1.9 - 4.9) / 2),
                },
                {   name : `4`,
                    radius : 42_570,
                    width : Math.abs((2.4 - 4.4) / 2),
                },
                {   name : `α`,
                    radius : 44_718,
                    width : Math.abs((4.8 - 10.0) / 2),
                },
                {   name : `β`,
                    radius : 45_661,
                    width : Math.abs((6.1 - 11.4) / 2),
                },
                {   name : `η`,
                    radius : 47_175,
                    width : Math.abs((1.9 - 2.7) / 2),
                },
                {   name : `ηc`,
                    radius : 47_176,
                    width : 40,
                },
                {   name : `γ`,
                    radius : 47_627,
                    width : Math.abs((3.6 - 4.7) / 2),
                },
                {   name : `δc`,
                    radius : 48_300,
                    width : Math.abs((10 - 12) / 2),
                },
                {   name : `δ`,
                    radius : 48_300,
                    width : Math.abs((4.1 - 6.1) / 2),
                },
                {   name : `λ`,
                    radius : 50_023,
                    width : Math.abs((1 - 2) / 2),
                },
                {   name : `ε`,
                    radius : 51_149,
                    width : Math.abs((19.7 - 96.4) / 2),
                },
                {   name : `ν`,
                    radius : 66_100,
                    width : 3_800,
                },
                {   name : `μ`,
                    radius : 86_000,
                    width : 17_000,
                },
            ],
        },
        {   name : `Neptune`,
            symbol : `♆`,
            radius : 24_622,
            mass : 1.02413e26,
            obliquity : radians(28.32),
            rings : [
                {   name : `Galle (N42)`,
                    radius : 40_900,
                    width : 2_000,
                },
                {   name : `Le Verrier (N53)`,
                    radius : 53_200,
                    width : 113,
                },
                {   name : `Lassell`,
                    radius : 53_200,
                    width : 4_000,
                },
                {   name : `Arago`,
                    radius : 57_200,
                    width : 100,
                },
                {   name : `Adams (N63)`,
                    radius : 62_932,
                    width : Math.abs((15 - 50) / 2),
                },
            ],
        },
    ],
}

function radians(degrees : number) {
    return degrees / 180 * Math.PI
}
function place<Something>(something : Something, position : Position) {
    return {
        ...something,
        position,
    }
}
function findBoundaries<Something extends (Celestial | Planet) & { position : Position }>(something : Something) : Something & { boundaries : Boundaries } {
    let { radius, position : { x, y } } = something

    if (`rings` in something && something.rings) {
        for (const ring of something.rings) {
            if (ring.radius + ring.width > radius) radius = ring.radius + ring.width
        }
    }

    return {
        ...something,
        boundaries : {
            left : x - radius,
            right : x + radius,
            top : y - radius,
            bottom : y + radius,
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
function arrangePlanets(planets : Planet[], gapFactor = 0.05) {
    const planets2 = planets.map(x => place(x, { x : 0, y : 0 })).map(findBoundaries)
    // find max radius (gap depends on it)
    const max = planets2.reduce((max, { boundaries : { left, right } }) => Math.max(max, right - left), -Infinity)
    const gap = max * gapFactor
    // find total planets set width (gap included)
    const width = planets2.reduce((width, { boundaries : { left, right } }) => width + (right - left), 0) + (planets2.length - 1) * gap

    let left = -width / 2

    return planets2.map((planet, i) => {
        const { boundaries } = planet
        const x = left + (boundaries.right - boundaries.left) / 2
        const y = 0

        left += (boundaries.right - boundaries.left) + gap

        return findBoundaries(place(planet, { x, y }))
    })
}
