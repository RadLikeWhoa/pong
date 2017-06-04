import React from 'react'
import './Paddle.css'

class Paddle extends React.Component {
  render() {
    return (
      <div className={`paddle paddle-${this.props.position}`}></div>
    )
  }
}

export default Paddle
