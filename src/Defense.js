import React from 'react'
import './Defense.css'

class Defense extends React.Component {
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
               onClick={() => this.selectDefense('up')}></div>
          <div className="defense-bottom"
               onClick={() => this.selectDefense('down')}></div>
        </div>
      </div>
    )
  }
}

export default Defense
