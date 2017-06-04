import React from 'react'
import './Player.css'

class Player extends React.Component {
  render() {
    return (
      <section className="player">
        <h1>{this.props.name}</h1>
        <div className="score">{this.props.points}</div>
      </section>
    )
  }
}

export default Player
