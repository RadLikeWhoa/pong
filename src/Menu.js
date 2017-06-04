import React from 'react'
import { Link } from 'react-router-dom'
import './Menu.css'

class Menu extends React.Component {
  render() {
    return (
      <main className="menu">
        <h1 className="app-title">Pong?!</h1>
        <p>Prepare your pokerface...</p>
        <ul className="unstyled-list selection-list">
          <li><Link to="/game/short" className="button">Short game</Link></li>
          <li><Link to="/game/medium" className="button">Medium game</Link></li>
          <li><Link to="/game/long" className="button">Long game</Link></li>
        </ul>
      </main>
    )
  }
}

export default Menu
