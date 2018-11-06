import * as React from 'react'

interface IShakeProps {
    x: number,
    y: number
}

export default class Shake extends React.Component<IShakeProps> {
    public render() {
        const { children, x, y } = this.props
        return (
            <g transform={`translate(${x},${y})`}>
                {children}
            </g>
        )
    }
}