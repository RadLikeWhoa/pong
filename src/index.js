import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Menu from './Menu'
import Game from './Game'
import './index.css'

render(
  <Router>
    <div>
      <Route exact path="/" component={Menu} />
      <Route path="/game/:difficulty" component={Game} />
    </div>
  </Router>,
  document.getElementById('game')
)
