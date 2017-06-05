import React from 'react'
import './Defense.css'

class Defense extends React.Component {
  constructor(props) {
    super(props)

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
    const { upKey, downKey } = this.state

    if (e.key === upKey || e.key === upKey.toLowerCase()) {
      this.selectDefense('up')
    } else if (e.key === downKey || e.key === downKey.toLowerCase()) {
      this.selectDefense('down')
    }
  }

  selectDefense(defense) {
    this.props.onSelect(defense)
  }

  render() {
    return (
      <div className={`defense defense-${this.props.position}`}>
        <div className="defense-explanation">
          <h1>{this.props.player.name}, Prepare your defense</h1>
          <p>Is {this.props.attacker.name} really going for the {this.props.claim === 'up' ? 'TOP' : 'BOTTOM'}?{this.props.bonus && <span><br />A DOUBLE-UP is active!</span>}</p>
        </div>
        <div className="defense-options">
          <div className="defense-top"
               onClick={() => this.selectDefense('up')}>{`(${this.state.upKey})`}</div>
          <div className="defense-bottom"
               onClick={() => this.selectDefense('down')}>{`(${this.state.downKey})`}</div>
        </div>
      </div>
    )
  }
}

export default Defense
