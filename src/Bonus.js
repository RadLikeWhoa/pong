import React from 'react'
import './Bonus.css'

class Bonus extends React.Component {
  constructor(props) {
    super(props)
    this.keyHandler = this.keyHandler.bind(this)
  }

  componentDidMount() {
    document.addEventListener('keypress', this.keyHandler, false)
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.keyHandler)
  }

  keyHandler(e) {
    if (e.key === 'y' || e.key === 'Y') {
      this.props.onSelect(true)
    } else if (e.key === 'n' || e.key === 'N') {
      this.props.onSelect(false)
    }
  }

  render() {
    return (
      <div className="bonus">
        <h1>{this.props.player.name}, Use your double-up?</h1>
        <p>Gotta get them sweet bonus points!</p>
        <div>
          <button className="button"
                  onClick={() => this.props.onSelect(false)}>
              Nope (N)
          </button>
          <button className="button"
                  onClick={() => this.props.onSelect(true)}>
              Yup (Y)
          </button>
        </div>
      </div>
    )
  }
}

export default Bonus
