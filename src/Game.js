import React, { Component } from 'react'
import Player from './Player'
import Paddle from './Paddle'
import Ball from './Ball'
import Bonus from './Bonus'
import Target from './Target'
import Defense from './Defense'
import GameOver from './GameOver'
import Result from './Result'
import Intermediate from './Intermediate'
import './Game.css'

class Game extends Component {
  constructor(props) {
    super(props)

    this.audio = new Audio(`${process.env.PUBLIC_URL}/touch.wav`)

    this.state = {
      goal: Infinity,
      p1: {
        name: 'P1',
        points: 0,
        bonuses: 0
      },
      p2: {
        name: 'P2',
        points: 0,
        bonuses: 0
      },
      current: 1,
      overlay: 'bonus',
      statement: {
        bonus: false,
        target: null,
        claim: null,
        defense: null
      },
      winner: null,
      intermediate: null,
      strategy: null
    }

    this.onBonusSelected = this.onBonusSelected.bind(this)
    this.onTargetSelected = this.onTargetSelected.bind(this)
    this.onDefenseSelected = this.onDefenseSelected.bind(this)
    this.switchPlayers = this.switchPlayers.bind(this)
    this.settle = this.settle.bind(this)
    this.checkWinCondition = this.checkWinCondition.bind(this)
    this.startAnimation = this.startAnimation.bind(this)
    this.calculateStrategy = this.calculateStrategy.bind(this)

    this.ballBounces = [{
      score: [ 800 ],
      block: [ 800, 1600 ],
    }, {
      score: [ 500, 1300, 2300, 3300, 4150 ],
      block: [ 500, 1400, 2400, 3400, 4150, 4250 ]
    }, {
      score: [ 800, 1900 ],
      block: [ 800, 1850, 1950 ]
    }, {
      score: [],
      block: [ 1350 ]
    }, {
      score: [ 750, 2000 ],
      block: [ 750, 2000, 2250 ]
    }]
  }

  componentDidMount() {
    const difficulty = this.props.match.params.difficulty

    this.setState({
      goal: difficulty === 'short' ? 5 : difficulty === 'medium' ? 10 : 20,
      intermediate: `Get ready, ${this.getCurrentAttacker().name}`
    })

    this.getInitialBonuses()
  }

  settle() {
    const { bonus, target, claim, defense } = this.state.statement

    if (defense === null) {
      return
    }

    const attacker = this.getCurrentAttacker()
    const defender = this.getCurrentDefender()

    const baseValue = bonus ? 2 : 1

    if (defense !== target) {
      this.setState({
        [this.state.current === 1 ? 'p1' : 'p2']: {
          ...attacker,
          points: attacker.points + (claim !== target ? baseValue * 2 : baseValue)
        }
      }, this.checkWinCondition)
    } else {
      this.setState({
        [this.state.current === 1 ? 'p2' : 'p1']: {
          ...defender,
          points: defender.points + (claim !== target ? 2 : 1)
        }
      }, this.checkWinCondition)
    }
  }

  checkWinCondition() {
    const { p1, p2, goal } = this.state

    if (p1.points >= goal) {
      this.setState({
        winner: p1,
        intermediate: null,
        overlay: null
      })
    } else if (p2.points >= goal) {
      this.setState({
        winner: p2,
        intermediate: null,
        overlay: null
      })
    } else {
      this.switchPlayers()
    }
  }

  calculateStrategy() {
    const rand = 4 // Math.round(Math.random() * 4)
    const { target, defense } = this.state.statement
    const direction = this.state.current === 1 ? 'ltr' : 'rtl'

    this.setState({
      strategy: `${target}-${direction}-${rand}${target === defense ? '-bounce' : ''} defend-${defense}-${rand}`
    }, this.startAnimation)
  }

  startAnimation() {
    const { strategy } = this.state

    const strat = +(strategy[strategy.length - 1])
    const isDefending = strategy.indexOf('bounce') !== -1
    let duration = 0

    switch (strat) {
      case 0:
        duration = 2200
        break
      case 1:
        duration = 5000
        break
      case 2:
        duration = 2200
        break
      case 3:
        duration = 1700
        break
      case 4:
        duration = 2800
        break
      default:
        duration = 0
    }

    let ballBounces = this.ballBounces[strat][isDefending ? 'block' : 'score']

    ballBounces.forEach(val => setTimeout(() => {
      if (!this.audio.paused) {
        console.log('create clone')
        this.audio.cloneNode(true).play()
      } else {
        this.audio.play()
      }
    }, val))

    if (isDefending) {
      duration += 900
    }

    setTimeout(() => this.setState({
      overlay: 'result',
      strategy: null
    }), duration)
  }

  switchPlayers() {
    this.setState({
      current: this.state.current === 1 ? 2 : 1,
      statement: {
        bonus: false,
        target: null,
        claim: null,
        defense: null
      },
      overlay: (this.state.current === 1 ? this.state.p2 : this.state.p1).bonuses > 0 ? 'bonus' : 'target',
      intermediate: this.state.winner === null ? `Get ready, ${this.getCurrentDefender().name}` : null
    })
  }

  getInitialBonuses() {
    const difficulty = this.props.match.params.difficulty

    this.setState({
      p1: {
        ...this.state.p1,
        bonuses: difficulty === 'short' ? 0 : difficulty === 'medium' ? 2 : 3
      },
      p2: {
        ...this.state.p2,
        bonuses: difficulty === 'short' ? 0 : difficulty === 'medium' ? 2 : 3
      }
    })
  }

  getCurrentAttacker() {
    return this.state.current === 1 ? this.state.p1 : this.state.p2
  }

  getCurrentDefender() {
    return this.state.current === 1 ? this.state.p2 : this.state.p1
  }

  onBonusSelected(bonus) {
    const attacker = this.getCurrentAttacker()

    this.setState({
      [this.state.current === 1 ? 'p1' : 'p2']: {
        ...attacker,
        bonuses: bonus ? attacker.bonuses - 1 : attacker.bonuses
      },
      statement: {
        ...this.state.statement,
        bonus
      },
      overlay: 'target'
    })
  }

  onTargetSelected(target, claim) {
    this.setState({
      statement: {
        ...this.state.statement,
        target,
        claim
      },
      overlay: 'defense',
      intermediate: `Get ready, ${this.state.current === 1 ? this.state.p2.name : this.state.p1.name}`
    })
  }

  onDefenseSelected(defense) {
    this.setState({
      statement: {
        ...this.state.statement,
        defense
      },
      overlay: null
    }, this.calculateStrategy)
  }

  render() {
    const { p1, p2, statement, current, overlay, winner, intermediate, strategy } = this.state
    const { bonus, claim, defense } = statement

    return (
      <main className="game">
        <Player name={p1.name}
                points={p1.points}
                bonuses={p1.bonuses}
                attacking={winner === null && defense === null && ((current === 1 && claim === null) || (current === 2 && claim !== null))} />
        <section className={`field ${strategy || ''}`}>
          <Paddle position="left"
                  defending={current === 2} />
          <Ball position={current === 1 ? 'left' : 'right'} />
          <Paddle position="right"
                  defending={current === 1} />
        </section>
        {intermediate && (
          <Intermediate text={intermediate}
                        onDismiss={() => this.setState({ intermediate: null })}/>
        )}
        {overlay === 'bonus' && (
          <Bonus total={this.getCurrentAttacker().points}
                 player={this.getCurrentAttacker()}
                 onSelect={this.onBonusSelected} />
        )}
        {overlay === 'target' && (
          <Target position={current === 1 ? 'right' : 'left'}
                  player={this.getCurrentAttacker()}
                  onSelect={this.onTargetSelected} />
        )}
        {overlay === 'defense' && (
          <Defense position={current === 1 ? 'right' : 'left'}
                   player={this.getCurrentDefender()}
                   attacker={this.getCurrentAttacker()}
                   claim={claim}
                   bonus={bonus}
                   onSelect={this.onDefenseSelected} />
        )}
        {overlay === 'result' && (
          <Result attacker={this.getCurrentAttacker()}
                  defender={this.getCurrentDefender()}
                  statement={statement}
                  onDismiss={this.settle} />
        )}
        {winner && <GameOver winner={winner} />}
        <Player name={p2.name}
                points={p2.points}
                bonuses={p2.bonuses}
                attacking={winner === null && defense === null && ((current === 2 && claim === null) || (current === 1 && claim !== null))} />
      </main>
    )
  }
}

export default Game
