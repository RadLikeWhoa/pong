import React from 'react'
import './Paddle.css'

const Paddle = ({ position, defending }) => (
  <div className={`paddle paddle-${position} ${defending ? 'is-defending' : ''}`}></div>
)

export default Paddle
