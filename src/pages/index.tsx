import React, { PropsWithChildren } from 'react'
import PageComponent from '../components/page'
import system, { Celestial, Planet, Ring, Star } from '../data/system'
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
            star : { name, position : { x, y }, radius : r, obliquity : a },
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
                <text
                    className={styles.name}
                    style={{ fontSize : `${t.s(r / 4)}px`, fill : `black`, dominantBaseline : `central` }}
                    x={t.x(x)}
                    y={t.h(y + r * 0.6)}
                >
                    {name}
                </text>
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

function mix(a : number, b : number, i : number) {
    return a + (b - a) * i
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
