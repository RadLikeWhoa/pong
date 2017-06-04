import React from 'react'
import { Link } from 'react-router-dom'
import './GameOver.css'

class GameOver extends React.Component {
  render() {
    return (
      <div className="over">
        <h1>{this.props.winner.name} won!</h1>
        <Link className="button"
              to="/">
            Menu
        </Link>
      </div>
    )
  }
}

export default GameOver
