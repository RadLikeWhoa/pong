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
      overlay: {
        bonus: true,
        target: false,
        defense: false,
        result: false
      },
      statement: {
        bonus: false,
        target: null,
        claim: null,
        defense: null
      },
      winner: null,
      intermediate: null
    }

    this.onBonusSelected = this.onBonusSelected.bind(this)
    this.onTargetSelected = this.onTargetSelected.bind(this)
    this.onDefenseSelected = this.onDefenseSelected.bind(this)
    this.switchPlayers = this.switchPlayers.bind(this)
    this.settle = this.settle.bind(this)
  }

  componentDidMount() {
    const difficulty = this.props.match.params.difficulty

    this.setState({
      goal: difficulty === 'short' ? 10 : difficulty === 'medium' ? 20 : 40,
      intermediate: `Get ready, ${this.getCurrentAttacker().name}`
    })

    this.getInitialBonuses()
  }

  componentDidUpdate() {
    if (this.state.winner) {
      return
    }

    if (this.state.p1.points >= this.state.goal) {
      this.setState({
        winner: this.state.p1
      })
    } else if (this.state.p2.points >= this.state.goal) {
      this.setState({
        winner: this.state.p2
      })
    }
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
      })
    } else {
      this.setState({
        [this.state.current === 1 ? 'p2' : 'p1']: {
          ...defender,
          points: defender.points + (claim !== target ? 2 : 1)
        }
      })
    }

    this.switchPlayers()
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
      overlay: {
        ...this.state.overlay,
        result: false,
        bonus: (this.state.current === 1 ? this.state.p2 : this.state.p1).bonuses > 0,
        target: (this.state.current === 1 ? this.state.p2 : this.state.p1).bonuses === 0
      },
      intermediate: `Get ready, ${this.getCurrentDefender().name}`
    })
  }

  getInitialBonuses() {
    const difficulty = this.props.match.params.difficulty

    this.setState({
      p1: {
        ...this.state.p1,
        bonuses: difficulty === 'short' ? 1 : difficulty === 'medium' ? 2 : 3
      },
      p2: {
        ...this.state.p2,
        bonuses: difficulty === 'short' ? 1 : difficulty === 'medium' ? 2 : 3
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
        bonuses: attacker.bonuses - 1
      },
      statement: {
        ...this.state.statement,
        bonus
      },
      overlay: {
        ...this.state.overlay,
        target: true,
        bonus: false
      }
    })
  }

  onTargetSelected(target, claim) {
    this.setState({
      statement: {
        ...this.state.statement,
        target,
        claim
      },
      overlay: {
        ...this.state.overlay,
        target: false,
        defense: true
      },
      intermediate: `Get ready, ${this.state.current === 1 ? this.state.p2.name : this.state.p1.name}`
    })
  }

  onDefenseSelected(defense) {
    this.setState({
      statement: {
        ...this.state.statement,
        defense
      },
      overlay: {
        ...this.state.overlay,
        result: true,
        defense: false
      }
    })
  }

  render() {
    const { p1, p2, statement, current, overlay, winner, intermediate } = this.state
    const { bonus, claim, defense } = statement

    return (
      <main className="game">
        <Player name={p1.name}
                points={p1.points}
                bonuses={p1.bonuses}
                attacking={defense === null && ((current === 1 && claim === null) || (current === 2 && claim !== null))} />
        <section className="field">
          <Paddle position="left" />
          <Ball position={current === 1 ? 'left' : 'right'} />
          <Paddle position="right" />
        </section>
        {intermediate && (
          <Intermediate text={intermediate}
                        onDismiss={() => this.setState({ intermediate: null })}/>
        )}
        {overlay.bonus && (
          <Bonus total={this.getCurrentAttacker().points}
                 player={this.getCurrentAttacker()}
                 onSelect={this.onBonusSelected} />
        )}
        {overlay.target && (
          <Target position={current === 1 ? 'right' : 'left'}
                  player={this.getCurrentAttacker()}
                  onSelect={this.onTargetSelected} />
        )}
        {overlay.defense && (
          <Defense position={current === 1 ? 'right' : 'left'}
                   player={this.getCurrentDefender()}
                   attacker={this.getCurrentAttacker()}
                   claim={claim}
                   bonus={bonus}
                   onSelect={this.onDefenseSelected} />
        )}
        {overlay.result && (
          <Result attacker={this.getCurrentAttacker()}
                  defender={this.getCurrentDefender()}
                  statement={statement}
                  onDismiss={this.settle} />
        )}
        {winner && (
          <GameOver winner={winner} />
        )}
        <Player name={p2.name}
                points={p2.points}
                bonuses={p2.bonuses}
                attacking={defense === null && ((current === 2 && claim === null) || (current === 1 && claim !== null))} />
      </main>
    )
  }
}

export default Game
