import * as React from 'react'

interface IGameProps {
    width: number
    height: number
    backgroundColor: string

}

export default class Game extends React.Component<IGameProps> {
    public static defaultProps = {
        height: 480,
        width: 640,
        backgroundColor: 'transparent'
    }

    public render() {
        const { width, height, backgroundColor, children } = this.props
        return (
            <svg style={{ width, height, backgroundColor }}>
                {children}
            </svg>
        )
    }
}