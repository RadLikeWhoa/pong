import React, { Component } from 'react'
import Player from './Player'
import Paddle from './Paddle'
import Ball from './Ball'
import Bonus from './Bonus'
import Target from './Target'
import Defense from './Defense'
import './Game.css'

class Game extends Component {
  constructor(props) {
    super(props)

    this.state = {
      p1: {
        name: 'P1',
        points: 0
      },
      p2: {
        name: 'P2',
        points: 0
      },
      current: 1,
      overlay: {
        bonus: false,
        target: false,
        defense: false
      },
      statement: {
        bonus: 0,
        target: null,
        claim: null,
        defense: null
      }
    }

    this.onBonusSelected = this.onBonusSelected.bind(this)
    this.onTargetSelected = this.onTargetSelected.bind(this)
    this.onDefenseSelected = this.onDefenseSelected.bind(this)
  }

  componentDidMount() {
    this.getInitialScore()

    this.setState({
      overlay: {
        ...this.state.overlay,
        bonus: true
      }
    })
  }

  getCurrentAttacker() {
    return this.state.current === 1 ? this.state.p1 : this.state.p2
  }

  getCurrentDefender() {
    return this.state.current === 1 ? this.state.p2 : this.state.p1
  }

  getInitialScore() {
    let points = 0

    switch (this.props.match.params.difficulty) {
      case 'short':
        points = 5
        break
      case 'medium':
        points = 10
        break
      case 'long':
        points = 20
        break
      default:
        points = 0
    }

    this.setState({
      p1: { ...this.state.p1, points },
      p2: { ...this.state.p2, points }
    })
  }

  onBonusSelected(bonus) {
    this.setState({
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
        <Player name={this.state.p2.name}
                points={this.state.p2.points} />
      </main>
    )
  }
}

export default Game
