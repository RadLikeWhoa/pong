import React from 'react'
import './Bonus.css'

class Bonus extends React.Component {
  constructor(props) {
    super(props)

    this.audio = new Audio(`${process.env.PUBLIC_URL}/touch.wav`)
    
    this.keyHandler = this.keyHandler.bind(this)
    this.selectBonus = this.selectBonus.bind(this)
  }

  componentDidMount() {
    document.addEventListener('keypress', this.keyHandler, false)
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.keyHandler)
  }

  keyHandler(e) {
    if (document.preventKeyPresses) {
      return
    }

    if (e.key === 'y' || e.key === 'Y') {
      this.selectBonus(true)
    } else if (e.key === 'n' || e.key === 'N') {
      this.selectBonus(false)
    }
  }

  selectBonus(state) {
    this.audio.play()
    this.props.onSelect(state)
  }

  render() {
    return (
      <div className="overlay bonus">
        <h1>{this.props.player.name}, Use a double-up?</h1>
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
