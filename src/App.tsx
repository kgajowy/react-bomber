import * as React from 'react'
import { Bomb } from './game/bomber/bomb/Bomb'
import { Explosion } from './game/bomber/bomb/Explosion'
import { Bucket } from './game/bomber/bucket/Bucket'
import { Hands } from './game/bomber/hands/Hands'
import { Life } from './game/bomber/life/Life'
import {
    bombCatch,
    bombOutOfBounds,
    bombs as bombsMovement,
    bombSpawn,
    crossesMovements,
    hands as handsMovements
} from './game/bomber/rules'
import Game from './game/Game'
import { ILevel, sampleLevel } from './game/levels/level'
import { ISprite } from './game/util/sprite'
import { PlayButton } from './menu/PlayButton'

export interface IGameState {
    running: boolean,
    time: number,
    deltaTime: number,
    hands: ISprite,
    bombs: ISprite[],
    crosses: ISprite[],
    lives: number,
    mouseX: number,
    settings: {
        width: number,
        height: number,
    },
    levels: ILevel[],
    currentLevel: ILevel,
}

class App extends React.Component<any, IGameState> {

    public state = {
        running: true,
        time: 0,
        deltaTime: 0,
        mouseX: 350,
        settings: {
            width: 700,
            height: 500,
        },
        lives: 5,
        hands: {
            x: 350,
            y: 100,
            w: 60,
            h: 60,
        },
        bombs: [],
        crosses: [],
        levels: [],
        currentLevel: sampleLevel,
    }

    private requestId: number

    private rules: any[] = []

    public componentWillUnmount() {
        cancelAnimationFrame(this.requestId)
        document.removeEventListener('keydown', this.onKeyDown)
        document.removeEventListener('mousemove', this.onMouseMove)
    }

    public componentDidMount() {
        document.addEventListener('keydown', this.onKeyDown)
        document.addEventListener('mousemove', this.onMouseMove)

        let scheduleNextTick: () => void
        const tick = (time: number) => {
            const deltaTime = time - this.state.time
            const newStateBase: IGameState = { ...this.state, time, deltaTime }
            const newState: IGameState = this.rules.reduce((acc, rule) => ({
                ...acc,
                ...rule(acc)
            }), newStateBase)

            if (newState.lives === 0) {
                this.stopGame()
            }

            this.setState(newState,
                scheduleNextTick,
            )
        }
        scheduleNextTick = () => {
            this.requestId = requestAnimationFrame(tick)
        }
        scheduleNextTick()

        this.newGame()
    }

    // TODO levels
    // TODO hitboxes && check width/height - not working correctly?
    // TODO hands "speed" props
    // TODO difficulty factors with levels
    // TODO scores
    // TODO bonuses types & sprites
    // TODO bonuses collisions
    // TODO bonuses timing & factors

    public onMouseMove = ({ screenX }: MouseEvent): void => {
        this.setState({
            mouseX: screenX
        })
    }

    public newGame = (): void => {
        this.rules = [
            bombsMovement, bombSpawn, handsMovements, bombOutOfBounds, crossesMovements, bombCatch
        ]
        this.setState({
            lives: 5,
            bombs: [],
            crosses: [],
            time: 0,
            deltaTime: 0,
        })
    }

    public render() {
        const { time, deltaTime, hands, bombs, crosses, lives, settings, mouseX } = this.state
        return (
            <div>
                Time {time}<br/>
                delta time {deltaTime}<br/>
                <Game width={settings.width} height={settings.height} backgroundColor={'yellow'}>
                    <Hands {...hands}/>
                    {bombs.map((b, i) => <Bomb {...b} key={i}/>)}
                    {crosses.map((c, i) => <Explosion {...c} key={i}/>)}
                    {
                        new Array(lives).fill(0).map((_, i) => <Life y={20} x={settings.width - (i + 1) * 36} key={i}/>)
                    }
                    <Bucket y={400} x={mouseX}/>
                </Game>
                {lives === 0 &&
                <div style={{
                    position: 'absolute',
                    top: window.innerHeight / 2,
                    left: 0,
                    width: settings.width,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    textAlign: 'center'
                }}>
                    <PlayButton text={'Restart?'} onClick={this.newGame}/>

                </div>
                }
            </div>
        )
    }

    private stopGame = (): void => {
        this.rules = [ bombsMovement, bombOutOfBounds, crossesMovements ] // even tho its game over, keep some moves
    }

    private onKeyDown = () => undefined

}

export default App
