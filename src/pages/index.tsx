import React, { PropsWithChildren } from 'react'
import PageComponent from '../components/page'
import styles from './index.module.scss'

export type Props = unknown
export type State = {
    view : {
        left : number
        top : number
        width : number
        height : number
    }
}

export default class IndexPage extends React.Component<Props, State> {
    public state : State = {
        view : {
            left : 0,
            top : 0,
            width : 100,
            height : 100,
        },
    }

    private system = {
        star : findBoundaries(place(system.star, { x : 0, y : 0 })),
        planets : arrangeLeftToRight(system.planets),
    }

    private handleMouseDown = (event : React.MouseEvent<SVGSVGElement>) => {
        const { view : v } = this.state
        const vwh = v.width / v.height
        const { left : rl, top : rt, width : rw, height : rh } = event.currentTarget.getBoundingClientRect()
        const rwh = rw / rh

        const $t = ({ clientX, clientY } : { clientX : number, clientY : number }) => {
            if (rwh >= vwh) {
                const q = (rwh - vwh) / 2 / rwh

                const w = rw * (vwh / rwh)
                const l = rl + rw * q
                const x = (clientX - l) / w * v.width + v.left

                const h = rh
                const t = rt
                const y = (clientY - t) / h * v.height + v.top

                return { x, y }
            }
            else {
                const q = (1 / rwh - 1 / vwh) / 2 / (1 / rwh)

                console.log(q)

                const w = rw
                const l = rl
                const x = (clientX - l) / w * v.width + v.left

                const h = rh * ((1 / vwh) / (1 / rwh))
                const t = rt + rh * q
                const y = (clientY - t) / h * v.height + v.top

                return { x, y }
            }
        }

        let { x : ox, y : oy } = $t(event)

        const handleMouseUp = () => {
            window.removeEventListener(`mouseup`, handleMouseUp)
            window.removeEventListener(`mousemove`, handleMouseMove)
        }
        const handleMouseMove = (event : MouseEvent) => {
            const { x : nx, y : ny } = $t(event)
            const dx = nx - ox
            const dy = ny - oy
            const { view : v } = this.state

            this.setState({ view : {
                ...v,
                left : v.left - dx,
                top : v.top - dy,
            } })

            // console.log({ dx, dy })

            ox = nx
            oy = ny
        }

        window.addEventListener(`mouseup`, handleMouseUp)
        window.addEventListener(`mousemove`, handleMouseMove)
    }

    public render() {
        const { view } = this.state
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

        const $w = (w : number) => w * scaleX
        const $h = (h : number) => h * scaleY
        const $x = (x : number) => $w(x - left)
        const $y = (y : number) => $h(y - top)
        const scaleFactor = Math.min(scaleX, scaleY)
        const $s = (s : number) => s * scaleFactor
        const $t = {
            w : $w,
            h : $h,
            x : $x,
            y : $y,
            s : $s,
        }

        return (
            <PageComponent title={`Solar System Scale`}>
                <svg
                    className={styles.map}
                    viewBox={`${view.left} ${view.top} ${scaleX * width} ${scaleY * height}`}
                    onMouseDown={this.handleMouseDown}
                    preserveAspectRatio={`xMidYMid meet`}
                >
                    <StarComponent id={`sun`} star={star} transformation={$t}/>
                    {
                        planets.map((planet, i) => {
                            const { position : { x, y }, radius, obliquity, rings } = planet

                            return (
                                <React.Fragment key={`planet-${i}`}>
                                    <PlanetComponent planet={planet} transformation={$t}/>
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
    moons? : Moon[]
}
type Moon = Celestial
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
type Positioned = {
    position : Position
}
type Boundaries = {
    left : number
    right : number
    top : number
    bottom : number
}
type Bounded = {
    boundaries : Boundaries
}
type Transformation = {
    w : (w : number) => number
    h : (h : number) => number
    x : (x : number) => number
    y : (y : number) => number
    s : (s : number) => number
}

class StarComponent extends React.Component<{ id : string, star : Star & Positioned, transformation : Transformation }, {}> {
    public render() {
        const {
            id,
            star : { position : { x, y }, radius : r, obliquity : a },
            transformation : t,
        } = this.props
        const body = (
            <circle
                className={styles.planet}
                cx={0} cy={0}
                r={t.s(r)}
            />
        )

        return (
            <>
                <mask id={`${id}-mask`}>
                </mask>
                <g
                    transform={`
                        translate(${t.x(x)}, ${t.y(y)})
                        rotate(${-degrees(a)})
                    `}
                >
                    <circle
                        className={styles.star}
                        cx={0}
                        cy={0}
                        r={t.s(r)}
                    />
                </g>
            </>
        )
    }
}
class PlanetComponent extends React.Component<{ planet : Planet & Positioned & Bounded, transformation : Transformation }, {}> {
    public render() {
        const {
            planet, planet : { name, symbol, position : { x, y }, boundaries, radius : r, obliquity : a, moons, rings },
            transformation : t,
        } = this.props
        const body = (
            <>
                <circle
                    className={styles.planet}
                    cx={0} cy={0}
                    r={t.s(r)}
                />
                {/* <text
                    className={styles.symbol}
                    style={{ fontSize : `${t.s(r)}px` }}
                    x={0}
                    y={0}
                >
                    {symbol}
                </text> */}
            </>
        )
        const arrangedMoons = moons && arrangeTopToBottom(moons, { x, y : boundaries.bottom + planet.radius / 2 })

        return (
            <>
                <g
                    transform={`
                        translate(${t.x(x)}, ${t.y(y)})
                        rotate(${-degrees(a)})
                    `}
                >
                    {
                        rings ? (
                            <RingsComponent rings={rings} transformation={t}>
                                {body}
                            </RingsComponent>
                        ) : body
                    }
                </g>
                {/* <rect
                    style={{ fill : `red` }}
                    x={t.x(boundaries.left)}
                    y={t.y(boundaries.top)}
                    width={t.w(boundaries.right - boundaries.left)}
                    height={t.h(boundaries.bottom - boundaries.top)}
                /> */}
                <text
                    className={styles.name}
                    style={{ fontSize : `${t.s(r / 2)}px` }}
                    x={t.x(x)}
                    y={t.y(y + r)}
                >
                    {name}
                </text>
                {
                    arrangedMoons && arrangedMoons.map((moon, i) => {
                        const { name, position : { x, y }, radius : r } = moon

                        return (
                            <React.Fragment key={`moon-${i}`}>
                                <circle
                                    cx={t.x(x)}
                                    cy={t.y(y)}
                                    r={t.s(r)}
                                />
                                <text
                                    className={styles.moonName}
                                    style={{ fontSize : `${t.s(r / 1)}px` }}
                                    x={t.x(x + r * 1.1)}
                                    y={t.y(y)}
                                >
                                    {name}
                                </text>
                            </React.Fragment>
                        )
                    })
                }
            </>
        )
    }
}
class RingsComponent extends React.Component<PropsWithChildren<{ rings : Ring[], transformation : Transformation }>, {}> {
    public render() {
        const { props, props : { transformation : t, children } } = this
        const [ min, max ] = props.rings.reduce(([ min, max ], { width }) => [ Math.min(min, width), Math.max(max, width) ], [ +Infinity, -Infinity ])
        const rings = props.rings.map(ring => {
            const { width } = ring
            const q = ((width - min) / (max - min))**(1/2)
            const intensity = mix(1, 0.05, q)

            return {
                ...ring,
                intensity,
            }
        })

        return (
            <>
                {
                    rings.map((ring, i) => {
                        const { radius, width, intensity } = ring

                        return (
                            <React.Fragment key={`ring-${i}-pre`}>
                                <path
                                    className={styles.ring}
                                    style={{ fill : `rgb(0, 0, 0, ${intensity})` }}
                                    d={`
                                        M ${t.w(-radius)} ${t.h(0)}
                                        A ${t.w(+radius)} ${t.h(+radius)} 0 0 1 ${t.w(+radius)} ${t.h(0)}
                                        L ${t.w(+radius + width)} ${t.h(0)}
                                        A ${t.w(-radius - width)} ${t.h(+radius + width)} 0 0 0 ${t.w(-radius - width)} ${t.h(0)}
                                    `}
                                    transform={`
                                        scale(1, 0.1)
                                    `}
                                />
                            </React.Fragment>
                        )
                    })
                }
                {children}
                {
                    rings.map((ring, i) => {
                        const { radius, width, intensity } = ring

                        return (
                            <React.Fragment key={`ring-${i}-post`}>
                                <path
                                    className={styles.ring}
                                    style={{ fill : `rgb(0, 0, 0, ${intensity})` }}
                                    d={`
                                        M ${t.w(-radius - width)} ${t.h(0)}
                                        A ${t.w(+radius + width)} ${t.h(-radius - width)} 0 0 0 ${t.w(+radius + width)} ${t.h(0)}
                                        L ${t.w(+radius)} ${t.h(0)}
                                        A ${t.w(-radius)} ${t.h(-radius)} 0 0 1 ${t.w(-radius)} ${t.h(0)}
                                    `}
                                    transform={`
                                        scale(1, 0.1)
                                    `}
                                />
                            </React.Fragment>
                        )
                    })
                }
            </>
        )
    }
}

const system : System = {
    star : {
        name : `Sun`,
        symbol : `☉`,
        radius : 200_000, // 696_342,
        mass : 1.9885e30,
        obliquity : radians(7.25),
    },
    planets : [
        /* {   name : `Mercury`,
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
            moons : [
                {   name : `Moon`,
                    symbol : `☾`,
                    radius : 1_737.4,
                    mass : 7.342e22,
                    obliquity : radians(6.687),
                },
            ],
        },
        {   name : `Mars`,
            symbol : `♂`,
            radius : 3_389.5,
            mass : 6.4171e23,
            obliquity : radians(25.19),
            moons : [
                {   name : `Phobos`,
                    radius : 22.2,
                    mass : 10.8e15,
                    obliquity : radians(0),
                },
                {   name : `Deimos`,
                    radius : 12.6,
                    mass : 1.5e15,
                    obliquity : radians(0),
                },
            ],
        }, */
        {   name : `Jupiter`,
            symbol : `♃`,
            radius : 69_911,
            mass : 1.8982e27,
            obliquity : radians(3.13),
            rings : [
                {
                    name : `Halo Ring`,
                    radius : 92_000,
                    width : 30_000,
                },
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
            moons : [
                {   name : `Metis`,
                    radius : 43,
                    mass : 3.6e16,
                    obliquity : radians(0),
                },
                {   name : `Adrastea`,
                    radius : 16,
                    mass : 40.20e16,
                    obliquity : radians(0),
                },
                {   name : `Amalthea`,
                    radius : 167,
                    mass : 208e16,
                    obliquity : radians(0),
                },
                {   name : `Thebe`,
                    radius : 98,
                    mass : 643e16,
                    obliquity : radians(0),
                },
                {   name : `Io`,
                    radius : 3643,
                    mass : 28_931_900e16,
                    obliquity : radians(0),
                },
                {   name : `Europa`,
                    radius : 3121,
                    mass : 64_799_800e16,
                    obliquity : radians(0),
                },
                {   name : `Ganymede`,
                    radius : 5268,
                    mass : 214_819_000e16,
                    obliquity : radians(0),
                },
                {   name : `Callisto`,
                    radius : 4820,
                    mass : 610_759_000e16,
                    obliquity : radians(0),
                },
                {   name : `Themisto`,
                    radius : 9,
                    mass : 0.038e16,
                    obliquity : radians(0),
                },
                {   name : `Leda`,
                    radius : 21,
                    mass : 50.52e16,
                    obliquity : radians(0),
                },
                {   name : `Ersa`,
                    radius : 3,
                    mass : 0.0014e16,
                    obliquity : radians(0),
                },
                {   name : `Himalia`,
                    radius : 139,
                    mass : 6_420e16,
                    obliquity : radians(0),
                },
                {   name : `Pandia`,
                    radius : 3,
                    mass : 0.0014e16,
                    obliquity : radians(0),
                },
                {   name : `Lysithea`,
                    radius : 42,
                    mass : 23.9e16,
                    obliquity : radians(0),
                },
                {   name : `Elara`,
                    radius : 79,
                    mass : 927e16,
                    obliquity : radians(0),
                },
                {   name : `Dia`,
                    radius : 4,
                    mass : 0.0034e16,
                    obliquity : radians(0),
                },
                {   name : `Carpo`,
                    radius : 3,
                    mass : 0.0014e16,
                    obliquity : radians(0),
                },
                {   name : `Valetudo`,
                    radius : 1,
                    mass : 0.000052e16,
                    obliquity : radians(0),
                },
                {   name : `Euporie`,
                    radius : 2,
                    mass : 0.00042e16,
                    obliquity : radians(0),
                },
                {   name : `S/2003 J 18`,
                    radius : 2,
                    mass : 0.00042e16,
                    obliquity : radians(0),
                },
                {   name : `Eupheme`,
                    radius : 2,
                    mass : 0.00042e16,
                    obliquity : radians(0),
                },
                {   name : `S/2010 J 2`,
                    radius : 1,
                    mass : 0.000052e16,
                    obliquity : radians(0),
                },
                {   name : `S/2016 J 1`,
                    radius : 1,
                    mass : 0.000052e16,
                    obliquity : radians(0),
                },
                {   name : `Mneme`,
                    radius : 2,
                    mass : 0.00042e16,
                    obliquity : radians(0),
                },
                {   name : `Euanthe`,
                    radius : 3,
                    mass : 0.0014e16,
                    obliquity : radians(0),
                },
                {   name : `S/2003 J 16`,
                    radius : 2,
                    mass : 0.00042e16,
                    obliquity : radians(0),
                },
                {   name : `Harpalyke`,
                    radius : 4,
                    mass : 0.0034e16,
                    obliquity : radians(0),
                },
                {   name : `Orthosie`,
                    radius : 2,
                    mass : 0.00042e16,
                    obliquity : radians(0),
                },
                {   name : `Helike`,
                    radius : 4,
                    mass : 0.0034e16,
                    obliquity : radians(0),
                },
                {   name : `Praxidike`,
                    radius : 7,
                    mass : 0.018e16,
                    obliquity : radians(0),
                },
                {   name : `S/2017 J 3`,
                    radius : 2,
                    mass : 0.00042e16,
                    obliquity : radians(0),
                },
                {   name : `S/2003 J 12`,
                    radius : 1,
                    mass : 0.000052e16,
                    obliquity : radians(0),
                },
                {   name : `S/2017 J 7`,
                    radius : 2,
                    mass : 0.00042e16,
                    obliquity : radians(0),
                },
                {   name : `Thelxinoe`,
                    radius : 2,
                    mass : 0.00042e16,
                    obliquity : radians(0),
                },
                {   name : `Thyone`,
                    radius : 4,
                    mass : 0.0034e16,
                    obliquity : radians(0),
                },
                {   name : `S/2003 J 2`,
                    radius : 2,
                    mass : 0.00042e16,
                    obliquity : radians(0),
                },
                {   name : `Ananke`,
                    radius : 29.1,
                    mass : 1.3e16,
                    obliquity : radians(0),
                },
                {   name : `Iocaste`,
                    radius : 5,
                    mass : 0.0065e16,
                    obliquity : radians(0),
                },
                {   name : `Hermippe`,
                    radius : 4,
                    mass : 0.0034e16,
                    obliquity : radians(0),
                },
                {   name : `S/2017 J 9`,
                    radius : 3,
                    mass : 0.0014e16,
                    obliquity : radians(0),
                },
                {   name : `Philophrosyne`,
                    radius : 2,
                    mass : 0.00042e16,
                    obliquity : radians(0),
                },
                {   name : `Pasithee`,
                    radius : 2,
                    mass : 0.00042e16,
                    obliquity : radians(0),
                },
                {   name : `S/2017 J 8`,
                    radius : 1,
                    mass : 0.000052e16,
                    obliquity : radians(0),
                },
                {   name : `S/2003 J 24`,
                    radius : 3,
                    mass : 0.0014e16,
                    obliquity : radians(0),
                },
                {   name : `Eurydome`,
                    radius : 3,
                    mass : 0.0014e16,
                    obliquity : radians(0),
                },
                {   name : `S/2011 J 2`,
                    radius : 1,
                    mass : 0.000052e16,
                    obliquity : radians(0),
                },
                {   name : `S/2003 J 4`,
                    radius : 2,
                    mass : 0.00042e16,
                    obliquity : radians(0),
                },
                {   name : `Chaldene`,
                    radius : 4,
                    mass : 0.0034e16,
                    obliquity : radians(0),
                },
                {   name : `S/2017 J 2`,
                    radius : 2,
                    mass : 0.00042e16,
                    obliquity : radians(0),
                },
                {   name : `Isonoe`,
                    radius : 4,
                    mass : 0.0034e16,
                    obliquity : radians(0),
                },
                {   name : `Kallichore`,
                    radius : 2,
                    mass : 0.00042e16,
                    obliquity : radians(0),
                },
                {   name : `Erinome`,
                    radius : 3,
                    mass : 0.0014e16,
                    obliquity : radians(0),
                },
                {   name : `Kale`,
                    radius : 2,
                    mass : 0.00042e16,
                    obliquity : radians(0),
                },
                {   name : `Eirene`,
                    radius : 4,
                    mass : 0.0034e16,
                    obliquity : radians(0),
                },
                {   name : `Aitne`,
                    radius : 3,
                    mass : 0.0014e16,
                    obliquity : radians(0),
                },
                {   name : `Eukelade`,
                    radius : 4,
                    mass : 0.0034e16,
                    obliquity : radians(0),
                },
                {   name : `Arche`,
                    radius : 3,
                    mass : 0.0014e16,
                    obliquity : radians(0),
                },
                {   name : `Taygete`,
                    radius : 5,
                    mass : 0.0065e16,
                    obliquity : radians(0),
                },
                {   name : `S/2011 J 1`,
                    radius : 2,
                    mass : 0.00042e16,
                    obliquity : radians(0),
                },
                {   name : `Carme`,
                    radius : 46.7,
                    mass : 5.3e16,
                    obliquity : radians(0),
                },
                {   name : `Herse`,
                    radius : 2,
                    mass : 0.00042e16,
                    obliquity : radians(0),
                },
                {   name : `S/2003 J 19`,
                    radius : 2,
                    mass : 0.00042e16,
                    obliquity : radians(0),
                },
                {   name : `S/2010 J 1`,
                    radius : 2,
                    mass : 0.00042e16,
                    obliquity : radians(0),
                },
                {   name : `S/2003 J 9`,
                    radius : 1,
                    mass : 0.000052e16,
                    obliquity : radians(0),
                },
                {   name : `S/2017 J 5`,
                    radius : 2,
                    mass : 0.00042e16,
                    obliquity : radians(0),
                },
                {   name : `S/2017 J 6`,
                    radius : 2,
                    mass : 0.00042e16,
                    obliquity : radians(0),
                },
                {   name : `Kalyke 6`,
                    radius : 9,
                    mass : 0.017e16,
                    obliquity : radians(0),
                },
                {   name : `Hegemone`,
                    radius : 3,
                    mass : 0.0014e16,
                    obliquity : radians(0),
                },
                {   name : `Pasiphae`,
                    radius : 57.8,
                    mass : 10e16,
                    obliquity : radians(0),
                },
                {   name : `Sponde`,
                    radius : 2,
                    mass : 0.00042e16,
                    obliquity : radians(0),
                },
                {   name : `S/2003 J 10`,
                    radius : 2,
                    mass : 0.00042e16,
                    obliquity : radians(0),
                },
                {   name : `Megaclite`,
                    radius : 5,
                    mass : 0.0065e16,
                    obliquity : radians(0),
                },
                {   name : `Cyllene`,
                    radius : 2,
                    mass : 0.00042e16,
                    obliquity : radians(0),
                },
                {   name : `Sinope`,
                    radius : 35,
                    mass : 2.2e16,
                    obliquity : radians(0),
                },
                {   name : `S/2017 J 1`,
                    radius : 2,
                    mass : 0.00042e16,
                    obliquity : radians(0),
                },
                {   name : `Aoede`,
                    radius : 4,
                    mass : 0.0034e16,
                    obliquity : radians(0),
                },
                {   name : `Autonoe`,
                    radius : 4,
                    mass : 0.0034e16,
                    obliquity : radians(0),
                },
                {   name : `Callirrhoe 9`,
                    radius : 6,
                    mass : 0.046e16,
                    obliquity : radians(0),
                },
                {   name : `S/2003 J 23`,
                    radius : 2,
                    mass : 0.00042e16,
                    obliquity : radians(0),
                },
                {   name : `Kore`,
                    radius : 2,
                    mass : 0.00042e16,
                    obliquity : radians(0),
                },
            ],
        },
        /* {   name : `Saturn`,
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
        }, */
    ],
}

function mix(a : number, b : number, i : number) {
    return a + (b - a) * i
}
function radians(degrees : number) {
    return degrees / 180 * Math.PI
}
function degrees(radians : number) {
    return radians / Math.PI * 180
}
function place<Something>(something : Something, position : Position) {
    return {
        ...something,
        position,
    }
}
function findBoundaries<Something extends (Celestial | Planet) & Positioned>(something : Something) : Something & Bounded {
    let { radius, position : { x, y }, obliquity : a } = something

    let width = radius
    let height = radius

    if (`rings` in something && something.rings) for (const ring of something.rings) {
        const ringWidth = ring.radius + ring.width

        if (ringWidth > width) width = ringWidth
    }

    const w = { x : +Math.cos(a) * width, y : -Math.sin(a) * width }
    const h = { x : +Math.sin(a) * height, y : +Math.cos(a) * height }
    const lt = { x : -w.x -h.x, y : -w.y -h.y }
    const lb = { x : -w.x +h.x, y : -w.y +h.y }
    const rt = { x : +w.x -h.x, y : +w.y -h.y }
    const rb = { x : +w.x +h.x, y : +w.y +h.y }

    return {
        ...something,
        boundaries : {
            left   : x + Math.min(lt.x, lb.x, rt.x, rb.x),
            right  : x + Math.max(lt.x, lb.x, rt.x, rb.x),
            top    : y + Math.min(lt.y, lb.y, rt.y, rb.y),
            bottom : y + Math.max(lt.y, lb.y, rt.y, rb.y),
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
function arrangeLeftToRight<Something extends Celestial | Planet>(somethings : Something[], gapFactor = 0.05) {
    const bounded = somethings.map(x => place(x, { x : 0, y : 0 })).map(findBoundaries)
    // find max radius (gap depends on it)
    const max = bounded.reduce((max, { boundaries : { left, right } }) => Math.max(max, right - left), -Infinity)
    const gap = max * gapFactor
    // find total planets set width (gap included)
    const width = bounded.reduce((width, { boundaries : { left, right } }) => width + (right - left), 0) + (bounded.length - 1) * gap

    let left = -width / 2

    return bounded.map((planet, i) => {
        const { boundaries } = planet
        const width = boundaries.right - boundaries.left
        const x = left + width / 2
        const y = 0

        left += width + gap

        return findBoundaries(place(planet, { x, y }))
    })
}
function arrangeTopToBottom<Something extends Celestial | Planet>(
    somethings : Something[],
    offset : Position = { x : 0, y : 0 },
    gapFactor = 0.05
) {
    const bounded = somethings.map(x => place(x, { x : 0, y : 0 })).map(findBoundaries)
    // find max radius (gap depends on it)
    const max = bounded.reduce((max, { boundaries : { top, bottom } }) => Math.max(max, bottom - top), -Infinity)
    const gap = max * gapFactor
    // find total planets set height (gap included)
    const height = bounded.reduce((height, { boundaries : { top, bottom } }) => height + (bottom - top), 0) + (bounded.length - 1) * gap

    let top = 0

    return bounded.map((planet, i) => {
        const { boundaries } = planet
        const height = boundaries.bottom - boundaries.top
        const x = offset.x + 0
        const y = offset.y + top + height / 2

        top += height + gap

        return findBoundaries(place(planet, { x, y }))
    })
}
