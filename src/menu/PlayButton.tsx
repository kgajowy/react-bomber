import * as React from 'react'

interface IPlayButton {
    text: string
    onClick: () => void
}

export const PlayButton : React.SFC<IPlayButton> = ({onClick, text}) =>
    <button onClick={onClick}>{text}</button>