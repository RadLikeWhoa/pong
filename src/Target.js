import React from 'react'
import './Target.css'

class Target extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      step: 'target',
      target: 'up'
    }
  }

  selectTarget(target) {
    if (this.state.step === 'claim') {
      return
    }

    this.setState({
      target,
      step: 'claim'
    })
  }

  selectClaim(claim) {
    this.props.onSelect(this.state.target, claim)
  }

  render() {
    return (
      <div className={`target target-${this.props.position}`}>
        {this.state.step === 'target' ? (
          <div className="target-explanation">
            <h1>{this.props.player.name}, Select your target</h1>
            <p>This is where you'll actually shoot.</p>
          </div>
        ) : (
          <div className="target-explanation">
            <h1>{this.props.player.name}, State your claim</h1>
            <p>Wanna bluff?</p>
          </div>
        )}
        <div className="target-options">
          <div className={`target-top ${this.state.step === 'claim' && this.state.target === 'down' ? 'is-hidden' : ''}`}
               onClick={() => this.selectTarget('up')}></div>
          <div className={`target-bottom ${this.state.step === 'claim' && this.state.target === 'up' ? 'is-hidden' : ''}`}
               onClick={() => this.selectTarget('down')}></div>
        </div>
        {this.state.step === 'claim' && (
          <div className="claim-options">
            <div className="claim-top"
                 onClick={() => this.selectClaim('up')}></div>
            <div className="claim-bottom"
                 onClick={() => this.selectClaim('down')}></div>
          </div>
        )}
      </div>
    )
  }
}

export default Target
