import React from 'react'
import './Player.css'

class Player extends React.Component {
  constructor(props) {
    super(props)
    this.generateBonuses = this.generateBonuses.bind(this)
  }

  generateBonuses() {
    const bonuses = []

    for (let i = 0; i < this.props.bonuses; i++) {
      bonuses.push(<div className="douple-up" key={i}></div>)
    }

    return bonuses
  }

  render() {
    return (
      <section className={`player ${this.props.attacking ? 'is-attacking' : ''}`}>
        <h1>{this.props.name}</h1>
        <div className="score">{this.props.points}</div>
        <div className="douple-ups">
          {this.generateBonuses()}
        </div>
      </section>
    )
  }
}

export default Player
