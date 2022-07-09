import React from 'react'

export default class SvgView extends React.Component<Props, State> {
    public render() {
        const props = { ...this.props }

        delete props.onViewBoxChanged

        return (
            <svg {...props}>
                {this.props.children}
            </svg>
        )
    }
}

export type Props = React.SVGProps<SVGSVGElement> & {
    onViewBoxChanged? : (viewBox : string) => void
}
export type State = unknown

export type Rect = {
    left : number
    top : number
    width : number
    height : number
}

function parseViewBox(view : string) : Rect {
    const match = view.match(/(\d+(?:\.\d+)?) (\d+(?:\.\d+)?) (\d+(?:\.\d+)?) (\d+(?:\.\d+)?)/)
    const left = match ? Number(match[1]) : NaN
    const top = match ? Number(match[2]) : NaN
    const width = match ? Number(match[3]) : NaN
    const height = match ? Number(match[4]) : NaN

    return { left, top, width, height }
}
