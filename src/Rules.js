import React from 'react'
import { Link } from 'react-router-dom'
import './Rules.css'

class Menu extends React.Component {
  render() {
    return (
      <main className="rules full-screen">
        <h1 className="app-title">Pong?!</h1>
        <p>Pong?! is a game about out-bluffing your opponent.</p>
        <p>The attacker selects their actual target, followed by a claim that will be visible to the defender. The attacker must then try to confuse the defender into defending the wrong target.</p>
        <p>Truth + Score = +1 / +0<br />Truth + Block = +0 / +1<br />Bluff + Score = +2 / +0<br />Bluff + Block = +0 / +2</p>
        <p>A double-up rewards the attacker with double the points if they score.</p>
        <Link to="/"
              className="button">Menu</Link>
      </main>
    )
  }
}

export default Menu
