import React from 'react'
import { Link } from 'react-router-dom'
import './GameOver.css'

class GameOver extends React.Component {

  constructor() {
    super();
    this.audioGameOver = new Audio('/game_over.mp3');
	this.audioGameOver.play();
  }

  render() {
    return (
    	<div className="overlay over">
    		<h1>{this.props.winner.name} won!</h1>
    		<Link className="button" to="/">Menu</Link>
		</div>)
	}
}

export default GameOver
