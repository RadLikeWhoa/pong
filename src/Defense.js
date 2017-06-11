import React from 'react'
import './Defense.css'

class Defense extends React.Component {
  constructor(props) {
    super(props)

    this.audio = new Audio(`${process.env.PUBLIC_URL}/move1.wav`)

    this.state = {
      upKey: 'P',
      downKey: 'L'
    }

    this.keyHandler = this.keyHandler.bind(this)
  }

  componentDidMount() {
    if (this.props.position === 'left') {
      this.setState({
        upKey: 'W',
        downKey: 'S'
      })
    }

    document.addEventListener('keypress', this.keyHandler, false)
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.keyHandler)
  }

  keyHandler(e) {
    if (document.preventKeyPresses) {
      return
    }

    const { upKey, downKey } = this.state

    if (e.key === upKey || e.key === upKey.toLowerCase()) {
      this.selectDefense('top')
    } else if (e.key === downKey || e.key === downKey.toLowerCase()) {
      this.selectDefense('bottom')
    }
  }

  selectDefense(defense) {
    this.audio.play()
    this.props.onSelect(defense)
  }

  render() {
    return (
      <div className={`overlay defense defense-${this.props.position}`}>
        <div className="defense-explanation">
          <h1>{this.props.player.name}, Prepare your defense</h1>
          <p>Is {this.props.attacker.name} really going for the {this.props.claim === 'top' ? 'TOP' : 'BOTTOM'}?{this.props.bonus && <span><br />A DOUBLE-UP is active!</span>}</p>
        </div>
        <div className="defense-options">
          <div className="defense-top"
               onClick={() => this.selectDefense('top')}>{`(${this.state.upKey})`}</div>
          <div className="defense-bottom"
               onClick={() => this.selectDefense('bottom')}>{`(${this.state.downKey})`}</div>
        </div>
      </div>
    )
  }
}

export default Defense
