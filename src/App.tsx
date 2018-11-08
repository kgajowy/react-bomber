import * as React from 'react'
import { Bomb } from './game/bomber/bomb/Bomb'
import { Explosion } from './game/bomber/bomb/Explosion'
import { BonusActivityBar } from './game/bomber/bonus/BonusActivityBar'
import { DoubleScore } from './game/bomber/bonus/DoubleScore'
import { Bucket } from './game/bomber/bucket/Bucket'
import { WaterDrop } from './game/bomber/drops/WaterDrop'
import { Hands } from './game/bomber/hands/Hands'
import { Life } from './game/bomber/life/Life'
import {
    bombCatch,
    bombOutOfBounds,
    effects,
    hands as handsMovements,
    levelProgress,
    spritesCreation,
    spritesMoves, spritesRemoval,
} from './game/bomber/rules'
import { resetMiscSprites } from './game/bomber/rules/helpers/reset-misc-sprites'
import { Star } from './game/bomber/star/Star'
import Game from './game/Game'
import { Campaign } from './game/levels/campaign'
import { ILevel } from './game/levels/level'
import { IRunningLevel, prepareLevel } from './game/levels/util'
import Shake from './game/util/Shake'
import { ISprite } from './game/util/sprite'
import { ISpriteGatherable } from './game/util/sprite-gatherable'
import { PlayButton } from './menu/PlayButton'

export interface IAppProps {
    debugMode: boolean
}

export interface IActiveBonus {
    value: number
    createdAt: number
    expires: number
}

export interface IMiscSprites {
    stars: ISprite[]
    drops: ISprite[]
    crosses: ISprite[]
}

export interface IGameState {
    running: boolean,
    time: number,
    gameTime: number,
    deltaTime: number,
    bucket: ISprite,
    hands: ISprite,
    bombs: ISprite[],
    sprites: {
        misc: IMiscSprites
    }
    bonuses: ISpriteGatherable[],
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
    factors: {
        score: IActiveBonus,
        bombSpeed: IActiveBonus,
    },
    won: boolean,
    debug: {
        collisions: boolean,
    },
    shake: {
        x: number,
        y: number,
        start: boolean,
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
            sprites: {
                misc: resetMiscSprites(),
            },
            bonuses: [],
            levels: Campaign.levels,
            level: undefined,
            won: false,
            stats: {
                bombsCaught: 0,
                bombsMissed: 0,
                points: 0,
            },
            factors: {
                bombSpeed: {
                    createdAt: 0,
                    expires: 0,
                    value: 1,
                },
                score: {
                    createdAt: 0,
                    expires: 0,
                    value: 1,
                },
            },
            debug: {
                collisions: false,
            },
            shake: {
                x: 0,
                y: 0,
                start: false,
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

    public onMouseMove = ({ clientX }: MouseEvent): void => {
        this.setState({
            bucket: {
                ...this.state.bucket,
                x: clientX,
            }
        })
    }

    public newGame = (): void => {
        this.rules = [
            handsMovements, bombOutOfBounds, bombCatch, levelProgress,
            spritesCreation, spritesMoves, effects, spritesRemoval
        ]
        const [ firstLevel, ...rest ] = Campaign.levels
        this.setState({
            lives: 5,
            bombs: [],
            bonuses: [],
            gameTime: 0,
            deltaTime: 0,
            sprites: {
                misc: resetMiscSprites(),
            },
            level: prepareLevel(firstLevel),
            levels: rest,
            stats: {
                bombsCaught: 0,
                bombsMissed: 0,
                points: 0,
            },
            shake: {
                x: 0, y: 0, start: false,
            },
            factors: {
                bombSpeed: {
                    createdAt: 0,
                    expires: 0,
                    value: 1,
                },
                score: {
                    createdAt: 0,
                    expires: 0,
                    value: 1,
                },
            },
        })
    }

    public render() {
        const { hands, bucket, bombs, bonuses, sprites, lives, settings, level = { ref: { name: 'Game' } }, debug, stats, factors, gameTime, shake } = this.state
        return (
            <>
                <Game width={settings.width} height={settings.height}>
                    <Shake {...shake}>
                        <Hands {...hands} debug={debug.collisions}/>

                        <Bucket {...bucket} debug={debug.collisions}/>
                        {bombs.map((b, i) => <Bomb {...b} key={i} debug={debug.collisions}/>)}
                        {sprites.misc.crosses.map((c, i) => <Explosion {...c} key={i}/>)}
                        {sprites.misc.stars.map((c, i) => <Star {...c} key={i}/>)}
                        {sprites.misc.drops.map((c, i) => <WaterDrop {...c} key={i}/>)}
                        {bonuses.map((b, i) => {
                            return <DoubleScore {...b} key={i}/>
                        })}

                        {new Array(lives).fill(0).map((_, i) => <Life y={20} x={settings.width - (i + 1) * 36} w={32}
                                                                      h={32}
                                                                      key={i}/>)}

                        {<text x="20" y="30">{level.ref.name}</text>}
                        {<text x="20"
                               y="50">{stats.points} (acc {((100 * stats.bombsCaught / (stats.bombsMissed + stats.bombsCaught)) || 100).toFixed(2)} %)</text>}


                        <BonusActivityBar maxWidth={settings.width}
                                          percentageFill={(factors.score.expires - gameTime) / (factors.score.expires - factors.score.createdAt)}
                                          timeLeft={Math.max(0, factors.score.expires - gameTime)}
                                          height={settings.height / 2}/>
                    </Shake>
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
        this.rules = [ bombOutOfBounds, spritesMoves ] // even tho its game over, keep some moves
    }


    private onKeyDown = () => undefined

}

export default App
