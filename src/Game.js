import React, { Component } from 'react'
import Player from './Player'
import Paddle from './Paddle'
import Ball from './Ball'
import Bonus from './Bonus'
import Target from './Target'
import Defense from './Defense'
import GameOver from './GameOver'
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
        over: false
      },
      statement: {
        bonus: false,
        target: null,
        claim: null,
        defense: null
      },
      winner: null
    }

    this.onBonusSelected = this.onBonusSelected.bind(this)
    this.onTargetSelected = this.onTargetSelected.bind(this)
    this.onDefenseSelected = this.onDefenseSelected.bind(this)
    this.switchPlayers = this.switchPlayers.bind(this)
  }

  componentDidMount() {
    const difficulty = this.props.match.params.difficulty

    this.setState({
      goal: difficulty === 'short' ? 10 : difficulty === 'medium' ? 20 : 40
    })

    this.getInitialBonuses()
  }

  componentDidUpdate() {
    if (this.state.winner) {
      return
    }

    const { bonus, target, claim, defense } = this.state.statement

    if (this.state.p1.points >= this.state.goal) {
      this.setState({
        winner: this.state.p1
      })

      return
    } else if (this.state.p2.points >= this.state.goal) {
      this.setState({
        winner: this.state.p2
      })

      return
    }

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
        bonus: (this.state.current === 1 ? this.state.p2 : this.state.p1).bonuses > 0,
        target: (this.state.current === 1 ? this.state.p2 : this.state.p1).bonuses === 0
      }
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
      }
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
        defense: false
      }
    })
  }

  render() {
    return (
      <main className="game">
        <Player name={this.state.p1.name}
                points={this.state.p1.points} />
        <section className="field">
          <Paddle position="left" />
          <Ball position={this.state.current === 1 ? 'left' : 'right'} />
          <Paddle position="right" />
        </section>
        {this.state.overlay.bonus && (
          <Bonus total={this.getCurrentAttacker().points}
                 player={this.getCurrentAttacker()}
                 onSelect={this.onBonusSelected} />
        )}
        {this.state.overlay.target && (
          <Target position={this.state.current === 1 ? 'right' : 'left'}
                  player={this.getCurrentAttacker()}
                  onSelect={this.onTargetSelected} />
        )}
        {this.state.overlay.defense && (
          <Defense position={this.state.current === 1 ? 'right' : 'left'}
                   player={this.getCurrentDefender()}
                   attacker={this.getCurrentAttacker()}
                   claim={this.state.statement.claim}
                   bonus={this.state.statement.bonus}
                   onSelect={this.onDefenseSelected} />
        )}
        {this.state.winner && (
          <GameOver winner={this.state.winner} />
        )}
        <Player name={this.state.p2.name}
                points={this.state.p2.points} />
      </main>
    )
  }
}

export default Game
