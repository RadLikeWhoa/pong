import React from 'react'
import { Link } from 'react-router-dom'
import './GameOver.css'

const GameOver = ({ winner }) => (
  <div className="overlay over">
    <h1>{winner.name} won!</h1>
    <Link className="button"
          to="/">
        Menu
    </Link>
  </div>
)

export default GameOver
