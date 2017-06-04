import React from 'react'
import './Ball.css'

class Ball extends React.Component {
  render() {
    return (
      <div className={`ball ball-${this.props.position}`}></div>
    )
  }
}

export default Ball
