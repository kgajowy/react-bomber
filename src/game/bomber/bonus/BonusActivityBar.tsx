import * as React from 'react'

interface IBonusActivityBar {

    /**
     * @maxWidth - max width of the horizontal bar
     */
    maxWidth: number

    /**
     * @percentageFill 0 - 1
     */
    percentageFill: number

    /**
     * @height - Y to display the bar
     */
    height: number

    /**
     * @timeLeft - how many [ms] left for bonus to be active
     */
    timeLeft: number
}

const BarHeight = 20

export const BonusActivityBar: React.SFC<IBonusActivityBar> = (props) => {
    const currentWidth = props.maxWidth * props.percentageFill
    const currentX = (props.maxWidth - currentWidth) / 2
    const currentY = props.height - BarHeight / 2

    if (props.timeLeft) {
        return (
            <g transform={`translate(${currentX},${currentY})`}>
                <rect width={currentWidth} height={BarHeight} fill="red"/>
                <text x={currentWidth+2} y={15}>{(props.timeLeft/1000).toFixed(2)}s</text>
            </g>
        )
    } else {
        return null
    }
}