import React from 'react'
import { Link } from 'react-router-dom'
import './GameOver.css'

class GameOver extends React.Component {
  constructor(props) {
    super(props)
    this.audio = new Audio(`${process.env.PUBLIC_URL}/game_over.mp3`)
  }

  componentDidMount() {
    this.audio.play()
  }

  componentWillUnmount() {
    this.audio.pause()
  }

  render() {
    return (
    	<div className="overlay over">
    		<h1>{this.props.winner.name} won!</h1>
    		<Link className="button" to="/">Menu</Link>
		  </div>
    )
	}
}

export default GameOver
