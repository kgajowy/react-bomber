import * as React from 'react'
import { Bomb } from './game/bomber/bomb/Bomb'
import { Explosion } from './game/bomber/bomb/Explosion'
import { DoubleScore } from './game/bomber/bonus/DoubleScore'
import { Bucket } from './game/bomber/bucket/Bucket'
import { Hands } from './game/bomber/hands/Hands'
import { Life } from './game/bomber/life/Life'
import {
    bombCatch,
    bombOutOfBounds,
    bombs as bombsMovement,
    bombSpawn, bonusMoves, bonusSpawns,
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

export interface IAppProps {
    debugMode: boolean
}

export interface IGameState {
    running: boolean,
    time: number,
    gameTime: number,
    deltaTime: number,
    bucket: ISprite,
    hands: ISprite,
    bombs: ISprite[],
    crosses: ISprite[],
    bonuses: ISprite[],
    lives: number,
    settings: {
        width: number,
        height: number,
    },
    levels: ILevel[],
    level: IRunningLevel | undefined,
    stats: {
        bombsCaught: number,
        bombsMissed: number,
        points: number,
    },
    won: boolean,
    debug: {
        collisions: boolean,
    }
}

class App extends React.Component<IAppProps, IGameState> {

    private requestId: number

    private rules: any[] = []

    public constructor(props: IAppProps) {
        super(props)

        this.state = {
            running: true,
            time: 0,
            gameTime: 0,
            deltaTime: 0,
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
            bucket: {
                x: 350,
                y: 450,
                w: 48,
                h: 48,
            },
            bombs: [],
            crosses: [],
            bonuses: [],
            levels: Campaign.levels,
            level: undefined,
            won: false,
            stats: {
                bombsCaught: 0,
                bombsMissed: 0,
                points: 0,
            },
            debug: {
                collisions: false,
            }
        }
    }

    public componentWillUnmount() {
        cancelAnimationFrame(this.requestId)
        document.removeEventListener('keydown', this.onKeyDown)
        document.removeEventListener('mousemove', this.onMouseMove)
    }

    public componentWillReceiveProps(nextProps: IAppProps) {
        if (this.state.debug.collisions !== nextProps.debugMode) {
            this.setState({
                debug: {
                    collisions: nextProps.debugMode
                }
            })
        }
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

    // TODO background & misc graphics ?

    // TODO bonuses collisions
    // TODO bonuses timing & factors
    // TODO 10 levels
    // TODO menu

    // TODO v.1.1
    // TODO user levels (cpy paste)
    // TODO contributors levels

    public onMouseMove = ({ screenX }: MouseEvent): void => {
        this.setState({
            bucket: {
                ...this.state.bucket,
                x: screenX,
            }
        })
    }

    public newGame = (): void => {
        this.rules = [
            bombsMovement, bombSpawn, handsMovements, bombOutOfBounds, crossesMovements, bombCatch, levelProgress,
            bonusSpawns, bonusMoves
        ]
        const [ firstLevel, ...rest ] = Campaign.levels
        this.setState({
            lives: 5,
            bombs: [],
            crosses: [],
            bonuses: [],
            gameTime: 0,
            deltaTime: 0,
            level: prepareLevel(firstLevel),
            levels: rest,
            stats: {
                bombsCaught: 0,
                bombsMissed: 0,
                points: 0,
            },
        })

    }

    public render() {
        const { hands, bucket, bombs, bonuses, crosses, lives, settings, level = { ref: { name: 'Game' } }, debug, stats } = this.state
        return (
            <>
                <Game width={settings.width} height={settings.height}>
                    <Hands {...hands} debug={debug.collisions}/>
                    {bombs.map((b, i) => <Bomb {...b} key={i} debug={debug.collisions}/>)}
                    {crosses.map((c, i) => <Explosion {...c} key={i}/>)}

                    {/** move to standalone component */}
                    {bonuses.map((b, i) => {
                        return <DoubleScore {...b} key={i}/>
                    })}

                    {new Array(lives).fill(0).map((_, i) => <Life y={20} x={settings.width - (i + 1) * 36} w={32} h={32}
                                                                  key={i}/>)}

                    {<text x="20" y="30">{level.ref.name}</text>}
                    {<text x="20" y="50">{stats.points} (acc {((100 * stats.bombsCaught/(stats.bombsMissed+stats.bombsCaught)) || 100).toFixed(2)} %)</text>}
                    <Bucket {...bucket} debug={debug.collisions}/>
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
            </>
        )
    }

    private stopGame = (): void => {
        this.rules = [ bombsMovement, bombOutOfBounds, crossesMovements ] // even tho its game over, keep some moves
    }


    private onKeyDown = () => undefined

}

export default App
