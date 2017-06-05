import React from 'react'
import { Link } from 'react-router-dom'
import './Menu.css'

const Menu = () => (
  <main className="menu full-screen">
    <h1 className="app-title">Pong?!</h1>
    <p>Prepare your pokerface...</p>
    <ul className="unstyled-list selection-list">
      <li><Link to="/game/short" className="button">Short game</Link></li>
      <li><Link to="/game/medium" className="button">Medium game</Link></li>
      <li><Link to="/game/long" className="button">Long game</Link></li>
      <li><Link to="/rules" className="button">Rules</Link></li>
    </ul>
  </main>
)

export default Menu
