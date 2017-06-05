import React from 'react'
import './Ball.css'

const Ball = ({ position }) => (
  <div className={`ball ball-${position}`}></div>
)

export default Ball
