import React from 'react'

export default class SvgView extends React.Component<Props, State> {
    public state : State = {
        view : parseViewBox(this.props.viewBox || ``)
    }

    private handleMouseDown = (event : React.MouseEvent<SVGSVGElement>) => {
        const svg = event.currentTarget
        const toView = ({ clientX, clientY } : { clientX : number, clientY : number }) => {
            const { view } = this.state
            const client = viewToClient(svg, view)
            const x = (clientX - client.left) / client.width * view.width + view.left
            const y = (clientY - client.top) / client.height * view.height + view.top

            return { x, y }
        }

        let { x : ox, y : oy } = toView(event)

        const handleMouseUp = () => {
            window.removeEventListener(`mouseup`, handleMouseUp)
            window.removeEventListener(`mousemove`, handleMouseMove)
        }
        const handleMouseMove = (event : MouseEvent) => {
            const { x : nx, y : ny } = toView(event)
            const dx = nx - ox
            const dy = ny - oy

            const { left, top, width, height } = this.state.view

            this.setState({ view : {
                left : left - dx,
                top : top - dy,
                width,
                height,
            } })

            ox = nx - dx
            oy = ny - dy
        }

        window.addEventListener(`mouseup`, handleMouseUp)
        window.addEventListener(`mousemove`, handleMouseMove)

        const { onMouseDown } = this.props

        if (onMouseDown) onMouseDown(event)
    }

    // @todo: componentDidUpdate
    public render() {
        const props = { ...this.props }

        delete props.onViewBoxChanged

        const { left, top, width, height } = this.state.view

        return (
            <svg
                {...props}
                viewBox={`${left} ${top} ${width} ${height}`}
                onMouseDown={this.handleMouseDown}
            >
                {this.props.children}
            </svg>
        )
    }
}

export type Props = React.SVGProps<SVGSVGElement> & {
    onViewBoxChanged? : (viewBox : string) => void
}
type State = {
    view : Rect
}

type Rect = {
    left : number
    top : number
    width : number
    height : number
}

function parseViewBox(view : string) : Rect {
    const match = view.match(/(\d+(?:\.\d+)?) (\d+(?:\.\d+)?) (\d+(?:\.\d+)?) (\d+(?:\.\d+)?)/)
    const [ left, top, width, height ] = match
        ? match.slice(1, 5).map(Number)
        : [ NaN, NaN, NaN, NaN ]

    return { left, top, width, height }
}
function viewToClient(svg : SVGSVGElement, view : Rect) {
    const client = svg.getBoundingClientRect()

    const va = view.width / view.height
    let { left, top, width, height } = client
    const ca = width / height

    if (ca >= va) {
        const q = width * (ca - va) / ca
        width = width - q
        left = left + q / 2
    }
    else {
        const q = height * (1 / ca - 1 / va) / (1 / ca)
        height = height - q
        top = top + q / 2
    }

    return { left, top, width, height }
}
