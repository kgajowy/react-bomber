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
    hands as handsMovements,
    levelProgress
} from './game/bomber/rules'
import Game from './game/Game'
import { Campaign } from './game/levels/campaign'
import { ILevel } from './game/levels/level'
import { IRunningLevel, prepareLevel } from './game/levels/util'
import { ISprite } from './game/util/sprite'
import { PlayButton } from './menu/PlayButton'


export interface IGameState {
    running: boolean,
    time: number,
    gameTime: number,
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
    level: IRunningLevel | undefined,
    won: boolean,
}

class App extends React.Component<{}, IGameState> {

    private requestId: number

    private rules: any[] = []

    public constructor(props: {}) {
        super(props)

        this.state = {
            running: true,
            time: 0,
            gameTime: 0,
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
            levels: Campaign.levels,
            level: undefined,
            won: false,
        }
    }

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
            const newStateBase: IGameState = {
                ...this.state,
                time,
                deltaTime,
                gameTime: this.state.gameTime + deltaTime
            }
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


    // TODO 10 levels
    // TODO hitboxes && check width/height - not working correctly?
    // TODO scores
    // TODO bonuses types & sprites
    // TODO bonuses collisions
    // TODO bonuses timing & factors
    // TODO menu

    // TODO v.1.1
    // TODO user levels (cpy paste)
    // TODO contributors levels

    public onMouseMove = ({ screenX }: MouseEvent): void => {
        this.setState({
            mouseX: screenX
        })
    }

    public newGame = (): void => {
        this.rules = [
            bombsMovement, bombSpawn, handsMovements, bombOutOfBounds, crossesMovements, bombCatch, levelProgress
        ]
        const [ firstLevel, ...rest ] = Campaign.levels
        this.setState({
            lives: 5,
            bombs: [],
            crosses: [],
            gameTime: 0,
            deltaTime: 0,
            level: prepareLevel(firstLevel),
            levels: rest,
        })

    }

    public render() {
        const { hands, bombs, crosses, lives, settings, mouseX, level = { ref: { name: 'Game' }} } = this.state
        return (
            <div>
                <Game width={settings.width} height={settings.height} backgroundColor={'yellow'}>
                    <Hands {...hands}/>
                    {bombs.map((b, i) => <Bomb {...b} key={i}/>)}
                    {crosses.map((c, i) => <Explosion {...c} key={i}/>)}
                    {  new Array(lives).fill(0).map((_, i) => <Life y={20} x={settings.width - (i + 1) * 36} key={i}/>) }
                    {<text x="20" y="30">{level.ref.name}</text>}
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
                    textAlign: 'center',
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
