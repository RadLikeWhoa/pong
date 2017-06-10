import React from 'react'
import { Link } from 'react-router-dom'
import './Menu.css'

class Menu extends React.Component {

  constructor() {
    super();
    this.audio = new Audio('pong.mp3');
    this.audio.addEventListener('ended', function() {
      this.currentTime = 0;
      this.play();
    }, false);
    this.audio.play();
  }

  componentWillUnmount() {
    this.audio.pause();
  }

  toggleMute() {
    this.audio.muted = !this.audio.muted;
  }

  render() {
    return (
  <main className="menu full-screen">
    <h1 className="app-title">Pong?!</h1>
    <p>Prepare your pokerface...</p>
    <ul className="unstyled-list selection-list">
      <li><Link to="/game/short" className="button">Short game</Link></li>
      <li><Link to="/game/medium" className="button">Medium game</Link></li>
      <li><Link to="/game/long" className="button">Long game</Link></li>
      <li><Link to="/rules" className="button">Rules</Link></li>
      <li><Link to="#" className="button" onClick={() => this.toggleMute() }>Mute</Link></li>
    </ul>
  </main>
)
  }

}

export default Menu
