import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Menu from './Menu'
import Game from './Game'
import Rules from './Rules'
import './index.css'

render(
  <Router basename={process.env.PUBLIC_URL}>
    <div>
      <Route exact path="/" component={Menu} />
      <Route path="/game/:difficulty/" component={Game} />
      <Route path="/rules/" component={Rules} />
    </div>
  </Router>,
  document.getElementById('game')
)
